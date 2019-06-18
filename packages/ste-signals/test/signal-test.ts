"use strict";

import { expect } from "chai";

import { SignalDispatcher, SignalList } from "./../src/";

describe("Strongly Typed Events - Signal", () => {
  describe("SignalDispatcher", () => {

    it("Counting subscriptions", () => {
      let dispatcher = new SignalDispatcher();
      let callback = ()=>{};
      let callback2 = ()=>{};

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

  describe("SignalList", () => {
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
});
