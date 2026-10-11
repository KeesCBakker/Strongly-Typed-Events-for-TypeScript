import { readdir, rm } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const packages = await readdir(resolve(root, "packages"), { withFileTypes: true });

await Promise.all([
    ...packages.filter(entry => entry.isDirectory()).map(entry =>
        rm(resolve(root, "packages", entry.name, "dist"), { recursive: true, force: true })
    ),
    rm(resolve(root, "tmp/test"), { recursive: true, force: true })
]);
