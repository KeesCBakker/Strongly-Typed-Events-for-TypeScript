"use strict";

import { describe, it } from "node:test";
import * as assert from "node:assert/strict";
import { setImmediate } from "node:timers/promises";

import { PromiseSimpleEventDispatcher } from "ste-promise-simple-events";

describe("Strongly Typed Events - Promise Simple Event", async () => {
    describe("PromiseSimpleEventDispatcher", async () => {
        it("stopPropagation through ev", async () => {
            const n = {};
            let dispatcher = new PromiseSimpleEventDispatcher<{}>();

            let a = 0;
            dispatcher.sub(async (args, ev) => {
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

            await dispatcher.dispatch(n);
            await dispatcher.dispatch(n);
            await dispatcher.dispatch(n);
            await dispatcher.dispatch(n);

            assert.strictEqual(a, 4, "A should be 4, because 4 dispatches are done.");

            assert.strictEqual(b,
                2,
                "B should be 2, because everything after the 2nd dispatch is cancelled."
            );
        });
    });
});
