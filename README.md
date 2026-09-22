# Whispering Tiger website

Static GitHub Pages site at https://whispering-tiger.github.io/.

- `index.html`: overview and Windows/Linux downloads.
- `features.html`: supported tasks and model families.
- `getting-started.html`: installation, hardware/runtime table and audio setup.
- `pro-plugins.html`: paid plugins and the voice demo.

No build step or JavaScript framework is required. Preview from this directory with `python -m http.server 8000`, then open http://localhost:8000/.

## Navigation

The main menu stays on this website. Features points to the homepage overview; `features.html` is reached through the single "All features & models" link below that overview. Getting started contains the common setup instructions. Advanced GitHub references are grouped at the end of that guide and labeled explicitly.

## Updating the site

Keep visible copy, descriptions, social metadata and JSON-LD consistent. Use only canonical URLs in `sitemap.xml`; the homepage canonical is the root URL. Add new public pages to the sitemap; keep the main navigation focused on the main visitor tasks. Do not add fabricated ratings or model capabilities to structured data.

When publishing a UI release, update both versioned download URLs and both `data-*-url` attributes in `index.html`. Verify the files exist in the release. Keep the download section to one primary download and the other-platform link.

Check hardware claims against the UI's `ProfileForm/Schema.go` and the backend's `Models/audio_cpp_runtime.py`. Linux audio.cpp currently offers CPU/Vulkan; CUDA for other Linux models is a separate runtime path. Keep the UI's `doc/hardware-support.md` aligned.

The site uses semantic HTML and ordinary crawlable links for search engines and AI search. `robots.txt` allows crawling. A special AI metadata file is not required by Google Search.

Before publishing, check HTML, internal links/anchors, JSON-LD, sitemap URLs, desktop/mobile layouts, download selection, the screenshot viewer and the voice comparison. Submitting the sitemap and monitoring indexing happen in Google Search Console and Bing Webmaster Tools after deployment.
