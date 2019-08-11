import { SignalDispatcher, SimpleEventList, NonUniformSimpleEventList , ISimpleEvent } from "../src";
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

            type FileHandlesArgMap = {
                "rename": string,
                "openHandlesChange": number
            };

            class FileHandles
            {
                private _myEvents = new NonUniformSimpleEventList<FileHandlesArgMap>();
                private _openHandles = 0;
                private _name: string;
                
                constructor(name: string){
                    this._name = name;
                }

                rename(newName: string){
                    this._name = newName;
                    this._myEvents.get("rename").dispatch(this._name);
                }

                open(){
                    this._openHandles++;
                    this._myEvents.get("openHandlesChange").dispatch(this._openHandles);
                }

                close(){
                    this._openHandles--;
                    this._myEvents.get("openHandlesChange").dispatch(this._openHandles);
                }
                
                public get onRename(): ISimpleEvent<string>
                {
                    return this._myEvents.get("rename").asEvent();
                }

                public get onOpenHandlesChange(): ISimpleEvent<number>
                {
                    return this._myEvents.get("openHandlesChange").asEvent();
                }
            }

            var file = new FileHandles("kaas.jpg");
            var name = "kaas.jpg"

            file.onRename.sub((x:string) => name = x);
            file.rename("kees.jpg");
            expect(name).to.equal("kees.jpg");

            var openHandles = 0;
            file.onOpenHandlesChange.sub((x:number) => openHandles = x);
            file.open();
            expect(openHandles).to.equal(1);
            file.open();
            expect(openHandles).to.equal(2);
            file.close();
            expect(openHandles).to.equal(1);
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
