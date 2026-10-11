"use strict";

import { describe, it } from "node:test";
import * as assert from "node:assert/strict";
import { SignalList } from "ste-signals";

describe("Strongly Typed Events - Signal: SignalList", () => {
    it("Subscribe to event name", () => {
        let event = "myEvent";
        let list = new SignalList();
        var fn = () => {};

        list.get(event).subscribe(fn);
        var result = list.get(event).has(fn);
        assert.strictEqual(result, true, "result should be true.");
    });

    it("Unsubscribe to event name", () => {
        let event = "myEvent";
        let list = new SignalList();
        var fn = () => {};

        list.get(event).subscribe(fn);
        list.get(event).unsubscribe(fn);

        var result = list.get(event).has(fn);
        assert.strictEqual(result, false, "result should be false due to unsubscribe.");
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
        assert.strictEqual(result, "ev2:16", 'Result should be "ev2:16.');

        list.get(event1).dispatch();
        assert.strictEqual(result, "ev1:8", 'Result should be "ev1:8.');
    });

    it("Test remove from list.", () => {
        let list = new SignalList();
        var fn = () => {};

        let event1 = "ev1";
        list.get(event1).subscribe(fn);

        let event2 = "ev2";
        list.get(event2).subscribe(fn);

        let result = list.get(event2).has(fn);
        assert.strictEqual(result, true, "Event 2 should be present.");

        list.remove(event2);

        result = list.get(event1).has(fn);
        assert.strictEqual(result, true, "Event 1 should still be present.");

        result = list.get(event2).has(fn);
        assert.strictEqual(result, false, "Event 2 should not be present.");
    });
});
