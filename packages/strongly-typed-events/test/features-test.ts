import { ISimpleEvent } from './../../ste-simple-events/dist/definitions.d';
import { SimpleEventList, NonUniformSimpleEventList } from './../../ste-simple-events/src/simple-events';
import { SignalDispatcher } from "../src";
import { expect } from "chai";

describe("Features", () => {


    describe("Non-uniform arguments", ()=>{

        it.only("Simple event with non-uniform argument", ()=>{

            let myEvents = new SimpleEventList<number|string>();

            let test = null

            myEvents.get('alpha').subscribe(args =>{
                test = args;
            });

            myEvents.get('alpha').dispatch(0);
            expect(test).to.equal(0);
            myEvents.get('alpha').dispatch("1");
            expect(test).to.equal("1");

        });

        it.only("Non-uniform arguments as events of a class", ()=>{

            type ArgMap = {
                "eventOne": number,
                "eventTwo": string
            };

            class MyClass
            {
                private _myEvents = new NonUniformSimpleEventList<ArgMap>();

                public triggerOne(nr:number){
                    this._myEvents.get('eventOne').dispatch(nr);
                }

                public triggerTwo(str: string){
                    this._myEvents.get('eventTwo').dispatch(str);
                }

                public get onOne(): ISimpleEvent<number>
                {
                    return this._myEvents.get("eventOne").asEvent();
                }

                public get onTwo(): ISimpleEvent<string>
                {
                    return this._myEvents.get("eventTwo").asEvent();
                }
            }

            var obj = new MyClass
            var resultOne = 0;
            var resultTwo = "";
            obj.onOne.sub(x => resultOne = x);
            obj.onTwo.sub(x => resultTwo = x);

            obj.triggerOne(1337);
            obj.triggerTwo("Hello");

            expect(resultOne).to.eql(1337);
            expect(resultTwo).to.eq("Hello");
        });
    });

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
