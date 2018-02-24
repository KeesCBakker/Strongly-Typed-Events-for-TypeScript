"use strict";

import { expect } from "chai";

import { SimpleEventDispatcher, SimpleEventList } from "./../";


describe("Strongly Typed Events - Simple event", function() {
  describe("SimpleEventDispatcher", function() {
    it("Subscribing to the simple event dispatcher", function() {
      let dispatcher = new SimpleEventDispatcher<number>();
      let resultNr = 0;

      dispatcher.subscribe(nr => {
        resultNr = nr;
      });

      dispatcher.dispatch(7);

      expect(resultNr, "resultNr should be 7.").to.equal(7);
    });

    it("Sub to the simple event dispatcher", function() {
      let dispatcher = new SimpleEventDispatcher<number>();
      let resultNr = 0;

      dispatcher.sub(nr => {
        resultNr = nr;
      });

      dispatcher.dispatch(7);

      expect(resultNr, "resultNr should be 7.").to.equal(7);
    });

    it("Subscribing to the simple event dispatcher. Fire twice", function() {
      let dispatcher = new SimpleEventDispatcher<number>();
      let resultNr = 0;

      dispatcher.subscribe(nr => {
        resultNr += nr;
      });

      dispatcher.dispatch(7);
      dispatcher.dispatch(6);

      expect(resultNr, "resultNr should be 13.").to.equal(13);
    });

    it("Sub to the simple event dispatcher. Fire twice", function() {
      let dispatcher = new SimpleEventDispatcher<number>();
      let resultNr = 0;

      dispatcher.sub(nr => {
        resultNr += nr;
      });

      dispatcher.dispatch(7);
      dispatcher.dispatch(6);

      expect(resultNr, "resultNr should be 13.").to.equal(13);
    });

    it("One subscription to the simple event dispatcher. Fire twice.", function() {
      let dispatcher = new SimpleEventDispatcher<number>();
      let resultNr = 0;

      dispatcher.one(nr => {
        resultNr += nr;
      });

      dispatcher.dispatch(7);
      dispatcher.dispatch(6);

      expect(resultNr, "resultNr should be 7.").to.equal(7);
    });

    it("Unsubscribing to the simple event dispatcher.", function() {
      let dispatcher = new SimpleEventDispatcher<number>();
      let resultNr = 0;

      var fn = (nr: number) => {
        resultNr += nr;
      };

      dispatcher.sub(fn);
      dispatcher.unsub(fn);
      dispatcher.dispatch(6);

      expect(resultNr, "resultNr should be 0.").to.equal(0);
    });

    it("Unsub to the simple event dispatcher.", function() {
      let dispatcher = new SimpleEventDispatcher<number>();
      let resultNr = 0;

      var fn = (nr: number) => {
        resultNr += nr;
      };

      dispatcher.sub(fn);
      dispatcher.unsub(fn);
      dispatcher.dispatch(6);

      expect(resultNr, "resultNr should be 0.").to.equal(0);
    });

    it("Unsubscribing from simple event dispatcher using subscribe's return function.", function() {
      let dispatcher = new SimpleEventDispatcher<number>();
      let resultNr = 0;

      let unsub = dispatcher.subscribe((nr: number) => {
        resultNr += nr;
      });
      unsub();
      dispatcher.dispatch(6);

      expect(resultNr, "resultNr should be 0.").to.equal(0);
    });

    it("Unsubscribing from simple event dispatcher using sub's return function.", function() {
      let dispatcher = new SimpleEventDispatcher<number>();
      let resultNr = 0;

      let unsub = dispatcher.sub((nr: number) => {
        resultNr += nr;
      });
      unsub();
      dispatcher.dispatch(6);

      expect(resultNr, "resultNr should be 0.").to.equal(0);
    });

    it("Unsubscribing to a one subscription.", function() {
      let dispatcher = new SimpleEventDispatcher<number>();
      let resultNr = 0;

      var fn = (nr: number) => {
        resultNr += nr;
      };

      dispatcher.one(fn);
      dispatcher.unsubscribe(fn);
      dispatcher.dispatch(6);

      expect(resultNr, "resultNr should be 0.").to.equal(0);
    });

    it("Unsubscribing from simple event dispatcher using one's return function.", function() {
      let dispatcher = new SimpleEventDispatcher<number>();
      let resultNr = 0;

      let unsub = dispatcher.one((nr: number) => {
        resultNr += nr;
      });
      unsub();
      dispatcher.dispatch(6);

      expect(resultNr, "resultNr should be 0.").to.equal(0);
    });

    it("Unsub from one subscription.", function() {
      let dispatcher = new SimpleEventDispatcher<number>();
      let resultNr = 0;

      var fn = (nr: number) => {
        resultNr += nr;
      };

      dispatcher.one(fn);
      dispatcher.unsub(fn);
      dispatcher.dispatch(6);

      expect(resultNr, "resultNr should be 0.").to.equal(0);
    });

    it("Has no event.", function() {
      var fn = (nr: number) => {};
      let dispatcher = new SimpleEventDispatcher<number>();
      let result = dispatcher.has(fn);
      expect(result, "Handler should not be present.").to.equal(false);
    });

    it("Has event through subscribe.", function() {
      var fn = (nr: number) => {};
      let dispatcher = new SimpleEventDispatcher<number>();
      dispatcher.subscribe(fn);
      let result = dispatcher.has(fn);
      expect(result, "Handler should be present.").to.equal(true);
    });

    it("Has event through one.", function() {
      var fn = (nr: number) => {};
      let dispatcher = new SimpleEventDispatcher<number>();
      dispatcher.one(fn);
      let result = dispatcher.has(fn);
      expect(result, "Handler should be present.").to.equal(true);
    });

    it("Test subscribe -> unsubscribe -> has", function() {
      var fn = (nr: number) => {};
      let dispatcher = new SimpleEventDispatcher<number>();
      dispatcher.subscribe(fn);
      dispatcher.unsubscribe(fn);
      let result = dispatcher.has(fn);
      expect(
        result,
        "Handler should not be present because of unsubscribe."
      ).to.equal(false);
    });

    it("Clear subscriptions.", function() {
      let dispatcher = new SimpleEventDispatcher<number>();
      let resultNr = 0;

      dispatcher.subscribe(nr => {
        resultNr = nr;
      });

      dispatcher.clear();
      dispatcher.dispatch(7);

      expect(resultNr, "resultNr should be 0.").to.equal(0);
    });
  });

  describe("SimpleEventList", function() {
    it("Subscribe to event name", function() {
      let event = "myEvent";
      let list = new SimpleEventList<number>();
      var fn = (nr: number) => {};

      list.get(event).subscribe(fn);
      var result = list.get(event).has(fn);
      expect(result, "result should be true.").to.equals(true);
    });

    it("Unsubscribe to event name", function() {
      let event = "myEvent";
      let list = new SimpleEventList<number>();
      var fn = (nr: number) => {};

      list.get(event).subscribe(fn);
      list.get(event).unsubscribe(fn);

      var result = list.get(event).has(fn);
      expect(result, "result should be false due to unsubscribe.").to.equals(
        false
      );
    });

    it("Test firing two events in one list", function() {
      let list = new SimpleEventList<number>();
      let result = "";

      let event1 = "ev1";
      var fn1 = (nr: number) => {
        result = "ev1:" + nr;
      };

      let event2 = "ev2";
      var fn2 = (nr: number) => {
        result = "ev2:" + nr;
      };

      list.get(event1).subscribe(fn1);
      list.get(event2).subscribe(fn2);

      list.get(event2).dispatch(16);
      expect(result, 'Result should be "ev2:16.').to.equal("ev2:16");

      list.get(event1).dispatch(8);
      expect(result, 'Result should be "ev1:8.').to.equal("ev1:8");
    });

    it("Test remove from list.", function() {
      let list = new SimpleEventList<number>();
      var fn = (nr: number) => {};

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
