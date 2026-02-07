import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { postPath } from "../utils/post-path";

export async function GET(context) {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  const sorted = posts.sort((a, b) => b.data.pubDate - a.data.pubDate);

  return rss({
    title: "Gian.cool",
    description: "Gianfranco's Blog",
    site: context.site,
    items: sorted.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: postPath(post.data.pubDate, post.data.slug),
    })),
    customData: "<language>en-us</language>",
  });
}
