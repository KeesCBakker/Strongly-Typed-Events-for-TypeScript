"use strict";

import { describe, it } from "node:test";
import * as assert from "node:assert/strict";

import { PromiseSignalDispatcher, PromiseSignalList } from "ste-promise-signals";

describe("Strongly Typed Events - Promise Signal", () => {
  describe("PromiseSignalDispatcher", () => {

    it("Counting subscriptions", () => {
      let dispatcher = new PromiseSignalDispatcher();
      let callback = async ()=>{};
      let callback2 = async ()=>{};

      assert.strictEqual(dispatcher.count, 0, "Subscription count should be 0");
      dispatcher.sub(callback);
      assert.strictEqual(dispatcher.count, 1, "Subscription count should be 1");
      dispatcher.unsub(callback);
      assert.strictEqual(dispatcher.count, 0, "Subscription count should be 0");
      dispatcher.sub(callback);
      dispatcher.sub(callback2);
      assert.strictEqual(dispatcher.count, 2, "Subscription count should be 2");
    });

    it("Subscribing to the signal dispatcher", async () => {
      let dispatcher = new PromiseSignalDispatcher();
      let resultNr = 0;

      dispatcher.subscribe(async () => {
        resultNr = 7;
      });

      await dispatcher.dispatch();

      assert.strictEqual(resultNr, 7, "resultNr should be 7.");
    });

    it("Sub to the signal dispatcher", async () => {
      let dispatcher = new PromiseSignalDispatcher();
      let resultNr = 0;

      dispatcher.sub(async () => {
        resultNr = 7;
      });

      await dispatcher.dispatch();

      assert.strictEqual(resultNr, 7, "resultNr should be 7.");
    });

    it("Subscribing to the signal dispatcher. Fire twice", async () => {
      let dispatcher = new PromiseSignalDispatcher();
      let resultNr = 0;

      dispatcher.subscribe(async () => {
        resultNr += 6;
      });

      await dispatcher.dispatch();
      await dispatcher.dispatch();

      assert.strictEqual(resultNr, 12, "resultNr should be 12.");
    });

    it("Sub to the signal dispatcher. Fire twice", async () => {
      let dispatcher = new PromiseSignalDispatcher();
      let resultNr = 0;

      dispatcher.sub(async () => {
        resultNr += 6;
      });

      await dispatcher.dispatch();
      await dispatcher.dispatch();

      assert.strictEqual(resultNr, 12, "resultNr should be 12.");
    });

    it("One subscription to the signal dispatcher. Fire twice.", async () => {
      let dispatcher = new PromiseSignalDispatcher();
      let resultNr = 0;

      dispatcher.one(async () => {
        resultNr += 2;
      });

      await dispatcher.dispatch();
      await dispatcher.dispatch();

      assert.strictEqual(resultNr, 2, "resultNr should be 2.");
    });

    it("Unsubscribing to the signal dispatcher.", async () => {
      let dispatcher = new PromiseSignalDispatcher();
      let resultNr = 0;

      var fn = async () => {
        resultNr += 2;
      };

      dispatcher.subscribe(fn);
      dispatcher.unsubscribe(fn);
      await dispatcher.dispatch();

      assert.strictEqual(resultNr, 0, "resultNr should be 0.");
    });

    it("Unsub to the signal dispatcher.", async () => {
      let dispatcher = new PromiseSignalDispatcher();
      let resultNr = 0;

      var fn = async () => {
        resultNr += 2;
      };

      dispatcher.sub(fn);
      dispatcher.unsub(fn);
      await dispatcher.dispatch();

      assert.strictEqual(resultNr, 0, "resultNr should be 0.");
    });

    it("Unsubscribing from signal dispatcher using subscribe's return function.", async () => {
      let dispatcher = new PromiseSignalDispatcher();
      let resultNr = 0;

      let unsub = dispatcher.subscribe(async () => {
        resultNr += 2;
      });
      unsub();
      await dispatcher.dispatch();

      assert.strictEqual(resultNr, 0, "resultNr should be 0.");
    });

    it("Unsubscribing from signal dispatcher using sub's return function.", async () => {
      let dispatcher = new PromiseSignalDispatcher();
      let resultNr = 0;

      let unsub = dispatcher.sub(async () => {
        resultNr += 2;
      });
      unsub();
      await dispatcher.dispatch();

      assert.strictEqual(resultNr, 0, "resultNr should be 0.");
    });

    it("Unsubscribing from one subscription.", async () => {
      let dispatcher = new PromiseSignalDispatcher();
      let resultNr = 0;

      var fn = async () => {
        resultNr += 2;
      };

      dispatcher.one(fn);
      dispatcher.unsubscribe(fn);
      await dispatcher.dispatch();

      assert.strictEqual(resultNr, 0, "resultNr should be 0.");
    });

    it("Unsubscribing from signal dispatcher using one's return function.", async () => {
      let dispatcher = new PromiseSignalDispatcher();
      let resultNr = 0;

      let unsub = dispatcher.one(async () => {
        resultNr += 2;
      });
      unsub();
      await dispatcher.dispatch();

      assert.strictEqual(resultNr, 0, "resultNr should be 0.");
    });

    it("Unsub from one subscription.", async () => {
      let dispatcher = new PromiseSignalDispatcher();
      let resultNr = 0;

      var fn = async () => {
        resultNr += 2;
      };

      dispatcher.one(fn);
      dispatcher.unsub(fn);
      await dispatcher.dispatch();

      assert.strictEqual(resultNr, 0, "resultNr should be 0.");
    });

    it("Has no event.", () => {
      var fn = async () => {};
      let dispatcher = new PromiseSignalDispatcher();
      let result = dispatcher.has(fn);
      assert.strictEqual(result, false, "Handler should not be present.");
    });

    it("Has event through subscribe.", () => {
      var fn = async () => {};
      let dispatcher = new PromiseSignalDispatcher();
      dispatcher.subscribe(fn);
      let result = dispatcher.has(fn);
      assert.strictEqual(result, true, "Handler should be present.");
    });

    it("Has event through one.", () => {
      var fn = async () => {};
      let dispatcher = new PromiseSignalDispatcher();
      dispatcher.one(fn);
      let result = dispatcher.has(fn);
      assert.strictEqual(result, true, "Handler should be present.");
    });

    it("Test subscribe -> unsubscribe -> has", () => {
      var fn = async () => {};
      let dispatcher = new PromiseSignalDispatcher();
      dispatcher.subscribe(fn);
      dispatcher.unsubscribe(fn);
      let result = dispatcher.has(fn);
      assert.strictEqual(
        result, false,
        "Handler should not be present because of unsubscribe."
      );
    });

    it("Clear subscriptions.", async () => {
      let dispatcher = new PromiseSignalDispatcher();
      let resultNr = 0;

      dispatcher.subscribe(async () => {
        resultNr = 7;
      });

      dispatcher.clear();
      await dispatcher.dispatch();

      assert.strictEqual(resultNr, 0, "resultNr should be 0.");
    });
  });

  describe("PromiseSignalList", () => {
    it("Subscribe to event name", () => {
      let event = "myEvent";
      let list = new PromiseSignalList();
      var fn = async () => {};

      list.get(event).subscribe(fn);
      var result = list.get(event).has(fn);
      assert.strictEqual(result, true, "result should be true.");
    });

    it("Unsubscribe to event name", () => {
      let event = "myEvent";
      let list = new PromiseSignalList();
      var fn = async () => {};

      list.get(event).subscribe(fn);
      list.get(event).unsubscribe(fn);

      var result = list.get(event).has(fn);
      assert.strictEqual(result, false, "result should be false due to unsubscribe.");
    });

    it("Test firing two events in one list", async () => {
      let list = new PromiseSignalList();
      let result = "";

      let event1 = "ev1";
      var fn1 = async () => {
        result = "ev1:" + 8;
      };

      let event2 = "ev2";
      var fn2 = async () => {
        result = "ev2:" + 16;
      };

      list.get(event1).subscribe(fn1);
      list.get(event2).subscribe(fn2);

      await list.get(event2).dispatch();
      assert.strictEqual(result, "ev2:16", 'Result should be "ev2:16.');

      await list.get(event1).dispatch();
      assert.strictEqual(result, "ev1:8", 'Result should be "ev1:8.');
    });

    it("Test remove from list.", () => {
      let list = new PromiseSignalList();
      var fn = async () => {};

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
});
