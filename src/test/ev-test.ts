import { SignalDispatcher } from "./../";
import { expect } from "chai";

describe("EV tests", () => {
    it("unsub through ev", () => {

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

        expect(result).to.eq(
            2,
            "Result should be 2, becuase after the 2nd dispatch an unsub was done."
        );
    });
});
