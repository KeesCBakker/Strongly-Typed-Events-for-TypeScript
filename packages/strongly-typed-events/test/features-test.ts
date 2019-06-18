import { SignalDispatcher } from "../src";
import { expect } from "chai";

describe("Features", () => {
    describe("Count", () => {

        /** Subscriptions should be countable */

        it("Count subscription sub/unsub", () => {

            let dispatcher = new SignalDispatcher();
            let fn1 = () => { };
            let fn2 = () => { };

            expect(dispatcher.count, "Count should be 0").to.equal(0);
            dispatcher.sub(fn1);
            expect(dispatcher.count, "Count should be 1").to.equal(1);
            dispatcher.sub(fn2);
            expect(dispatcher.count, "Count should be 2").to.equal(2);
            dispatcher.unsub(fn1);
            expect(dispatcher.count, "Count should be 1").to.equal(1);
            dispatcher.unsub(fn2);
            expect(dispatcher.count, "Count should be 0").to.equal(0);
        });

        it("Count on event", ()=>{

            let dispatcher = new SignalDispatcher();
            let ev = dispatcher.asEvent();
            let fn1 = () => { };
            let fn2 = () => { };

            expect(ev.count, "Count should be 0").to.equal(0);
            dispatcher.sub(fn1);
            expect(ev.count, "Count should be 1").to.equal(1);
            dispatcher.sub(fn2);
            expect(ev.count, "Count should be 2").to.equal(2);
            dispatcher.unsub(fn1);
            expect(ev.count, "Count should be 1").to.equal(1);
            dispatcher.unsub(fn2);
            expect(ev.count, "Count should be 0").to.equal(0);

        });

        it("Count on one", ()=>{

            let dispatcher = new SignalDispatcher();
            let fn1 = () => { };

            expect(dispatcher.count, "Count should be 0").to.equal(0);
            dispatcher.one(fn1);
            expect(dispatcher.count, "Count should be 1").to.equal(1);
            dispatcher.dispatch();
            expect(dispatcher.count, "Count should be 0").to.equal(0);
        });
    });
});
