import * as assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { runInNewContext } from "node:vm";

const bundles = [
    ["ste-core", "Subscription"],
    ["ste-events", "EventDispatcher"],
    ["ste-simple-events", "SimpleEventDispatcher"],
    ["ste-signals", "SignalDispatcher"],
    ["ste-promise-events", "PromiseEventDispatcher"],
    ["ste-promise-simple-events", "PromiseSimpleEventDispatcher"],
    ["ste-promise-signals", "PromiseSignalDispatcher"],
    ["strongly-typed-events", "SignalDispatcher"]
];

for (const [name, constructorName] of bundles) {
    for (const suffix of [".js", ".min.js"]) {
        const filename = `${name}${suffix}`;
        const url = new URL(`../dist/${filename}`, import.meta.url);

        for (const mode of ["script", "AMD", "CommonJS"]) {
            test(`${filename} loads through ${mode} and exposes working globals`, async () => {
                const window = {};
                const sandbox = { window, setTimeout, clearTimeout };
                let factory;

                if (mode === "AMD") {
                    sandbox.define = (dependencies, callback) => {
                        assert.equal(dependencies.length, 0);
                        factory = callback;
                    };
                    sandbox.define.amd = {};
                } else if (mode === "CommonJS") {
                    sandbox.module = { exports: {} };
                }

                runInNewContext(await readFile(url, "utf8"), sandbox, { filename });

                if (mode === "AMD") {
                    assert.equal(window._e, undefined);
                    assert.equal(typeof factory, "function");
                    assert.equal(typeof factory(), "object");
                } else if (mode === "CommonJS") {
                    assert.equal(typeof sandbox.module.exports, "object");
                }

                const Constructor = window[constructorName];
                assert.equal(typeof Constructor, "function");
                assert.equal(window._e[constructorName], Constructor);

                if (name !== "ste-core") {
                    const dispatcher = new Constructor();
                    let calls = 0;
                    dispatcher.one(() => { calls++; });
                    await dispatcher.dispatch({}, 7);
                    await dispatcher.dispatch({}, 7);
                    assert.equal(calls, 1);
                }
            });
        }

        test(`${filename} has a usable source map`, async () => {
            const map = JSON.parse(await readFile(new URL(`${url}.map`), "utf8"));
            assert.equal(map.version, 3);
            assert.ok(map.sources.length > 0);
            assert.equal(map.sourcesContent.length, map.sources.length);
            assert.ok(map.mappings.length > 0);
        });
    }
}

for (const suffix of [".js", ".min.js"]) {
    test(`strongly-typed-events${suffix} preserves existing browser globals`, async () => {
        const existing = function ExistingSignalDispatcher() {};
        const window = { SignalDispatcher: existing };
        const url = new URL(`../dist/strongly-typed-events${suffix}`, import.meta.url);
        runInNewContext(await readFile(url, "utf8"), { window });

        assert.equal(window.SignalDispatcher, existing);
        assert.equal(typeof window._e.SignalDispatcher, "function");
        assert.notEqual(window._e.SignalDispatcher, existing);
    });
}
