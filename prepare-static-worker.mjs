import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { basename } from "node:path";

const clientDir = "dist/client";
let html = await readFile(`${clientDir}/index.html`, "utf8");

const cssHref = html.match(/href="([^"]+\.css)"/)?.[1];
const jsSrc = html.match(/src="([^"]+\.js)"/)?.[1];
if (!cssHref || !jsSrc) throw new Error("Vite assets were not found in index.html");

const css = await readFile(`${clientDir}/${cssHref.replace(/^\//, "")}`, "utf8");
let js = await readFile(`${clientDir}/${jsSrc.replace(/^\//, "")}`, "utf8");

for (const [name, extension, mimeType] of [
  ["hero-bike-school", "webp", "image/webp"],
  ["kids-training", "webp", "image/webp"],
  ["advanced-training", "webp", "image/webp"],
  ["bike-up-logo", "png", "image/png"],
]) {
  const file = await readFile(`${clientDir}/images/${name}.${extension}`);
  const dataUrl = `data:${mimeType};base64,${file.toString("base64")}`;
  js = js.split(`images/${name}.${extension}`).join(dataUrl);
}

html = html
  .replace(/<link rel="stylesheet"[^>]+>/, `<style>${css}</style>`)
  .replace(/<script type="module"[^>]+><\/script>/, `<script type="module">${js.replace(/<\/script/gi, "<\\/script")}</script>`);

const worker = `const HTML = ${JSON.stringify(html)};

export default {
  async fetch(request) {
    const pathname = new URL(request.url).pathname;
    if (pathname !== "/" && pathname !== "/index.html") {
      return new Response("Not Found", { status: 404 });
    }
    return new Response(HTML, {
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "public, max-age=300"
      }
    });
  }
};
`;

await mkdir("dist/server", { recursive: true });
await mkdir("dist/.openai", { recursive: true });
await writeFile("dist/server/index.js", worker);
await copyFile(".openai/hosting.json", "dist/.openai/hosting.json");

console.log(`Prepared ${basename("dist/server/index.js")} (${worker.length} bytes)`);
