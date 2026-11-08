"""Authenticated adapter for the installed substack-api-mcp package."""
import asyncio
import json
from html import unescape
import sys
from substack_api_mcp import __version__, session
from substack_api_mcp.core.context import ToolContext
from substack_api_mcp.runner import Runner
from substack_api_mcp.substack.client import publication, draft, body_doc, call, byline
from substack_api_mcp.substack.publishing import set_options


def summarize(post):
    return {**{key: post.get(key) for key in (
        'id', 'slug', 'draft_title', 'draft_subtitle', 'audience', 'is_published',
        'should_send_email', 'email_sent_at', 'cover_image', 'draft_updated_at',
    )}, 'doc': body_doc(post), 'scheduled': bool(post.get('trigger_at') or post.get('postSchedules'))}


async def run(request):
    if __version__ != '1.0.6':
        raise RuntimeError('Adapter expects substack-api-mcp 1.0.6; verify its API before updating the version check')
    ctx = ToolContext(session=session.load())
    runner = Runner()
    try:
        pub = await publication(ctx)
        if pub['handle'] != 'gianpaj' or pub['subdomain'] != 'gianpaj':
            raise RuntimeError('Expected @gianpaj and gianpaj.substack.com')
        action, data = request['operation'], request.get('payload') or {}
        base = pub['base'] + '/api/v1'
        if action == 'identity':
            return {'handle': pub['handle'], 'subdomain': pub['subdomain']}
        if action == 'list':
            result = []
            for status, order in [('published','post_date'), ('drafts','draft_updated_at'), ('scheduled','draft_updated_at')]:
                offset = 0
                while True:
                    page = await call(ctx, 'GET', f'{base}/post_management/{status}', params={'offset':offset,'limit':50,'order_by':order,'order_direction':'desc'})
                    rows = page.get('posts') or []
                    result.extend({'id':p['id'],'slug':p.get('slug'),'title':p.get('title') or p.get('draft_title')} for p in rows)
                    if len(rows) < 50:
                        break
                    offset += len(rows)
            return result
        if action == 'create':
            p = data['prepared']
            post = await call(ctx, 'POST', f'{base}/drafts', body={
                'draft_title':p['title'],'draft_subtitle':p['subtitle'],'draft_body':json.dumps({'type':'doc','content':p['doc']['content'][:1]}),
                'draft_bylines':byline(pub),'type':'newsletter','audience':'everyone',
                'slug':p['slug'],'should_send_email':False,'section_chosen':True,'draft_section_id':None,
            })
            return summarize(post)
        if action == 'upload':
            image = data.get('data') or data.get('src')
            if not image or not image.startswith(('data:image/png;', 'data:image/jpeg;', 'data:image/webp;', 'https://')):
                raise RuntimeError('Image must be HTTPS or a supported PNG/JPEG/WebP data URI')
            response = await ctx.call('POST', f'{base}/image', data={'image':image}, headers={'referer':pub['base']+'/', 'origin':pub['base']})
            if response.status >= 400:
                raise RuntimeError(f'Image upload failed ({response.status})')
            answer = response.json()
            url = answer.get('url')
            if not url or not url.startswith('https://'):
                raise RuntimeError('Image upload returned no HTTPS URL')
            return {'url':url}
        pid = int(data['id']) if 'id' in data else None
        if action == 'get':
            return summarize(await draft(ctx,pub,pid))
        if action in ('update','metadata'):
            post = await draft(ctx,pub,pid)
            if post.get('trigger_at') or post.get('postSchedules'):
                raise RuntimeError('Scheduled posts require manual inspection before editing')
            if action == 'update':
                if post.get('is_published'):
                    raise RuntimeError('Refusing to overwrite a published article')
                if post.get('draft_updated_at') != data.get('expected_updated_at'):
                    raise RuntimeError('Draft changed while synchronizing; inspect before retrying')
                body = {'draft_title':data['draft_title'],'draft_subtitle':data['draft_subtitle'],
                        'draft_body':json.dumps(data['doc']),'draft_bylines':byline(pub),
                        'audience':'everyone','should_send_email':False,
                        'last_updated_at':post.get('draft_updated_at')}
                if data.get('cover'):
                    body['cover_image'] = data['cover']
                await call(ctx,'PUT',f'{base}/drafts/{pid}',body=body)
            else:
                await call(ctx,'PUT',f'{base}/drafts/{pid}',body={'slug':data['slug']})
                if not post.get('is_published'):
                    await set_options(ctx,pub,await draft(ctx,pub,pid),False)
                tags = {t['name']:t['tag_id'] for t in (await runner.run('list_post_tags'))['tags']}
                for name in data.get('remove_tags', []):
                    if name in tags:
                        await runner.run('tag_post',{'post_id':str(pid),'tag_id':tags[name],'remove':True})
                for name in data['tags']:
                    if name not in tags:
                        tags[name] = (await runner.run('create_post_tag',{'name':name}))['tag_id']
                    await runner.run('tag_post',{'post_id':str(pid),'tag_id':tags[name]})
            return summarize(await draft(ctx,pub,pid))
        if action == 'publish':
            if data.get('send_email') is not False:
                raise RuntimeError('This helper only publishes web-only posts')
            return await runner.run('publish_post',{'post_id':str(pid),'send_email':False,'section_id':'main'})
        if action == 'public':
            if not data['url'].startswith(pub['base']+'/p/'):
                raise RuntimeError('Unexpected publication URL')
            public = ToolContext(session=session.Session())
            try:
                response = await public.call('GET',data['url'])
                if response.status != 200 or data['title'] not in unescape(response.text):
                    raise RuntimeError('Public page did not return the expected article')
                return {'accessible':True}
            finally:
                await public.close()
        raise RuntimeError(f'Unknown operation: {action}')
    finally:
        await ctx.close()
        await runner.close()


if __name__ == '__main__':
    try:
        result = asyncio.run(run(json.load(sys.stdin)))
        print(json.dumps({'ok':True,'result':result}))
    except Exception as error:
        # Package errors describe the failure without dumping response headers or cookies.
        print(json.dumps({'ok':False,'error':str(error)}))
        sys.exit(1)
