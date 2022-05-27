"use strict";

import { expect } from "chai";

import { SignalDispatcher } from "../src";

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
        expect(
            dispatcher.onSubscriptionChangeTriggered,
            "Starting, nothing should be triggered."
        ).eql(0);

        dispatcher.sub(s);
        expect(
            dispatcher.onSubscriptionChangeTriggered,
            "Triggered 1x, because of sub."
        ).eql(1);

        dispatcher.unsub(s);
        expect(
            dispatcher.onSubscriptionChangeTriggered,
            "Triggered 2x, because of sub + unsub."
        ).eql(2);
    });

    it("Sub/unsub", () => {
        let s = () => {};

        let dispatcher = new CustomDispatcher();
        expect(
            dispatcher.onSubscriptionChangeTriggered,
            "Starting, nothing should be triggered."
        ).eql(0);

        dispatcher.subscribe(s);
        expect(
            dispatcher.onSubscriptionChangeTriggered,
            "Triggered 1x, because of subscribe."
        ).eql(1);

        dispatcher.unsubscribe(s);
        expect(
            dispatcher.onSubscriptionChangeTriggered,
            "Triggered 2x, because of sub + unsubscribe."
        ).eql(2);
    });

    it("One/Dispatch", () => {
        let s = () => {};

        let dispatcher = new CustomDispatcher();
        expect(
            dispatcher.onSubscriptionChangeTriggered,
            "Starting, nothing should be triggered."
        ).eql(0);

        dispatcher.one(s);
        expect(
            dispatcher.onSubscriptionChangeTriggered,
            "Triggered 1x, because of one."
        ).eql(1);

        dispatcher.dispatch();
        expect(
            dispatcher.onSubscriptionChangeTriggered,
            "Triggered 2x, because of one + dispatch."
        ).eql(2);
    });

    it("Clear", () => {
        let s = () => {};

        let dispatcher = new CustomDispatcher();
        expect(
            dispatcher.onSubscriptionChangeTriggered,
            "Starting, nothing should be triggered."
        ).eql(0);

        dispatcher.sub(s);
        expect(
            dispatcher.onSubscriptionChangeTriggered,
            "Triggered 1x, because of sub."
        ).eql(1);

        dispatcher.clear();
        expect(
            dispatcher.onSubscriptionChangeTriggered,
            "Triggered 2x, because of sub + clear."
        ).eql(2);
    });
});
