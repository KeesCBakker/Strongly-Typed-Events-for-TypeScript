import { SignalDispatcher } from "./../";
import { expect } from "chai";

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
      expect(dispatcher.has(fn2)).to.eq(false, "fn2 should not be present.");
    };
    dispatcher.sub(fn3);

    expect(dispatcher.has(fn1)).to.eq(true, "fn1 should be present.");
    expect(dispatcher.has(fn2)).to.eq(true, "fn2 should be present.");
    expect(dispatcher.has(fn3)).to.eq(true, "fn3 should be present.");

    dispatcher.dispatch();

    expect(dispatcher.has(fn1)).to.eq(true, "fn1 should still be present.");
    expect(dispatcher.has(fn2)).to.eq(false, "fn2 should not be present.");
    expect(dispatcher.has(fn3)).to.eq(true, "fn3 should still be present.");
  });
});
