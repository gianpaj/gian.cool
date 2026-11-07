// Render the sourced locator map. Pass the pinned d3 bundle path as argument 1.
const fs = require('node:fs');
const path = require('node:path');
const d3 = require(path.resolve(process.argv[2]));
const root = path.resolve(__dirname, '..');
const geo = JSON.parse(fs.readFileSync(path.join(root, 'data/location-geometry.json')));
const data = JSON.parse(fs.readFileSync(path.join(root, 'data/location-points.json')));
const projection = d3.geoMercator().center([114, 41.2]).scale(9500).translate([960, 550]).clipExtent([[70,200],[1850,940]]);
const geoPath = d3.geoPath(projection);
const points = Object.fromEntries(data.points.map(p => [p.id, projection([p.lon, p.lat])]));
const escape = s => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;');
const label = (x,y,t,size=36,anchor='start',fill='#222925',weight=400) => `<text x="${x}" y="${y}" text-anchor="${anchor}" font-size="${size}" font-weight="${weight}" fill="${fill}">${escape(t)}</text>`;
let layers = '';
for(const f of geo.countries.features) layers += `<path d="${geoPath(f)}" fill="${f.properties.ADMIN==='Mongolia'?'#e6e5de':'#eeede7'}" stroke="#bcbeb3" stroke-width="2"/>`;
for(const f of geo.provinces.features) layers += `<path d="${geoPath(f)}" fill="${f.properties.iso_3166_2==='CN-NM'?'#e9dfc4':'none'}" stroke="#c6c4b8" stroke-width="1.5"/>`;
const [ux,uy] = points.ulanqab;
for (const id of ['hohhot','beijing']) {
 const [x,y]=points[id];
 const line = {type:'LineString',coordinates:[[113.132,40.994],...data.points.filter(p=>p.id===id).map(p=>[p.lon,p.lat])]};
 layers += `<path d="${geoPath(line)}" fill="none" stroke="${id==='beijing'?'#ab5c24':'#687567'}" stroke-width="${id==='beijing'?5:3}" stroke-dasharray="${id==='beijing'?'0':'8 7'}"/>`;
 const mid=d3.geoInterpolate([113.132,40.994],data.points.find(p=>p.id===id)?[data.points.find(p=>p.id===id).lon,data.points.find(p=>p.id===id).lat]:[])(0.5);
 const [mx,my]=projection(mid);
 layers += label(mx+(id==='beijing'?24:0),my-28,id==='beijing'?'≈300 km':'≈125 km',id==='beijing'?46:34,'middle');
}
for (const [id,[x,y]] of Object.entries(points)) layers += `<circle cx="${x}" cy="${y}" r="${id==='ulanqab'?12:9}" fill="${id==='ulanqab'?'#ab5c24':'#34443b'}" stroke="#f5f4ef" stroke-width="4"/>`;
layers += label(ux+24,uy-42,'Ulanqab',52,'start','#222925',600);
layers += label(ux+26,uy-8,'Inner Mongolia, China',27);
const [hx,hy]=points.hohhot;
layers += label(hx-22,hy+56,'Hohhot',43,'end','#222925',500);
layers += label(hx-22,hy+92,'Regional capital',26,'end','#596456');
const [bx,by]=points.beijing;
layers += label(bx+26,by-22,'Beijing',47,'start','#222925',500);
layers += label(bx+26,by+18,"China's capital",26,'start','#596456');
const [rx,ry]=projection([114.05,42.15]);
layers += label(rx,ry,'Inner Mongolia',39,'middle','#736b4f');
const [mx,my]=projection([110.45,42.67]);
layers += label(mx,my,'Mongolia',31,'middle','#73796c');
// National context inset; all geometry comes from the same Natural Earth source.
const china=geo.countries.features.find(f=>f.properties.ADMIN==='China');
const insetP=d3.geoMercator().fitExtent([[1480,170],[1810,415]],china);
const insetPath=d3.geoPath(insetP);
layers += `<g id="china-inset"><path d="${insetPath(china)}" fill="#dedfd5" stroke="#aeb6a8" stroke-width="1.5"/>`;
const region=geo.provinces.features.find(f=>f.properties.iso_3166_2==='CN-NM');
layers += `<path d="${insetPath(region)}" fill="#c4b48a" stroke="none"/>`;
const pin=insetP([113.132,40.994]);layers+=`<circle cx="${pin[0]}" cy="${pin[1]}" r="4" fill="#ab5c24"/>`;
layers+=label(1650,455,'China','28','middle','#596456')+'</g>';
const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080" role="img" aria-labelledby="title desc">
<title id="title">Ulanqab relative to Beijing and Hohhot</title>
<desc id="desc">A north-up locator map of northern China. Ulanqab city reference point is about 300 kilometres northwest of Beijing and about 125 kilometres east of Hohhot. Lines show straight-line city distances, not transport routes or the Galaxy campus location.</desc>
<rect width="1920" height="1080" fill="#f5f4ef"/>
<g font-family="DejaVu Sans, sans-serif">
${label(100,97,'Ulanqab, Inner Mongolia',54,'start','#222925',600)}
${label(102,148,'About 300 km northwest of Beijing',31,'start','#596456')}
<g id="geography">${layers}</g>
${label(100,1001,'Approximate straight-line distances between city reference points',27,'start','#596456')}
${label(100,1043,'Basemap: Natural Earth · City references: GeoNames / Wikipedia · Checked 7 Nov 2026',21,'start','#687567')}
</g></svg>`;
const out=path.join(root,'images/maps');
fs.writeFileSync(path.join(out,'ulanqab-locator.svg'),svg+'\n');
(async()=>{
 const {Resvg,initWasm}=require('@resvg/resvg-wasm');
 await initWasm(fs.readFileSync(require.resolve('@resvg/resvg-wasm/index_bg.wasm')));
 const png=new Resvg(svg,{fitTo:{mode:'width',value:3840},font:{fontBuffers:[new Uint8Array(fs.readFileSync('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf')),new Uint8Array(fs.readFileSync('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'))],defaultFontFamily:'DejaVu Sans'}}).render().asPng();
 fs.writeFileSync(path.join(out,'ulanqab-locator.png'),png);
 console.log('Saved SVG and 3840 × 2160 PNG. Projected city points:',points);
})();
