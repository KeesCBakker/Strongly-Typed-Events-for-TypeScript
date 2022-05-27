"use strict";

import { expect } from "chai";
import { SignalDispatcher } from "../src";

describe("Strongly Typed Events - Signal: SignalDispatcher", () => {
    it("Counting subscriptions", () => {
        let dispatcher = new SignalDispatcher();
        let callback = () => {};
        let callback2 = () => {};

        expect(dispatcher.count, "Subscription count should be 0").to.equal(0);
        dispatcher.sub(callback);
        expect(dispatcher.count, "Subscription count should be 1").to.equal(1);
        dispatcher.unsub(callback);
        expect(dispatcher.count, "Subscription count should be 0").to.equal(0);
        dispatcher.sub(callback);
        dispatcher.sub(callback2);
        expect(dispatcher.count, "Subscription count should be 2").to.equal(2);
    });

    it("Subscribing to the signal dispatcher", () => {
        let dispatcher = new SignalDispatcher();
        let resultNr = 0;

        dispatcher.subscribe(() => {
            resultNr = 7;
        });

        dispatcher.dispatch();

        expect(resultNr, "resultNr should be 7.").to.equal(7);
    });

    it("Sub to the signal dispatcher", () => {
        let dispatcher = new SignalDispatcher();
        let resultNr = 0;

        dispatcher.sub(() => {
            resultNr = 7;
        });

        dispatcher.dispatch();

        expect(resultNr, "resultNr should be 7.").to.equal(7);
    });

    it("Subscribing to the signal dispatcher. Fire twice", () => {
        let dispatcher = new SignalDispatcher();
        let resultNr = 0;

        dispatcher.subscribe(() => {
            resultNr += 6;
        });

        dispatcher.dispatch();
        dispatcher.dispatch();

        expect(resultNr, "resultNr should be 12.").to.equal(12);
    });

    it("Sub to the signal dispatcher. Fire twice", () => {
        let dispatcher = new SignalDispatcher();
        let resultNr = 0;

        dispatcher.sub(() => {
            resultNr += 6;
        });

        dispatcher.dispatch();
        dispatcher.dispatch();

        expect(resultNr, "resultNr should be 12.").to.equal(12);
    });

    it("One subscription to the signal dispatcher. Fire twice.", () => {
        let dispatcher = new SignalDispatcher();
        let resultNr = 0;

        dispatcher.one(() => {
            resultNr += 2;
        });

        dispatcher.dispatch();
        dispatcher.dispatch();

        expect(resultNr, "resultNr should be 2.").to.equal(2);
    });

    it("Unsubscribing to the signal dispatcher.", () => {
        let dispatcher = new SignalDispatcher();
        let resultNr = 0;

        var fn = () => {
            resultNr += 2;
        };

        dispatcher.subscribe(fn);
        dispatcher.unsubscribe(fn);
        dispatcher.dispatch();

        expect(resultNr, "resultNr should be 0.").to.equal(0);
    });

    it("Unsub to the signal dispatcher.", () => {
        let dispatcher = new SignalDispatcher();
        let resultNr = 0;

        var fn = () => {
            resultNr += 2;
        };

        dispatcher.sub(fn);
        dispatcher.unsub(fn);
        dispatcher.dispatch();

        expect(resultNr, "resultNr should be 0.").to.equal(0);
    });

    it("Unsubscribing from signal dispatcher using subscribe's return function.", () => {
        let dispatcher = new SignalDispatcher();
        let resultNr = 0;

        let unsub = dispatcher.subscribe(() => {
            resultNr += 2;
        });
        unsub();
        dispatcher.dispatch();

        expect(resultNr, "resultNr should be 0.").to.equal(0);
    });

    it("Unsubscribing from signal dispatcher using sub's return function.", () => {
        let dispatcher = new SignalDispatcher();
        let resultNr = 0;

        let unsub = dispatcher.sub(() => {
            resultNr += 2;
        });
        unsub();
        dispatcher.dispatch();

        expect(resultNr, "resultNr should be 0.").to.equal(0);
    });

    it("Unsubscribing from one subscription.", () => {
        let dispatcher = new SignalDispatcher();
        let resultNr = 0;

        var fn = () => {
            resultNr += 2;
        };

        dispatcher.one(fn);
        dispatcher.unsubscribe(fn);
        dispatcher.dispatch();

        expect(resultNr, "resultNr should be 0.").to.equal(0);
    });

    it("Unsubscribing from signal dispatcher using one's return function.", () => {
        let dispatcher = new SignalDispatcher();
        let resultNr = 0;

        let unsub = dispatcher.one(() => {
            resultNr += 2;
        });
        unsub();
        dispatcher.dispatch();

        expect(resultNr, "resultNr should be 0.").to.equal(0);
    });

    it("Unsub from one subscription.", () => {
        let dispatcher = new SignalDispatcher();
        let resultNr = 0;

        var fn = () => {
            resultNr += 2;
        };

        dispatcher.one(fn);
        dispatcher.unsub(fn);
        dispatcher.dispatch();

        expect(resultNr, "resultNr should be 0.").to.equal(0);
    });

    it("Has no event.", () => {
        var fn = () => {};
        let dispatcher = new SignalDispatcher();
        let result = dispatcher.has(fn);
        expect(result, "Handler should not be present.").to.equal(false);
    });

    it("Has event through subscribe.", () => {
        var fn = () => {};
        let dispatcher = new SignalDispatcher();
        dispatcher.subscribe(fn);
        let result = dispatcher.has(fn);
        expect(result, "Handler should be present.").to.equal(true);
    });

    it("Has event through one.", () => {
        var fn = () => {};
        let dispatcher = new SignalDispatcher();
        dispatcher.one(fn);
        let result = dispatcher.has(fn);
        expect(result, "Handler should be present.").to.equal(true);
    });

    it("Test subscribe -> unsubscribe -> has", () => {
        var fn = () => {};
        let dispatcher = new SignalDispatcher();
        dispatcher.subscribe(fn);
        dispatcher.unsubscribe(fn);
        let result = dispatcher.has(fn);
        expect(
            result,
            "Handler should not be present because of unsubscribe."
        ).to.equal(false);
    });

    it("Clear subscriptions.", () => {
        let dispatcher = new SignalDispatcher();
        let resultNr = 0;

        dispatcher.subscribe(() => {
            resultNr = 7;
        });

        dispatcher.clear();
        dispatcher.dispatch();

        expect(resultNr, "resultNr should be 0.").to.equal(0);
    });
});
