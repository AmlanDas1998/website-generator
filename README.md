# CXO Static Site Generator

This is a full-featured static website generator that takes a single JSON file and produces a premium, animated CXO personal branding website.

## Setup
```bash
cd cxo-static-site-generator
npm i
```

## Build
```bash
# Build using the included sample.json
npm run build

# Or custom:
node scripts/build.js config/sample.json output/client1
```

Open the generated `output/.../index.html` in your browser.

## Notes
- Put your images/logos/PDFs inside `assets/` **or** reference absolute URLs.
- For contact forms, connect to a service like Formspree/Netlify Forms.
- Edit styles in `assets/style.css` and behavior in `assets/script.js`.
