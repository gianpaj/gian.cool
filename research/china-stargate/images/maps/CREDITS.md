# Ulanqab locator map

Created and checked on 2026-11-07. `ulanqab-locator.png` is 3840 × 2160 pixels, 16:9. `ulanqab-locator.svg` is the editable 1920 × 1080 vector original. Both are original graphics prepared for this project using the inputs below. File hashes are in `../manifest.json`.

## Basemap and reuse

Natural Earth geometry is public domain. The terms permit modification and commercial use without permission or mandatory attribution. Suggested credit: "Made with Natural Earth." [Terms checked 2026-11-07](https://www.naturalearthdata.com/about/terms-of-use/)

Original geometry downloads, version 5.1.2:

- [Countries, 1:50 million](https://raw.githubusercontent.com/nvkelso/natural-earth-vector/v5.1.2/geojson/ne_50m_admin_0_countries.geojson)
- [States and provinces, 1:10 million](https://raw.githubusercontent.com/nvkelso/natural-earth-vector/v5.1.2/geojson/ne_10m_admin_1_states_provinces.geojson)

Relevant features are retained in `../../data/location-geometry.json`, with properties reduced and coordinates rounded to four decimal places. Layout and labels are original. This map contains no copyrighted campus photographs and does not inherit the older relief map's CC BY-SA terms.

## City reference points and distances

| City | Latitude | Longitude | Reference and source |
|---|---|---|---|
| Ulanqab | 40.994 | 113.132 | Municipal-government reference point in the urban area, [Wikipedia](https://en.wikipedia.org/wiki/Ulanqab) |
| Hohhot | 40.8105556 | 111.6522222 | Populated-place reference, [GeoNames](https://www.geonames.org/advanced-search.html?q=Inner+Mongolia+Autonomous+Region&startRow=0) |
| Beijing | 39.90667 | 116.39750 | Tiananmen reference point, [Wikipedia](https://en.wikipedia.org/wiki/Beijing) |

Calculated great-circle distances use the haversine formula and mean Earth radius of 6371.0088 km. Ulanqab to Hohhot is approximately 126.027 km, displayed as about 125 km. Ulanqab to Beijing is approximately 301.581 km, displayed as about 300 km. These are city-reference distances, not road or rail lengths, network routes, travel times or distances from Galaxy's exact location. Values are retained in `../../data/location-points.json`.

Hohhot is the nearby regional-capital reference. Its capital status is supported by the [State Council's 2024-12-06 planning announcement](https://english.www.gov.cn/policies/latestreleases/202412/06/content_WS6752a7dac6d0868f4e8edb9d.html). Beijing supplies the recognizable major-city reference. This collection does not establish a population-ranked definition of "biggest nearby city"; Datong is also a nearby substantial city.

Hohhot's Wikipedia article uses a different city reference point, yielding about 117 km from Ulanqab. The map consistently uses the recorded GeoNames point and rounds its distance. City-reference choice explains why approximate distance listings can differ; no point is represented as a city boundary.

Projection is Web Mercator, north up, generated with d3-geo through D3 7.9.0. Connectors are projected great-circle lines, not transport routes. Natural Earth boundary detail is adequate for regional orientation, not site surveying.

## Reproduction

The renderer uses the project's existing `@resvg/resvg-wasm` package and local DejaVu Sans fonts. Fetch the [pinned D3 7.9.0 bundle](https://cdn.jsdelivr.net/npm/d3@7.9.0/dist/d3.min.js) to a temporary `.cjs` file, then run from the repository root:

```sh
node research/china-stargate/scripts/render-location-map.cjs /tmp/china-map-d3.cjs
```

D3's license is [ISC](https://github.com/d3/d3/blob/v7.9.0/LICENSE). No runtime D3 code is embedded in the PNG or SVG. The original basemap downloads and D3 bundle stay outside the repository; the relevant map inputs and renderer are saved here.

Suggested video narration: "Ulanqab sits about 300 kilometres northwest of Beijing, in China's Inner Mongolia."
