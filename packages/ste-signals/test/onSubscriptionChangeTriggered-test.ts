"use strict";

import { describe, it } from "node:test";
import * as assert from "node:assert/strict";

import { SignalDispatcher } from "ste-signals";

describe("Strongly Typed Events - Signal: subscription changes", () => {
    class CustomDispatcher extends SignalDispatcher {
        public onSubscriptionChangeTriggered = 0;

        constructor() {
            super();

            this.onSubscriptionChange.sub(() => {
                this.onSubscriptionChangeTriggered++;
            });
        }
    }

    it("Sub/unsub", () => {
        let s = () => {};

        let dispatcher = new CustomDispatcher();
        assert.deepStrictEqual(
            dispatcher.onSubscriptionChangeTriggered, 0,
            "Starting, nothing should be triggered."
        );

        dispatcher.sub(s);
        assert.deepStrictEqual(
            dispatcher.onSubscriptionChangeTriggered, 1,
            "Triggered 1x, because of sub."
        );

        dispatcher.unsub(s);
        assert.deepStrictEqual(
            dispatcher.onSubscriptionChangeTriggered, 2,
            "Triggered 2x, because of sub + unsub."
        );
    });

    it("Sub/unsub", () => {
        let s = () => {};

        let dispatcher = new CustomDispatcher();
        assert.deepStrictEqual(
            dispatcher.onSubscriptionChangeTriggered, 0,
            "Starting, nothing should be triggered."
        );

        dispatcher.subscribe(s);
        assert.deepStrictEqual(
            dispatcher.onSubscriptionChangeTriggered, 1,
            "Triggered 1x, because of subscribe."
        );

        dispatcher.unsubscribe(s);
        assert.deepStrictEqual(
            dispatcher.onSubscriptionChangeTriggered, 2,
            "Triggered 2x, because of sub + unsubscribe."
        );
    });

    it("One/Dispatch", () => {
        let s = () => {};

        let dispatcher = new CustomDispatcher();
        assert.deepStrictEqual(
            dispatcher.onSubscriptionChangeTriggered, 0,
            "Starting, nothing should be triggered."
        );

        dispatcher.one(s);
        assert.deepStrictEqual(
            dispatcher.onSubscriptionChangeTriggered, 1,
            "Triggered 1x, because of one."
        );

        dispatcher.dispatch();
        assert.deepStrictEqual(
            dispatcher.onSubscriptionChangeTriggered, 2,
            "Triggered 2x, because of one + dispatch."
        );
    });

    it("Clear", () => {
        let s = () => {};

        let dispatcher = new CustomDispatcher();
        assert.deepStrictEqual(
            dispatcher.onSubscriptionChangeTriggered, 0,
            "Starting, nothing should be triggered."
        );

        dispatcher.sub(s);
        assert.deepStrictEqual(
            dispatcher.onSubscriptionChangeTriggered, 1,
            "Triggered 1x, because of sub."
        );

        dispatcher.clear();
        assert.deepStrictEqual(
            dispatcher.onSubscriptionChangeTriggered, 2,
            "Triggered 2x, because of sub + clear."
        );
    });
});
