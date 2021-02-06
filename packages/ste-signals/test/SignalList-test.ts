"use strict";

import { expect } from "chai";
import { SignalList } from "../src";

describe("Strongly Typed Events - Signal: SignalList", () => {
    it("Subscribe to event name", () => {
        let event = "myEvent";
        let list = new SignalList();
        var fn = () => {};

        list.get(event).subscribe(fn);
        var result = list.get(event).has(fn);
        expect(result, "result should be true.").to.equals(true);
    });

    it("Unsubscribe to event name", () => {
        let event = "myEvent";
        let list = new SignalList();
        var fn = () => {};

        list.get(event).subscribe(fn);
        list.get(event).unsubscribe(fn);

        var result = list.get(event).has(fn);
        expect(result, "result should be false due to unsubscribe.").to.equals(
            false
        );
    });

    it("Test firing two events in one list", () => {
        let list = new SignalList();
        let result = "";

        let event1 = "ev1";
        var fn1 = () => {
            result = "ev1:" + 8;
        };

        let event2 = "ev2";
        var fn2 = () => {
            result = "ev2:" + 16;
        };

        list.get(event1).subscribe(fn1);
        list.get(event2).subscribe(fn2);

        list.get(event2).dispatch();
        expect(result, 'Result should be "ev2:16.').to.equal("ev2:16");

        list.get(event1).dispatch();
        expect(result, 'Result should be "ev1:8.').to.equal("ev1:8");
    });

    it("Test remove from list.", () => {
        let list = new SignalList();
        var fn = () => {};

        let event1 = "ev1";
        list.get(event1).subscribe(fn);

        let event2 = "ev2";
        list.get(event2).subscribe(fn);

        let result = list.get(event2).has(fn);
        expect(result, "Event 2 should be present.").to.equal(true);

        list.remove(event2);

        result = list.get(event1).has(fn);
        expect(result, "Event 1 should still be present.").to.equal(true);

        result = list.get(event2).has(fn);
        expect(result, "Event 2 should not be present.").to.equal(false);
    });
});
