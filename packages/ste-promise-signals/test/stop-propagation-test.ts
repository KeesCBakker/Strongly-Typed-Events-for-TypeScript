"use strict";

import { expect } from "chai";

import { PromiseSignalDispatcher } from "../src";

function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

describe("Strongly Typed Events - Promise Signal", async () => {
    describe("PromiseSignalDispatcher", async () => {
        it("stopPropagation through ev", async () => {
            let dispatcher = new PromiseSignalDispatcher();

            let a = 0;
            dispatcher.sub(async (ev) => {
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

            await dispatcher.dispatch();
            await dispatcher.dispatch();
            await dispatcher.dispatch();
            await dispatcher.dispatch();

            expect(a).to.eq(4, "A should be 4, because 4 dispatches are done.");

            expect(b).to.eq(
                2,
                "B should be 2, because everything after the 2nd dispatch is cancelled."
            );
        });
    });
});
