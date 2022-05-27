import { SignalList } from "./../src/";
import { expect } from "chai";

describe("EventList", () => {
  it("Testing add and remove.", () => {
    //Implemented in the base of the dispatcher.
    let eventList = new SignalList();

    let i = 0;
    let fn1 = () => {
      i++;
    };

    expect(i).to.eq(0, "Nothing should have been changed at this point.");

    eventList.get("myEvent").sub(fn1);
    eventList.get("myEvent").dispatch();

    expect(i).to.eq(i, "i should have been bumped to 1.");

    eventList.remove("myEvent");
    eventList.get("myEvent").dispatch();

    expect(i).to.eq(i, "i should still be 1.");
  });
});
