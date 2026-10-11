import { SignalList } from "strongly-typed-events";
import { describe, it } from "node:test";
import * as assert from "node:assert/strict";

describe("EventList", () => {
  it("Testing add and remove.", () => {
    //Implemented in the base of the dispatcher.
    let eventList = new SignalList();

    let i = 0;
    let fn1 = () => {
      i++;
    };

    assert.strictEqual(i, 0, "Nothing should have been changed at this point.");

    eventList.get("myEvent").sub(fn1);
    eventList.get("myEvent").dispatch();

    assert.strictEqual(i, 1, "i should have been bumped to 1.");

    eventList.remove("myEvent");
    eventList.get("myEvent").dispatch();

    assert.strictEqual(i, 1, "i should still be 1.");
  });
});
