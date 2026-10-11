"use strict";

import { describe, it } from "node:test";
import * as assert from "node:assert/strict";
import { setImmediate } from "node:timers/promises";

import { PromiseSignalDispatcher } from "ste-promise-signals";

describe("Strongly Typed Events - Promise Signal", async () => {
    describe("PromiseSignalDispatcher", async () => {
        it("stopPropagation through ev", async () => {
            let dispatcher = new PromiseSignalDispatcher();

            let a = 0;
            dispatcher.sub(async (ev) => {
                 await setImmediate();
                a++;
                if (a > 2) {
                    ev.stopPropagation();
                }
            });

            let b = 0;
            dispatcher.sub(async () => {
                b++;
            });

            await dispatcher.dispatch();
            await dispatcher.dispatch();
            await dispatcher.dispatch();
            await dispatcher.dispatch();

            assert.strictEqual(a, 4, "A should be 4, because 4 dispatches are done.");

            assert.strictEqual(b,
                2,
                "B should be 2, because everything after the 2nd dispatch is cancelled."
            );
        });
    });
});
