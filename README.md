# wayve

Portfolio and interactive component playground for sixun.

10+ years of full-stack development, practical LLM/AI use, modern technology, cost optimization and team leadership.

## Develop

`npm ci` then `npm run dev`. The app is served under `/wayve/`.

## Build

`npm run build` generates static files and deep-route entry pages in `dist/`. Publish that directory to GitHub Pages at `/wayve/`.

`npm run check:demos` checks imports and initial rendering of 103 demos; it does not test browser effects or every interaction. Three catalogue entries (12, 14, 36) remain unavailable. Some supporting views and wallet icons are local adaptations.

The original purchased source archive is kept separately. Deployment contains the adapted application only.

## Deployment settings

Repository name: `wayve`. Enable Pages with GitHub Actions as the source, then run **Publish wayve**. The workflow deploys only after the repository is named `wayve` and public.

Expected URL after successful deployment: `https://sixun.github.io/wayve/`.
