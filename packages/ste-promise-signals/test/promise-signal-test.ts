"use strict";

import { expect } from "chai";

import { PromiseSignalDispatcher, PromiseSignalList } from "../src";

describe("Strongly Typed Events - PromiseSignal", () => {
  describe("PromiseSignalDispatcher", () => {

    it("Counting subscriptions", () => {
      let dispatcher = new PromiseSignalDispatcher();
      let callback = async ()=>{};
      let callback2 = async ()=>{};

      expect(dispatcher.count, "Subscription count should be 0").to.equal(0);
      dispatcher.sub(callback);
      expect(dispatcher.count, "Subscription count should be 1").to.equal(1);
      dispatcher.unsub(callback);
      expect(dispatcher.count, "Subscription count should be 0").to.equal(0);
      dispatcher.sub(callback);
      dispatcher.sub(callback2);
      expect(dispatcher.count, "Subscription count should be 2").to.equal(2);
    });

    it("Subscribing to the signal dispatcher", async () => {
      let dispatcher = new PromiseSignalDispatcher();
      let resultNr = 0;

      dispatcher.subscribe(async () => {
        resultNr = 7;
      });

      await dispatcher.dispatch();

      expect(resultNr, "resultNr should be 7.").to.equal(7);
    });

    it("Sub to the signal dispatcher", async () => {
      let dispatcher = new PromiseSignalDispatcher();
      let resultNr = 0;

      dispatcher.sub(async () => {
        resultNr = 7;
      });

      await dispatcher.dispatch();

      expect(resultNr, "resultNr should be 7.").to.equal(7);
    });

    it("Subscribing to the signal dispatcher. Fire twice", async () => {
      let dispatcher = new PromiseSignalDispatcher();
      let resultNr = 0;

      dispatcher.subscribe(async () => {
        resultNr += 6;
      });

      await dispatcher.dispatch();
      await dispatcher.dispatch();

      expect(resultNr, "resultNr should be 12.").to.equal(12);
    });

    it("Sub to the signal dispatcher. Fire twice", async () => {
      let dispatcher = new PromiseSignalDispatcher();
      let resultNr = 0;

      dispatcher.sub(async () => {
        resultNr += 6;
      });

      await dispatcher.dispatch();
      await dispatcher.dispatch();

      expect(resultNr, "resultNr should be 12.").to.equal(12);
    });

    it("One subscription to the signal dispatcher. Fire twice.", async () => {
      let dispatcher = new PromiseSignalDispatcher();
      let resultNr = 0;

      dispatcher.one(async () => {
        resultNr += 2;
      });

      await dispatcher.dispatch();
      await dispatcher.dispatch();

      expect(resultNr, "resultNr should be 2.").to.equal(2);
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

      expect(resultNr, "resultNr should be 0.").to.equal(0);
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

      expect(resultNr, "resultNr should be 0.").to.equal(0);
    });

    it("Unsubscribing from signal dispatcher using subscribe's return function.", async () => {
      let dispatcher = new PromiseSignalDispatcher();
      let resultNr = 0;

      let unsub = dispatcher.subscribe(async () => {
        resultNr += 2;
      });
      unsub();
      await dispatcher.dispatch();

      expect(resultNr, "resultNr should be 0.").to.equal(0);
    });

    it("Unsubscribing from signal dispatcher using sub's return function.", async () => {
      let dispatcher = new PromiseSignalDispatcher();
      let resultNr = 0;

      let unsub = dispatcher.sub(async () => {
        resultNr += 2;
      });
      unsub();
      await dispatcher.dispatch();

      expect(resultNr, "resultNr should be 0.").to.equal(0);
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

      expect(resultNr, "resultNr should be 0.").to.equal(0);
    });

    it("Unsubscribing from signal dispatcher using one's return function.", async () => {
      let dispatcher = new PromiseSignalDispatcher();
      let resultNr = 0;

      let unsub = dispatcher.one(async () => {
        resultNr += 2;
      });
      unsub();
      await dispatcher.dispatch();

      expect(resultNr, "resultNr should be 0.").to.equal(0);
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

      expect(resultNr, "resultNr should be 0.").to.equal(0);
    });

    it("Has no event.", () => {
      var fn = async () => {};
      let dispatcher = new PromiseSignalDispatcher();
      let result = dispatcher.has(fn);
      expect(result, "Handler should not be present.").to.equal(false);
    });

    it("Has event through subscribe.", () => {
      var fn = async () => {};
      let dispatcher = new PromiseSignalDispatcher();
      dispatcher.subscribe(fn);
      let result = dispatcher.has(fn);
      expect(result, "Handler should be present.").to.equal(true);
    });

    it("Has event through one.", () => {
      var fn = async () => {};
      let dispatcher = new PromiseSignalDispatcher();
      dispatcher.one(fn);
      let result = dispatcher.has(fn);
      expect(result, "Handler should be present.").to.equal(true);
    });

    it("Test subscribe -> unsubscribe -> has", () => {
      var fn = async () => {};
      let dispatcher = new PromiseSignalDispatcher();
      dispatcher.subscribe(fn);
      dispatcher.unsubscribe(fn);
      let result = dispatcher.has(fn);
      expect(
        result,
        "Handler should not be present because of unsubscribe."
      ).to.equal(false);
    });

    it("Clear subscriptions.", async () => {
      let dispatcher = new PromiseSignalDispatcher();
      let resultNr = 0;

      dispatcher.subscribe(async () => {
        resultNr = 7;
      });

      dispatcher.clear();
      await dispatcher.dispatch();

      expect(resultNr, "resultNr should be 0.").to.equal(0);
    });
  });

  describe("PromiseSignalList", () => {
    it("Subscribe to event name", () => {
      let event = "myEvent";
      let list = new PromiseSignalList();
      var fn = async () => {};

      list.get(event).subscribe(fn);
      var result = list.get(event).has(fn);
      expect(result, "result should be true.").to.equals(true);
    });

    it("Unsubscribe to event name", () => {
      let event = "myEvent";
      let list = new PromiseSignalList();
      var fn = async () => {};

      list.get(event).subscribe(fn);
      list.get(event).unsubscribe(fn);

      var result = list.get(event).has(fn);
      expect(result, "result should be false due to unsubscribe.").to.equals(
        false
      );
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
      expect(result, 'Result should be "ev2:16.').to.equal("ev2:16");

      await list.get(event1).dispatch();
      expect(result, 'Result should be "ev1:8.').to.equal("ev1:8");
    });

    it("Test remove from list.", () => {
      let list = new PromiseSignalList();
      var fn = async () => {};

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
});
