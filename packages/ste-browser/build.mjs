import { build } from "esbuild";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const entries = [
    "ste-core",
    "ste-events",
    "ste-simple-events",
    "ste-signals",
    "ste-promise-events",
    "ste-promise-simple-events",
    "ste-promise-signals",
    "strongly-typed-events"
];

// esbuild's IIFE output needs a wrapper to retain the published UMD contract.
const banner = `(function (factory) {
    if (typeof module === "object" && module.exports) {
        module.exports = factory();
    } else if (typeof define === "function" && define.amd) {
        define([], factory);
    } else if (typeof exports === "object") {
        Object.assign(exports, factory());
    } else {
        factory();
    }
})(function () {`;

await Promise.all([false, true].map(minify => build({
    absWorkingDir: dirname(fileURLToPath(import.meta.url)),
    entryPoints: entries.map(name => `src/${name}.js`),
    outdir: "dist",
    entryNames: minify ? "[name].min" : "[name]",
    bundle: true,
    platform: "browser",
    format: "iife",
    target: "es2018",
    minify,
    sourcemap: "linked",
    legalComments: "eof",
    banner: { js: banner },
    footer: { js: "return {};\n});" }
})));
