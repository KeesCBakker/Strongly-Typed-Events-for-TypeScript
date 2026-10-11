import { SignalDispatcher } from "strongly-typed-events";
import { describe, it } from "node:test";
import * as assert from "node:assert/strict";

describe("Dispatching", () => {
  it("Garbage collection for 'one' events.", () => {
    //Implemented in the base of the dispatcher.
    let dispatcher = new SignalDispatcher();

    //should aways be present
    let fn1 = () => {};
    dispatcher.sub(fn1);

    //should be gone after execution
    let fn2 = () => {};
    dispatcher.one(fn2);

    //should never "see" fn2 - because it should be gone before
    //it is ever executed
    let fn3 = () => {
      assert.strictEqual(dispatcher.has(fn2), false, "fn2 should not be present.");
    };
    dispatcher.sub(fn3);

    assert.strictEqual(dispatcher.has(fn1), true, "fn1 should be present.");
    assert.strictEqual(dispatcher.has(fn2), true, "fn2 should be present.");
    assert.strictEqual(dispatcher.has(fn3), true, "fn3 should be present.");

    dispatcher.dispatch();

    assert.strictEqual(dispatcher.has(fn1), true, "fn1 should still be present.");
    assert.strictEqual(dispatcher.has(fn2), false, "fn2 should not be present.");
    assert.strictEqual(dispatcher.has(fn3), true, "fn3 should still be present.");
  });

  it("Unsub through ev", () => {
    let dispatcher = new SignalDispatcher();
    let result = 0;

    dispatcher.sub(ev => {
      result++;
      if (result === 2) {
        ev.unsub();
      }
    });

    dispatcher.dispatch();
    dispatcher.dispatch();
    dispatcher.dispatch();
    dispatcher.dispatch();

    assert.strictEqual(result,
      2,
      "Result should be 2, because after the 2nd dispatch an unsub was done."
    );
  });

  it("stopPropagation through ev", () => {
    let dispatcher = new SignalDispatcher();

    let a = 0;
    dispatcher.sub(ev => {
      a++;
      if (a > 2) {
        ev.stopPropagation();
      }
    });

    let b = 0;
    dispatcher.sub(() => {
      b++;
    });

    dispatcher.dispatch();
    dispatcher.dispatch();
    dispatcher.dispatch();
    dispatcher.dispatch();

    assert.strictEqual(a, 4, "A should be 4, because 4 dispatches are done.");

    assert.strictEqual(b,
      2,
      "B should be 2, because everything after the 2nd dispatch is cancelled."
    );
  });
});
