import { deprecated } from "./deprecated.js";
import fs from "fs/promises";
import { dirname } from "path";
import camelcase from "camelcase";
import { rimraf } from "rimraf";

function svgToSvelteComponent(svgString, isDeprecated) {
  const comment = isDeprecated ? `/** @deprecated */\n  ` : "";

  const scriptTag = `<script lang="ts">
  ${comment}import type { ClassValue } from 'svelte/elements';

  interface Props {
    class?: ClassValue;
  }

  const { class: className }: Props = $props();
</script>\n\n`;

  const component =
    scriptTag +
    svgString
      .replace(
        `viewBox="0 0 24 24"`,
        `class={['size-6', className]} viewBox="0 0 24 24"`
      )
      .replace(
        `viewBox="0 0 20 20"`,
        `class={['size-5', className]} viewBox="0 0 20 20"`
      )
      .replace(
        `viewBox="0 0 16 16"`,
        `class={['size-4', className]} viewBox="0 0 16 16"`
      );

  return component;
}

async function getIcons(style) {
  let files = await fs.readdir(`./optimized/${style}`);
  return Promise.all(
    files.map(async (file) => ({
      svg: await fs.readFile(`./optimized/${style}/${file}`, "utf8"),
      componentName: `${camelcase(file.replace(/\.svg$/, ""), {
        pascalCase: true,
      })}Icon`,
      isDeprecated: deprecated.includes(file),
    }))
  );
}

function exportAll(icons) {
  return icons
    .map(({ componentName }) => {
      return `export { default as ${componentName} } from './${componentName}.svelte'`;
    })
    .join("\n");
}

async function ensureWrite(file, text) {
  await fs.mkdir(dirname(file), { recursive: true });
  await fs.writeFile(file, text, "utf8");
}

async function ensureWriteJson(file, json) {
  await ensureWrite(file, JSON.stringify(json, null, 2) + "\n");
}

async function buildIcons(style) {
  console.log(`Building ${style} icons...`);
  let outDir = `./src/lib/${style}`;

  let icons = await getIcons(style);

  await Promise.all(
    icons.flatMap(async ({ componentName, svg, isDeprecated }) => {
      let content = svgToSvelteComponent(svg, isDeprecated);

      return [ensureWrite(`${outDir}/${componentName}.svelte`, content)];
    })
  );

  await ensureWrite(`${outDir}/index.js`, exportAll(icons));
}

async function main() {
  const esmPackageJson = { type: "module", sideEffects: false };

  console.log(`Building package...`);

  console.log("Cleaning up existing files...");
  await Promise.all([
    rimraf(`./src/lib/16/solid/*`),
    rimraf(`./src/lib/20/solid/*`),
    rimraf(`./src/lib/24/outline/*`),
    rimraf(`./src/lib/24/solid/*`),
  ]);

  await Promise.all([
    buildIcons("16/solid"),
    buildIcons("20/solid"),
    buildIcons("24/outline"),
    buildIcons("24/solid"),
    ensureWriteJson(`./src/lib/16/solid/package.json`, esmPackageJson),
    ensureWriteJson(`./src/lib/20/solid/package.json`, esmPackageJson),
    ensureWriteJson(`./src/lib/24/outline/package.json`, esmPackageJson),
    ensureWriteJson(`./src/lib/24/solid/package.json`, esmPackageJson),
  ]);

  return console.log(`Finished building package into the src/lib/ directory.`);
}

main();
