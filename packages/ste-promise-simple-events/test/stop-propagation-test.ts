"use strict";

import { expect } from "chai";

import { PromiseSimpleEventDispatcher } from "../src";

function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

describe("Strongly Typed Events - Promise Simple Event", async () => {
    describe("PromiseSimpleEventDispatcher", async () => {
        it("stopPropagation through ev", async () => {
            const n = {};
            let dispatcher = new PromiseSimpleEventDispatcher<{}>();

            let a = 0;
            dispatcher.sub(async (args, ev) => {
                await delay(10);
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

            expect(a).to.eq(4, "A should be 4, because 4 dispatches are done.");

            expect(b).to.eq(
                2,
                "B should be 2, because everything after the 2nd dispatch is cancelled."
            );
        });
    });
});
