# The World in One Picture — Wednesday 18 November 2026

[![make.fun · news-image-20261118](https://make.fun/badge/news-image-20261118.svg)](https://make.fun/bounty/news-image-20261118?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261118)
[![rank](https://make.fun/badge/news-image-20261118/verrydimah-cpu/news-image-20261118/rank.svg)](https://make.fun/bounty/news-image-20261118/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261118)
[![reward](https://make.fun/badge/news-image-20261118/verrydimah-cpu/news-image-20261118/reward.svg)](https://make.fun/bounty/news-image-20261118?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261118)

One image that sums up the world's news of **Wednesday 18 November 2026**, drawn as a 3D front page: an isometric diorama of the Gulf under attack, floating over a broadsheet of the day's other stories.

**The lead story:** Iran strikes back. After U.S. strikes on Qeshm Island, Iranian drones and missiles hit U.S. bases in Bahrain and Kuwait, an American MQ-9 drone was shot down near the Strait of Hormuz, and Saudi Arabia intercepted a cruise missile bound for Riyadh.

**Also on the page:**

- **Shenzhen** — Xi Jinping meets Vladimir Putin ahead of Thursday's first trilateral summit with Donald Trump.
- **Ukraine** — the Kerch Bridge is hit for a second day and part of its road span falls into the strait.
- **Alaska** — Mary Peltola defeats Dan Sullivan, giving Democrats a projected 56–44 Senate majority.
- **DR Congo** — the Ebola outbreak more than doubles in three months: over 11,000 cases and 5,400 deaths.
- **Disasters** — 19 die in a Siberian military plane crash, Category 5 Cyclone Xavier hits the Northern Cook Islands, and a 6.0 earthquake strikes Papua New Guinea.

The poster itself is `poster.html` — a single self-contained file whose hero is a real-time 3D diorama (Three.js/WebGL: extruded Gulf coastline, lit water, drone and missile arcs), composited with flat typeset text and inline-SVG panel art, then rendered to `entry.png` (1024 × 1024) by `render.mjs`. No external assets, no webfonts, no network.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

This copies `entry.png` into `out/` — the whole entry is that one image, byte-identical on every run.

## Links

- Bounty: https://make.fun/bounty/news-image-20261118
- Enter make.fun with my referral link: https://make.fun/r/hz6kvzj2

## License

MIT — see [LICENSE](LICENSE).
