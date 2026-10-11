"use strict";

import { describe, it } from "node:test";
import * as assert from "node:assert/strict";

import {
  IEvent,
  EventDispatcher,
  EventHandlingBase,
  ISimpleEvent,
  SimpleEventHandlingBase,
  ISignal,
  SignalHandlingBase,
  EventList,
  SimpleEventDispatcher,
  SimpleEventList,
  SignalDispatcher,
  SignalList
} from "strongly-typed-events";

describe("Strongly Typed Events", function() {
  describe("Event", function() {
    it("Subscribe / unsubscribe - event as property", function() {
      class MyEventTester {
        private _myEvent = new EventDispatcher<MyEventTester, string>();

        get myEvent(): IEvent<MyEventTester, string> {
          return this._myEvent.asEvent();
        }

        signal(str: string): void {
          this._myEvent.dispatch(this, str);
        }
      }

      let tester = new MyEventTester();
      let eventHandlerResult = "";

      let handler = (sender: MyEventTester, args: string) => {
        eventHandlerResult = args;
      };

      tester.myEvent.subscribe(handler);
      tester.signal("Test1");
      assert.strictEqual(
        eventHandlerResult, "Test1",
        'The eventHandlerResult should be "Test1".'
      );

      tester.signal("Test2");
      assert.strictEqual(
        eventHandlerResult, "Test2",
        'The eventHandlerResult should be "Test2".'
      );
      tester.myEvent.unsubscribe(handler);
      tester.signal("Test3");

      assert.strictEqual(
        eventHandlerResult, "Test2",
        'The eventHandlerResult should still be "Test2".'
      );
    });

    it("Subscribe / unsubscribe - event on interface", function() {
      interface IMyEventTester {
        myEvent(): IEvent<IMyEventTester, string>;

        signal(str: string): void;
      }

      class MyEventTester implements IMyEventTester {
        private _myEvent: EventDispatcher<
          IMyEventTester,
          string
        > = new EventDispatcher<IMyEventTester, string>();

        myEvent(): IEvent<IMyEventTester, string> {
          return this._myEvent.asEvent();
        }

        signal(str: string): void {
          this._myEvent.dispatch(this, str);
        }
      }

      let tester: IMyEventTester = new MyEventTester();
      let eventHandlerResult = "";

      let handler = (sender: IMyEventTester, args: string) => {
        eventHandlerResult = args;
      };

      tester.myEvent().subscribe(handler);
      tester.signal("Test1");
      assert.strictEqual(
        eventHandlerResult, "Test1",
        'The eventHandlerResult should be "Test1".'
      );

      tester.myEvent().unsubscribe(handler);
      tester.signal("Test2");
      assert.strictEqual(
        eventHandlerResult, "Test1",
        'The eventHandlerResult should still be "Test1".'
      );
    });

    it("Event list", function() {
      const sender = {};
      var events = new EventList<object, string>();
      var result = "";

      events
        .get("Test1")
        .subscribe((sender: object, args: string) => (result = args));
      events.get("Test1").dispatch(sender, "Testing 123");
      assert.strictEqual(result, "Testing 123", 'The result should be "Testing 123".');

      events.get("Test2").dispatch(sender, "Testing 456");
      assert.strictEqual(result, "Testing 123", 'The result should still be "Testing 123".');

      events
        .get("Test2")
        .subscribe((sender: object, args: string) => (result = args));
      events.get("Test2").dispatch(sender, "Testing 789");
      assert.strictEqual(result, "Testing 789", 'The result should be "Testing 789".');

      events
        .get("Test3")
        .asEvent()
        .subscribe((sender: object, args: string) => (result = args));
      events.get("Test3").dispatch(sender, "Testing 42");
      assert.strictEqual(result, "Testing 42", 'The result should be "Testing 42".');
    });

    it("EventHandlingBase", function() {
      class MyTester extends EventHandlingBase<MyTester, string> {
        signal(name: string, str: string): void {
          this.events.get(name).dispatch(this, str);
        }
      }

      var t = new MyTester();
      var result = "";

      t.subscribe("Test1", (sender: MyTester, args: string) => (result = args));
      t.signal("Test1", "Testing 123");
      assert.strictEqual(result, "Testing 123", 'The result should be "Testing 123".');

      t.signal("Test2", "Testing 456");
      assert.strictEqual(result, "Testing 123", 'The result should still be "Testing 123".');

      t.subscribe("Test2", (sender: MyTester, args: string) => (result = args));
      t.signal("Test2", "Testing 789");
      assert.strictEqual(result, "Testing 789", 'The result should be "Testing 789".');
    });

    it("Dispatcher", function() {
      class Source {
        constructor(public name: string) {}
      }
      class Argument {
        constructor(public name: string) {}
      }

      let dispatcher = new EventDispatcher<Source, Argument>();

      var s1 = new Source("s1");
      var s2 = new Source("s2");
      var a1 = new Argument("a1");
      var a2 = new Argument("a2");

      dispatcher.subscribe((sender: Source, argument: Argument) => {
        assert.strictEqual(sender, s1, "Sender should be s1.");
        assert.notStrictEqual(sender, s2, "Sender should not be s2.");

        assert.strictEqual(argument, a1, "Argument should be a1.");
        assert.notStrictEqual(argument, a2, "Argument should not be a2.");
      });

      dispatcher.dispatch(s1, a1);
    });

    it("Async dispatch", { timeout: 2000 }, function(_context, done) {
      let dispatcher = new EventDispatcher<any, number>();

      let i = 0;

      dispatcher.subscribe((s, a) => {
        i = a;
        assert.strictEqual(i, 1, "i should be 1.");
        done();
      });

      dispatcher.dispatchAsync(null, 1);
      assert.strictEqual(i, 0, "Because of async dispatch, i should be 0.");
    });

    it("Unsubscribe event handler after dispatching 2 times.", function() {
      let dispatcher = new EventDispatcher<any, number>();

      let i = 0;

      let unsub = dispatcher.subscribe((s, a) => {
        i += a;
        if (i == 3) {
          unsub();
        }
      });

      dispatcher.dispatch(null, 1);
      dispatcher.dispatch(null, 2);
      dispatcher.dispatch(null, 4);

      assert.strictEqual(i, 3, "Because of unsubscribing, i should be 3.");
    });
  });

  describe("Simple Event", function() {
    it("Subscribe / unsubscribe - simple event as property", function() {
      class MyEventTester {
        private _myEvent = new SimpleEventDispatcher<string>();

        get myEvent() {
          return this._myEvent.asEvent();
        }

        signal(str: string): void {
          this._myEvent.dispatch(str);
        }
      }

      let s = new MyEventTester();
      let result = "";

      var handler = (args: string) => {
        result = args;
      };

      s.myEvent.subscribe(handler);
      s.signal("Test1");
      assert.strictEqual(result, "Test1", 'Result should be "Test1".');

      s.myEvent.unsubscribe(handler);
      s.signal("Test2");
      assert.strictEqual(
        result, "Test1",
        'Result should still be "Test1" because of unsubscribe.'
      );
    });

    it("Subscribe / unsubscribe - simple event on interface", function() {
      interface IMyEventTester {
        myEvent(): ISimpleEvent<string>;

        signal(str: string): void;
      }

      class MyEventTester implements IMyEventTester {
        private _myEvent = new SimpleEventDispatcher<string>();

        myEvent() {
          return this._myEvent.asEvent();
        }

        signal(str: string): void {
          this._myEvent.dispatch(str);
        }
      }

      let s: IMyEventTester = new MyEventTester();
      let result = "";

      var handler = (args: string) => {
        result = args;
      };

      s.myEvent().subscribe(handler);
      s.signal("Test1");
      assert.strictEqual(result, "Test1", 'Result should be "Test1".');

      s.myEvent().unsubscribe(handler);
      s.signal("Test2");
      assert.strictEqual(
        result, "Test1",
        'Result should still be "Test1" because of unsubscribe.'
      );
    });

    it("Simple Event list", function() {
      var events = new SimpleEventList<string>();
      var result = "";

      events.get("Test1").subscribe((args: string) => (result = args));
      events.get("Test1").dispatch("Testing 123");
      assert.strictEqual(result, "Testing 123", 'Result should be "Testing 123".');

      events.get("Test2").dispatch("Testing 456");
      assert.strictEqual(result, "Testing 123", 'Result should still be "Testing 123".');

      events.get("Test2").subscribe((args: string) => (result = args));
      events.get("Test2").dispatch("Testing 789");
      assert.strictEqual(result, "Testing 789", 'Result should be "Testing 789".');

      events
        .get("Test3")
        .asEvent()
        .subscribe((args: string) => (result = args));
      events.get("Test3").dispatch("Testing 42");
      assert.strictEqual(
        result, "Testing 42",
        'Result of dispatch of interface should be "Testing 42".'
      );
    });

    it("SimpleEventHandlingBase", function() {
      class MyTester extends SimpleEventHandlingBase<string> {
        signal(name: string, str: string): void {
          this.events.get(name).dispatch(str);
        }
      }

      var t = new MyTester();
      var result = "";

      t.subscribe("Test1", (args: string) => (result = args));
      t.signal("Test1", "Testing 123");
      assert.strictEqual(result, "Testing 123", 'The result should be "Testing 123".');

      t.signal("Test2", "Testing 456");
      assert.strictEqual(result, "Testing 123", 'The result should still be "Testing 123".');

      t.subscribe("Test2", (args: string) => (result = args));
      t.signal("Test2", "Testing 789");
      assert.strictEqual(result, "Testing 789", 'The result should be "Testing 789".');
    });

    it("Dispatcher", function() {
      class Argument {
        constructor(public name: string) {}
      }

      let dispatcher = new SimpleEventDispatcher<Argument>();

      var a1 = new Argument("a1");
      var a2 = new Argument("a2");

      dispatcher.subscribe((argument: Argument) => {
        assert.strictEqual(argument, a1, "Argument should be a1.");
        assert.notStrictEqual(argument, a2, "Argument should not be a2.");
      });

      dispatcher.dispatch(a1);
    });

    it("Async dispatch", { timeout: 2000 }, function(_context, done) {
      let dispatcher = new SimpleEventDispatcher<number>();

      let i = 0;

      dispatcher.subscribe(a => {
        i = a;
        assert.strictEqual(i, 1, "i should be 1.");
        done();
      });

      dispatcher.dispatchAsync(1);
      assert.strictEqual(i, 0, "Because of async dispatch, i should be 0.");
    });

    it("Unsubscribe event handler after dispatching 2 times.", function() {
      let dispatcher = new SimpleEventDispatcher<number>();

      let i = 0;

      let unsub = dispatcher.subscribe(a => {
        i += a;
        if (i == 3) {
          unsub();
        }
      });

      dispatcher.dispatch(1);
      dispatcher.dispatch(2);
      dispatcher.dispatch(4);

      assert.strictEqual(i, 3, "Because of unsubscribing, i should be 3.");
    });
  });

  describe("Signal", function() {
    it("Subscribe / unsubscribe - signal as property", function() {
      class MyEventTester {
        private _myEvent = new SignalDispatcher();

        get myEvent() {
          return this._myEvent.asEvent();
        }

        signal(): void {
          this._myEvent.dispatch();
        }
      }

      let s = new MyEventTester();
      let i = 0;

      var handler = function() {
        i++;
      };

      s.myEvent.subscribe(handler);
      s.signal();
      assert.strictEqual(i, 1, "i should be 1.");

      s.myEvent.unsubscribe(handler);
      s.signal();
      assert.strictEqual(i, 1, "i should still be 1 because of unsubscribe.");
    });

    it("Subscribe / unsubscribe - signal on interface", function() {
      interface IMyEventTester {
        myEvent(): ISignal;

        signal(): void;
      }

      class MyEventTester implements IMyEventTester {
        private _myEvent = new SignalDispatcher();

        myEvent() {
          return this._myEvent.asEvent();
        }

        signal(): void {
          this._myEvent.dispatch();
        }
      }

      let s: IMyEventTester = new MyEventTester();
      let i = 0;

      var handler = function() {
        i++;
      };

      s.myEvent().subscribe(handler);
      s.signal();
      assert.strictEqual(i, 1, "i should be 1.");

      s.myEvent().unsubscribe(handler);
      s.signal();
      assert.strictEqual(i, 1, "i should still be 1 because of unsubscribe.");
    });

    it("Signal list", function() {
      let i = 10;
      let list = new SignalList();

      list.get("one").subscribe(function() {
        i += 20;
      });

      list.get("two").subscribe(function() {
        i += 40;
      });

      list.get("one").dispatch();
      assert.strictEqual(i, 30, "i should be 30.");

      list.get("two").dispatch();
      assert.strictEqual(i, 70, "i should be 70.");

      list.remove("two");
      list.get("two").dispatch();
      assert.strictEqual(
        i, 70,
        "i should still be 70, because event handler two was removed."
      );

      list.get("one").dispatch();
      assert.strictEqual(i, 90, "i should be 90.");
    });

    it("SignalHandlingBase", function() {
      class MyTester extends SignalHandlingBase {
        signal(name: string): void {
          this.events.get(name).dispatch();
        }
      }

      let t = new MyTester();
      let result = "";

      t.subscribe("Test1", () => (result = "Testing 123"));
      t.signal("Test1");
      assert.strictEqual(result, "Testing 123", 'The result should be "Testing 123".');

      t.signal("Test2");
      assert.strictEqual(result, "Testing 123", 'The result should still be "Testing 123".');

      t.subscribe("Test2", () => (result = "Testing 789"));
      t.signal("Test2");
      assert.strictEqual(result, "Testing 789", 'The result should be "Testing 789".');
    });

    it("Async dispatch", { timeout: 2000 }, function(_context, done) {
      let dispatcher = new SignalDispatcher();

      let i = 0;

      dispatcher.subscribe(function() {
        i = 1;
        assert.strictEqual(i, 1, "i should be 1.");
        done();
      });

      dispatcher.dispatchAsync();
      assert.strictEqual(i, 0, "Because of async dispatch, i should be 0.");
    });

    it("Unsubscribe event handler after dispatching 2 times.", function() {
      let dispatcher = new SignalDispatcher();

      let i = 0;

      let unsub = dispatcher.subscribe(() => {
        i++;
        if (i == 2) {
          unsub();
        }
      });

      dispatcher.dispatch();
      dispatcher.dispatch();
      dispatcher.dispatch();

      assert.strictEqual(i, 2, "Because of unsubscribing, i should be 2.");
    });
  });

  describe("One", function() {
    it("Execute one on an event dispatcher", function() {
      var i = 0;
      var dispatcher = new EventDispatcher<any, number>();
      dispatcher.one((sender, args) => {
        i += args;
      });

      dispatcher.dispatch(null, 1);
      assert.strictEqual(i, 1, "i should be 1.");

      dispatcher.dispatch(null, 1);
      assert.strictEqual(
        i, 1,
        "i should still be 1, because the event should only fire once."
      );
    });

    it("Execute 2x one on an event dispatcher", function() {
      var i = 0;
      var dispatcher = new EventDispatcher<any, number>();
      dispatcher.one((sender, args) => {
        i += args;
      });
      dispatcher.one((sender, args) => {
        i += args;
      });

      dispatcher.dispatch(null, 1);
      assert.strictEqual(i, 2, "i should be 2.");

      dispatcher.dispatch(null, 1);
      assert.strictEqual(
        i, 2,
        "i should still be 2, because the event should only fire once."
      );
    });

    it("Unsubscribe one on an event dispatcher", function() {
      var i = 0;
      var dispatcher = new EventDispatcher<any, number>();
      let fn = (sender: any, args: number) => {
        i += args;
      };

      dispatcher.one(fn);
      dispatcher.unsubscribe(fn);
      dispatcher.dispatch(null, 1);

      assert.strictEqual(i, 0, "i should be 0.");
    });

    it("Register", function() {
      var i = 0;
      var dispatcher = new EventDispatcher<any, number>();
      let fn = (sender: any, args: number) => {
        i += args;
      };

      dispatcher.one(fn);
      dispatcher.one(fn);
      dispatcher.unsubscribe(fn);
      dispatcher.dispatch(null, 1);

      assert.strictEqual(i, 1, "i should be 1.");
    });
  });
});
