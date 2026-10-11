"use strict";

import { describe, it } from "node:test";
import * as assert from "node:assert/strict";
import { setImmediate } from "node:timers/promises";

import { PromiseEventDispatcher } from "ste-promise-events";

describe("Strongly Typed Events - Promise Event", async () => {
    describe("PromiseEventDispatcher", async () => {
        it("stopPropagation through ev", async () => {
            const n = {};
            let dispatcher = new PromiseEventDispatcher<{}, {}>();

            let a = 0;
            dispatcher.sub(async (sender, args, ev) => {
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

            await dispatcher.dispatch(n, n);
            await dispatcher.dispatch(n, n);
            await dispatcher.dispatch(n, n);
            await dispatcher.dispatch(n, n);

            assert.strictEqual(a, 4, "A should be 4, because 4 dispatches are done.");

            assert.strictEqual(b,
                2,
                "B should be 2, because everything after the 2nd dispatch is cancelled."
            );
        });
    });
});
