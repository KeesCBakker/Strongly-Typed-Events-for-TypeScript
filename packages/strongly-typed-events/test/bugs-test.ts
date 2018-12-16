import { SimpleEventDispatcher, SignalDispatcher } from "./../src/";
import { expect } from "chai";

describe("Bug fixes", () => {
  it("#9 - unsubscribe during dispatch", () => {
    /** This bug had to do with subscription iteration. When an unsub
     * was done, the next subscription was skipped. This test checks
     * if the next event is not skipped. It also tests if the first
     * subscription isn't called again.
     */

    let dispatcher = new SignalDispatcher();
    let result = 0;

    let fn1 = () => {
      result += 1;
      dispatcher.unsub(fn1);
    };

    let fn2 = () => {
      result += 10;
    };

    dispatcher.sub(fn1);
    dispatcher.sub(fn2);

    dispatcher.dispatch();

    expect(result).to.eq(
      11,
      "Result should be 11, because both subscription should have been triggered."
    );

    dispatcher.dispatch();
    expect(result).to.eq(
      21,
      "Result should be 21, because only the second subscription should have been triggered."
    );
  });
});
