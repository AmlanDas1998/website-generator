const fs = require("fs");
const path = require("path");
const fse = require("fs-extra");
const Handlebars = require("handlebars");

// --- Helpers ---
Handlebars.registerHelper("eq", (a, b) => a === b);
Handlebars.registerHelper("notEmpty", arr => Array.isArray(arr) && arr.length > 0);
Handlebars.registerHelper("yearRange", (start, end) => (end && end !== "Present") ? `${start} – ${end}` : `${start} – Present`);
Handlebars.registerHelper("json", ctx => JSON.stringify(ctx));

// --- CLI args ---
const [, , configPath, outputDirArg] = process.argv;

if (!configPath || !outputDirArg) {
  console.error("Usage: node scripts/build.js <config.json> <outputDir>\nExample: node scripts/build.js config/sample.json output/client1");
  process.exit(1);
}

const OUTPUT_DIR = path.resolve(outputDirArg);
const TEMPLATE_PATH = path.resolve("templates/index.hbs");
const ASSETS_DIR = path.resolve("assets");

try {
  // 1) Read JSON
  const raw = fs.readFileSync(configPath, "utf-8");
  const data = JSON.parse(raw);

  // 2) Compile template
  const templateSrc = fs.readFileSync(TEMPLATE_PATH, "utf-8");
  const template = Handlebars.compile(templateSrc, { noEscape: true });
  const html = template(data);

  // 3) Prepare output dir
  fse.emptyDirSync(OUTPUT_DIR);

  // 4) Write index.html
  fs.writeFileSync(path.join(OUTPUT_DIR, "index.html"), html, "utf-8");

  // 5) Copy assets
  fse.copySync(ASSETS_DIR, path.join(OUTPUT_DIR, "assets"));

  console.log(`✅ Site generated at: ${OUTPUT_DIR}\\index.html`);
} catch (err) {
  console.error("❌ Build failed:", err.message);
  process.exit(1);
}
