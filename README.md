# tanyahallett-site

## Sitemap

`sitemap.xml` is hand-maintained (no build step/CMS). When adding, removing,
or renaming a page:

1. Add/update its `<url>` entry in `sitemap.xml` — `<loc>` is the absolute
   `https://tanyahallett.com/...` URL, `<lastmod>` is the date of the change
   (`YYYY-MM-DD`).
2. Confirm the page also has the standard `<head>` block (title, meta
   description, canonical, Open Graph, Twitter Card — see any existing page
   for the pattern) and is linked from the main nav/footer if it should be
   crawlable.
3. `robots.txt` doesn't need changes unless you're adding a path that should
   be excluded from crawling.