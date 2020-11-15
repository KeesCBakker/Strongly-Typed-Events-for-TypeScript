"use strict";

import { expect } from "chai";
import { PromiseEventDispatcher, PromiseEventList, NonUniformPromiseEventList } from "../src";

class Dummy {
  constructor(name: string) {}
}

describe("Strongly Typed Events - Promise Event", () => {
  describe("PromiseEventDispatcher", () => {
    it("Subscribing to the event dispatcher", async () => {
      var carolus = new Dummy("Carolus");

      let dispatcher = new PromiseEventDispatcher<Dummy, number>();
      let resultNr = 0;
      let resultDummy: Dummy | null = null;

      dispatcher.subscribe(async (dummy, nr) => {
        resultDummy = dummy;
        resultNr = nr;
      });

      await dispatcher.dispatch(carolus, 7);

      expect(resultDummy, "resultDummy should be Carolus").to.equal(carolus);
      expect(resultNr, "resultNr should be 7.").to.equal(7);
    });

    it("Sub to the event dispatcher", async () => {
      var carolus = new Dummy("Carolus");

      let dispatcher = new PromiseEventDispatcher<Dummy, number>();
      let resultNr = 0;
      let resultDummy: Dummy | null = null;

      dispatcher.sub(async (dummy, nr) => {
        resultDummy = dummy;
        resultNr = nr;
      });

      await dispatcher.dispatch(carolus, 7);

      expect(resultDummy, "resultDummy should be Carolus").to.equal(carolus);
      expect(resultNr, "resultNr should be 7.").to.equal(7);
    });

    it("Subscribing to the event dispatcher. Fire twice", async () => {
      var carolus = new Dummy("Carolus");

      let dispatcher = new PromiseEventDispatcher<Dummy, number>();
      let resultNr = 0;
      let resultDummy: Dummy | null = null;

      dispatcher.subscribe(async (dummy, nr) => {
        resultDummy = dummy;
        resultNr += nr;
      });

      await dispatcher.dispatch(carolus, 7);
      await dispatcher.dispatch(carolus, 6);

      expect(resultDummy, "resultDummy should be Carolus").to.equal(carolus);
      expect(resultNr, "resultNr should be 13.").to.equal(13);
    });

    it("Sub to the event dispatcher. Fire twice", async () => {
      var carolus = new Dummy("Carolus");

      let dispatcher = new PromiseEventDispatcher<Dummy, number>();
      let resultNr = 0;
      let resultDummy: Dummy | null = null;

      dispatcher.sub(async (dummy, nr) => {
        resultDummy = dummy;
        resultNr += nr;
      });

      await dispatcher.dispatch(carolus, 7);
      await dispatcher.dispatch(carolus, 6);

      expect(resultDummy, "resultDummy should be Carolus").to.equal(carolus);
      expect(resultNr, "resultNr should be 13.").to.equal(13);
    });

    it("One subscription to the event dispatcher. Fire twice.", async () => {
      var carolus = new Dummy("Carolus");

      let dispatcher = new PromiseEventDispatcher<Dummy, number>();
      let resultNr = 0;
      let resultDummy: Dummy | null = null;

      dispatcher.one(async (dummy, nr) => {
        resultDummy = dummy;
        resultNr += nr;
      });

      await dispatcher.dispatch(carolus, 7);
      await dispatcher.dispatch(carolus, 6);

      expect(resultDummy, "resultDummy should be Carolus").to.equal(carolus);
      expect(resultNr, "resultNr should be 7.").to.equal(7);
    });

    it("Unsubscribing from the event dispatcher.", async () => {
      var carolus = new Dummy("Carolus");

      let dispatcher = new PromiseEventDispatcher<Dummy, number>();
      let resultNr = 0;
      let resultDummy: Dummy | null = null;

      var fn = async (dummy: Dummy, nr: number) => {
        resultDummy = dummy;
        resultNr += nr;
      };

      dispatcher.sub(fn);
      dispatcher.unsub(fn);
      await dispatcher.dispatch(carolus, 6);

      expect(resultDummy, "resultDummy should be empty.").to.equal(null);
      expect(resultNr, "resultNr should be 0.").to.equal(0);
    });

    it("Unsub from the event dispatcher.", async () => {
      var carolus = new Dummy("Carolus");

      let dispatcher = new PromiseEventDispatcher<Dummy, number>();
      let resultNr = 0;
      let resultDummy: Dummy | null = null;

      var fn = async (dummy: Dummy, nr: number) => {
        resultDummy = dummy;
        resultNr += nr;
      };

      dispatcher.sub(fn);
      dispatcher.unsub(fn);
      await dispatcher.dispatch(carolus, 6);

      expect(resultDummy, "resultDummy should be empty.").to.equal(null);
      expect(resultNr, "resultNr should be 0.").to.equal(0);
    });

    it("Unsubscribing from event dispatcher using subscribe's return function.", async () => {
      var carolus = new Dummy("Carolus");

      let dispatcher = new PromiseEventDispatcher<Dummy, number>();
      let resultNr = 0;
      let resultDummy: Dummy | null = null;

      let unsub = dispatcher.subscribe((dummy: Dummy, nr: number) => {
        resultDummy = dummy;
        resultNr += nr;
      });
      unsub();
      await dispatcher.dispatch(carolus, 6);

      expect(resultDummy, "resultDummy should be empty.").to.equal(null);
      expect(resultNr, "resultNr should be 0.").to.equal(0);
    });

    it("Unsubscribing from event dispatcher using sub's return function.", async () => {
      var carolus = new Dummy("Carolus");

      let dispatcher = new PromiseEventDispatcher<Dummy, number>();
      let resultNr = 0;
      let resultDummy: Dummy | null = null;

      let unsub = dispatcher.sub((dummy: Dummy, nr: number) => {
        resultDummy = dummy;
        resultNr += nr;
      });
      unsub();
      await dispatcher.dispatch(carolus, 6);

      expect(resultDummy, "resultDummy should be empty.").to.equal(null);
      expect(resultNr, "resultNr should be 0.").to.equal(0);
    });

    it("Unsubscribing to a one subscription.", async () => {
      var carolus = new Dummy("Carolus");

      let dispatcher = new PromiseEventDispatcher<Dummy, number>();
      let resultNr = 0;
      let resultDummy: Dummy | null = null;

      var fn = async (dummy: Dummy, nr: number) => {
        resultDummy = dummy;
        resultNr += nr;
      };

      dispatcher.one(fn);
      dispatcher.unsubscribe(fn);
      await dispatcher.dispatch(carolus, 6);

      expect(resultDummy, "resultDummy should be empty.").to.equal(null);
      expect(resultNr, "resultNr should be 0.").to.equal(0);
    });

    it("Unsubscribing from event dispatcher using one's return function.", async () => {
      var carolus = new Dummy("Carolus");

      let dispatcher = new PromiseEventDispatcher<Dummy, number>();
      let resultNr = 0;
      let resultDummy: Dummy | null = null;

      let unsub = dispatcher.one((dummy: Dummy, nr: number) => {
        resultDummy = dummy;
        resultNr += nr;
      });
      unsub();
      await dispatcher.dispatch(carolus, 6);

      expect(resultDummy, "resultDummy should be empty.").to.equal(null);
      expect(resultNr, "resultNr should be 0.").to.equal(0);
    });

    it("Has no event.", () => {
      var fn = async (dummy: Dummy, nr: number) => {};
      let dispatcher = new PromiseEventDispatcher<Dummy, number>();
      let result = dispatcher.has(fn);
      expect(result, "Handler should not be present.").to.equal(false);
    });

    it("Has event through subscribe.", () => {
      var fn = async (dummy: Dummy, nr: number) => {};
      let dispatcher = new PromiseEventDispatcher<Dummy, number>();
      dispatcher.subscribe(fn);
      let result = dispatcher.has(fn);
      expect(result, "Handler should be present.").to.equal(true);
    });

    it("Has event through one.", () => {
      var fn = async (dummy: Dummy, nr: number) => {};
      let dispatcher = new PromiseEventDispatcher<Dummy, number>();
      dispatcher.one(fn);
      let result = dispatcher.has(fn);
      expect(result, "Handler should be present.").to.equal(true);
    });

    it("Test subscribe -> unsubscribe -> has", () => {
      var fn = async (dummy: Dummy, nr: number) => {};
      let dispatcher = new PromiseEventDispatcher<Dummy, number>();
      dispatcher.subscribe(fn);
      dispatcher.unsubscribe(fn);
      let result = dispatcher.has(fn);
      expect(
        result,
        "Handler should not be present because of unsubscribe."
      ).to.equal(false);
    });

    it("Clear subscriptions.", async () => {
      var carolus = new Dummy("Carolus");
      var willem = new Dummy("Willem");

      let dispatcher = new PromiseEventDispatcher<Dummy, number>();
      let resultNr = 0;
      let resultDummy = willem;

      dispatcher.subscribe((dummy, nr) => {
        resultDummy = dummy;
        resultNr = nr;
      });

      dispatcher.clear();
      await dispatcher.dispatch(carolus, 7);

      expect(resultDummy, "resultDummy should be Willem").to.equal(willem);
      expect(resultNr, "resultNr should be 0.").to.equal(0);
    });
  });

  describe("PromiseEventList", () => {
    it("Subscribe to event name", () => {
      let event = "myEvent";
      let list = new PromiseEventList<Dummy, number>();
      var fn = async (dummy: Dummy, nr: number) => {};

      list.get(event).subscribe(fn);
      var result = list.get(event).has(fn);
      expect(result, "result should be true.").to.equals(true);
    });

    it("Unsubscribe to event name", () => {
      let event = "myEvent";
      let list = new PromiseEventList<Dummy, number>();
      var fn = async (dummy: Dummy, nr: number) => {};

      list.get(event).subscribe(fn);
      list.get(event).unsubscribe(fn);

      var result = list.get(event).has(fn);
      expect(result, "result should be false due to unsubscribe.").to.equals(
        false
      );
    });

    it("Test firing two events in one list", () => {
      let list = new PromiseEventList<Dummy | null, number>();
      let result = "";

      let event1 = "ev1";
      var fn1 = (dummy: Dummy | null, nr: number) => {
        result = "ev1:" + nr;
      };

      let event2 = "ev2";
      var fn2 = (dummy: Dummy | null, nr: number) => {
        result = "ev2:" + nr;
      };

      list.get(event1).subscribe(fn1);
      list.get(event2).subscribe(fn2);

      list.get(event2).dispatch(null, 16);
      expect(result, 'Result should be "ev2:16.').to.equal("ev2:16");

      list.get(event1).dispatch(null, 8);
      expect(result, 'Result should be "ev1:8.').to.equal("ev1:8");
    });

    it("Test remove from list.", () => {
      let list = new PromiseEventList<Dummy, number>();
      var fn = async (dummy: Dummy, nr: number) => {};

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

  describe("NonUniformPromiseEventList", () => {
    it("Subscribe to event name", () => {
      type ArgMap = {"myEvent": number};
      let list = new NonUniformPromiseEventList<Dummy, ArgMap>();
      var fn = async (dummy: Dummy, nr: number) => {};

      list.get("myEvent").subscribe(fn);
      var result = list.get("myEvent").has(fn);
      expect(result, "result should be true.").to.equals(true);
    });

    it("Unsubscribe to event name", () => {
      type ArgMap = {"myEvent": number};
      let list = new NonUniformPromiseEventList<Dummy, ArgMap>();
      var fn = async (dummy: Dummy, nr: number) => {};

      list.get("myEvent").subscribe(fn);
      list.get("myEvent").unsubscribe(fn);

      var result = list.get("myEvent").has(fn);
      expect(result, "result should be false due to unsubscribe.").to.equals(
        false
      );
    });

    it("Test firing two events in one list", () => {
      type ArgMap = {"ev1": number, "ev2": number};
      let list = new NonUniformPromiseEventList<Dummy | null, ArgMap>();
      let result = "";

      var fn1 = (dummy: Dummy | null, nr: number) => {
        result = "ev1:" + nr;
      };

      var fn2 = (dummy: Dummy | null, nr: number) => {
        result = "ev2:" + nr;
      };

      list.get("ev1").subscribe(fn1);
      list.get("ev2").subscribe(fn2);

      list.get("ev2").dispatch(null, 16);
      expect(result, 'Result should be "ev2:16.').to.equal("ev2:16");

      list.get("ev1").dispatch(null, 8);
      expect(result, 'Result should be "ev1:8.').to.equal("ev1:8");
    });

    it("Test remove from list.", () => {
      type ArgMap = {"ev1": number, "ev2": number};
      let list = new NonUniformPromiseEventList<Dummy, ArgMap>();
      var fn = async (dummy: Dummy, nr: number) => {};

      list.get("ev1").subscribe(fn);

      list.get("ev2").subscribe(fn);

      let result = list.get("ev2").has(fn);
      expect(result, "Event 2 should be present.").to.equal(true);

      list.remove("ev2");

      result = list.get("ev1").has(fn);
      expect(result, "Event 1 should still be present.").to.equal(true);

      result = list.get("ev2").has(fn);
      expect(result, "Event 2 should not be present.").to.equal(false);
    });
  });
});
