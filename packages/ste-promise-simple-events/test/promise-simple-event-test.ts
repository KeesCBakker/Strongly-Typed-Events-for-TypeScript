"use strict";

import { describe, it } from "node:test";
import * as assert from "node:assert/strict";

import { PromiseSimpleEventDispatcher, PromiseSimpleEventList, NonUniformPromiseSimpleEventList } from "ste-promise-simple-events";

describe("Strongly Typed Events - Simple event", () => {
  describe("SimpleEventDispatcher", () => {
    it("Subscribing to the simple event dispatcher", async () => {
      let dispatcher = new PromiseSimpleEventDispatcher<number>();
      let resultNr = 0;

      dispatcher.subscribe(async nr => {
        resultNr = nr;
      });

      await dispatcher.dispatch(7);

      assert.strictEqual(resultNr, 7, "resultNr should be 7.");
    });

    it("Sub to the simple event dispatcher", async () => {
      let dispatcher = new PromiseSimpleEventDispatcher<number>();
      let resultNr = 0;

      dispatcher.sub(async nr => {
        resultNr = nr;
      });

      await dispatcher.dispatch(7);

      assert.strictEqual(resultNr, 7, "resultNr should be 7.");
    });

    it("Subscribing to the simple event dispatcher. Fire twice", async () => {
      let dispatcher = new PromiseSimpleEventDispatcher<number>();
      let resultNr = 0;

      dispatcher.subscribe(async nr => {
        resultNr += nr;
      });

      await dispatcher.dispatch(7);
      await dispatcher.dispatch(6);

      assert.strictEqual(resultNr, 13, "resultNr should be 13.");
    });

    it("Sub to the simple event dispatcher. Fire twice", async () => {
      let dispatcher = new PromiseSimpleEventDispatcher<number>();
      let resultNr = 0;

      dispatcher.sub(async nr => {
        resultNr += nr;
      });

      await dispatcher.dispatch(7);
      await dispatcher.dispatch(6);

      assert.strictEqual(resultNr, 13, "resultNr should be 13.");
    });

    it("One subscription to the simple event dispatcher. Fire twice.", async () => {
      let dispatcher = new PromiseSimpleEventDispatcher<number>();
      let resultNr = 0;

      dispatcher.one(async nr => {
        resultNr += nr;
      });

      await dispatcher.dispatch(7);
      await dispatcher.dispatch(6);

      assert.strictEqual(resultNr, 7, "resultNr should be 7.");
    });

    it("Unsubscribing to the simple event dispatcher.", async () => {
      let dispatcher = new PromiseSimpleEventDispatcher<number>();
      let resultNr = 0;

      var fn = async (nr: number) => {
        resultNr += nr;
      };

      dispatcher.sub(fn);
      dispatcher.unsub(fn);
      await dispatcher.dispatch(6);

      assert.strictEqual(resultNr, 0, "resultNr should be 0.");
    });

    it("Unsub to the simple event dispatcher.", async () => {
      let dispatcher = new PromiseSimpleEventDispatcher<number>();
      let resultNr = 0;

      var fn = async (nr: number) => {
        resultNr += nr;
      };

      dispatcher.sub(fn);
      dispatcher.unsub(fn);
      await dispatcher.dispatch(6);

      assert.strictEqual(resultNr, 0, "resultNr should be 0.");
    });

    it("Unsubscribing from simple event dispatcher using subscribe's return function.", async () => {
      let dispatcher = new PromiseSimpleEventDispatcher<number>();
      let resultNr = 0;

      let unsub = dispatcher.subscribe(async (nr: number) => {
        resultNr += nr;
      });
      unsub();
      await dispatcher.dispatch(6);

      assert.strictEqual(resultNr, 0, "resultNr should be 0.");
    });

    it("Unsubscribing from simple event dispatcher using sub's return function.", async () => {
      let dispatcher = new PromiseSimpleEventDispatcher<number>();
      let resultNr = 0;

      let unsub = dispatcher.sub(async (nr: number) => {
        resultNr += nr;
      });
      unsub();
      await dispatcher.dispatch(6);

      assert.strictEqual(resultNr, 0, "resultNr should be 0.");
    });

    it("Unsubscribing to a one subscription.", async () => {
      let dispatcher = new PromiseSimpleEventDispatcher<number>();
      let resultNr = 0;

      var fn = async (nr: number) => {
        resultNr += nr;
      };

      dispatcher.one(fn);
      dispatcher.unsubscribe(fn);
      await dispatcher.dispatch(6);

      assert.strictEqual(resultNr, 0, "resultNr should be 0.");
    });

    it("Unsubscribing from simple event dispatcher using one's return function.", async () => {
      let dispatcher = new PromiseSimpleEventDispatcher<number>();
      let resultNr = 0;

      let unsub = dispatcher.one(async (nr: number) => {
        resultNr += nr;
      });
      unsub();
      await dispatcher.dispatch(6);

      assert.strictEqual(resultNr, 0, "resultNr should be 0.");
    });

    it("Unsub from one subscription.", async () => {
      let dispatcher = new PromiseSimpleEventDispatcher<number>();
      let resultNr = 0;

      var fn = async (nr: number) => {
        resultNr += nr;
      };

      dispatcher.one(fn);
      dispatcher.unsub(fn);
      await dispatcher.dispatch(6);

      assert.strictEqual(resultNr, 0, "resultNr should be 0.");
    });

    it("Has no event.", () => {
      var fn = async (nr: number) => { };
      let dispatcher = new PromiseSimpleEventDispatcher<number>();
      let result = dispatcher.has(fn);
      assert.strictEqual(result, false, "Handler should not be present.");
    });

    it("Has event through subscribe.", () => {
      var fn = async (nr: number) => { };
      let dispatcher = new PromiseSimpleEventDispatcher<number>();
      dispatcher.subscribe(fn);
      let result = dispatcher.has(fn);
      assert.strictEqual(result, true, "Handler should be present.");
    });

    it("Has event through one.", () => {
      var fn = async (nr: number) => { };
      let dispatcher = new PromiseSimpleEventDispatcher<number>();
      dispatcher.one(fn);
      let result = dispatcher.has(fn);
      assert.strictEqual(result, true, "Handler should be present.");
    });

    it("Test subscribe -> unsubscribe -> has", () => {
      var fn = async (nr: number) => { };
      let dispatcher = new PromiseSimpleEventDispatcher<number>();
      dispatcher.subscribe(fn);
      dispatcher.unsubscribe(fn);
      let result = dispatcher.has(fn);
      assert.strictEqual(
        result, false,
        "Handler should not be present because of unsubscribe."
      );
    });

    it("Clear subscriptions.", async () => {
      let dispatcher = new PromiseSimpleEventDispatcher<number>();
      let resultNr = 0;

      dispatcher.subscribe(async nr => {
        resultNr = nr;
      });

      dispatcher.clear();
      await dispatcher.dispatch(7);

      assert.strictEqual(resultNr, 0, "resultNr should be 0.");
    });
  });

  describe("SimpleEventList", () => {
    it("Subscribe to event name", async () => {
      let event = "myEvent";
      let list = new PromiseSimpleEventList<number>();
      var fn = async (nr: number) => { };

      list.get(event).subscribe(fn);
      var result = list.get(event).has(fn);
      assert.strictEqual(result, true, "result should be true.");
    });

    it("Unsubscribe to event name", async () => {
      let event = "myEvent";
      let list = new PromiseSimpleEventList<number>();
      var fn = async (nr: number) => { };

      list.get(event).subscribe(fn);
      list.get(event).unsubscribe(fn);

      var result = list.get(event).has(fn);
      assert.strictEqual(result, false, "result should be false due to unsubscribe.");
    });

    it("Test firing two events in one list", async () => {
      let list = new PromiseSimpleEventList<number>();
      let result = "";

      let event1 = "ev1";
      var fn1 = async (nr: number) => {
        result = "ev1:" + nr;
      };

      let event2 = "ev2";
      var fn2 = async (nr: number) => {
        result = "ev2:" + nr;
      };

      list.get(event1).subscribe(fn1);
      list.get(event2).subscribe(fn2);

      await list.get(event2).dispatch(16);
      assert.strictEqual(result, "ev2:16", 'Result should be "ev2:16.');

      await list.get(event1).dispatch(8);
      assert.strictEqual(result, "ev1:8", 'Result should be "ev1:8.');
    });

    it("Test remove from list.", () => {
      let list = new PromiseSimpleEventList<number>();
      var fn = async (nr: number) => { };

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

  describe("PromiseNonUniformSimpleEventList", () => {
    it("Subscribe to event name", () => {
      type ArgMap = { "myEvent": number };
      let list = new NonUniformPromiseSimpleEventList<ArgMap>();
      var fn = async (nr: number) => { };

      list.get("myEvent").subscribe(fn);
      var result = list.get("myEvent").has(fn);
      assert.strictEqual(result, true, "result should be true.");
    });

    it("Unsubscribe to event name", () => {
      type ArgMap = { "myEvent": number };
      let list = new NonUniformPromiseSimpleEventList<ArgMap>();
      var fn = async (nr: number) => { };

      list.get("myEvent").subscribe(fn);
      list.get("myEvent").unsubscribe(fn);

      var result = list.get("myEvent").has(fn);
      assert.strictEqual(result, false, "result should be false due to unsubscribe.");
    });

    it("Test firing two events in one list", async () => {
      type ArgMap = { "ev1": number, "ev2": number };
      let list = new NonUniformPromiseSimpleEventList<ArgMap>();
      let result = "";

      var fn1 = async (nr: number) => {
        result = "ev1:" + nr;
      };

      var fn2 = async (nr: number) => {
        result = "ev2:" + nr;
      };

      list.get("ev1").subscribe(fn1);
      list.get("ev2").subscribe(fn2);

      await list.get("ev2").dispatch(16);
      assert.strictEqual(result, "ev2:16", 'Result should be "ev2:16.');

      await list.get("ev1").dispatch(8);
      assert.strictEqual(result, "ev1:8", 'Result should be "ev1:8.');
    });

    it("Test remove from list.", () => {
      type ArgMap = { "ev1": number, "ev2": number };
      let list = new NonUniformPromiseSimpleEventList<ArgMap>();
      var fn = async (nr: number) => { };

      list.get("ev1").subscribe(fn);

      list.get("ev2").subscribe(fn);

      let result = list.get("ev2").has(fn);
      assert.strictEqual(result, true, "Event 2 should be present.");

      list.remove("ev2");

      result = list.get("ev1").has(fn);
      assert.strictEqual(result, true, "Event 1 should still be present.");

      result = list.get("ev2").has(fn);
      assert.strictEqual(result, false, "Event 2 should not be present.");
    });
  });

});
