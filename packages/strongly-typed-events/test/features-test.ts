import { SignalDispatcher, SimpleEventList, NonUniformSimpleEventList , ISimpleEvent } from "strongly-typed-events";
import { describe, it } from "node:test";
import * as assert from "node:assert/strict";

describe("Features", () => {


    describe("Non-uniform arguments", ()=>{

        it("Simple event with non-uniform argument", ()=>{

            let myEvents = new SimpleEventList<number|string>();

            let test: number | string | null = null

            myEvents.get('alpha').subscribe(args =>{
                test = args;
            });

            myEvents.get('alpha').dispatch(0);
            assert.strictEqual(test, 0);
            myEvents.get('alpha').dispatch("1");
            assert.strictEqual(test, "1");

        });

        it("Non-uniform arguments as events of a class", ()=>{

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
            assert.strictEqual(name, "kees.jpg");

            var openHandles = 0;
            file.onOpenHandlesChange.sub((x:number) => openHandles = x);
            file.open();
            assert.strictEqual(openHandles, 1);
            file.open();
            assert.strictEqual(openHandles, 2);
            file.close();
            assert.strictEqual(openHandles, 1);
        });
    });

    describe("Count", () => {

        /** Subscriptions should be countable */

        it("Count subscription sub/unsub", () => {

            let dispatcher = new SignalDispatcher();
            let fn1 = () => { };
            let fn2 = () => { };

            assert.strictEqual(dispatcher.count, 0, "Count should be 0");
            dispatcher.sub(fn1);
            assert.strictEqual(dispatcher.count, 1, "Count should be 1");
            dispatcher.sub(fn2);
            assert.strictEqual(dispatcher.count, 2, "Count should be 2");
            dispatcher.unsub(fn1);
            assert.strictEqual(dispatcher.count, 1, "Count should be 1");
            dispatcher.unsub(fn2);
            assert.strictEqual(dispatcher.count, 0, "Count should be 0");
        });

        it("Count on event", ()=>{

            let dispatcher = new SignalDispatcher();
            let ev = dispatcher.asEvent();
            let fn1 = () => { };
            let fn2 = () => { };

            assert.strictEqual(ev.count, 0, "Count should be 0");
            dispatcher.sub(fn1);
            assert.strictEqual(ev.count, 1, "Count should be 1");
            dispatcher.sub(fn2);
            assert.strictEqual(ev.count, 2, "Count should be 2");
            dispatcher.unsub(fn1);
            assert.strictEqual(ev.count, 1, "Count should be 1");
            dispatcher.unsub(fn2);
            assert.strictEqual(ev.count, 0, "Count should be 0");

        });

        it("Count on one", ()=>{

            let dispatcher = new SignalDispatcher();
            let fn1 = () => { };

            assert.strictEqual(dispatcher.count, 0, "Count should be 0");
            dispatcher.one(fn1);
            assert.strictEqual(dispatcher.count, 1, "Count should be 1");
            dispatcher.dispatch();
            assert.strictEqual(dispatcher.count, 0, "Count should be 0");
        });
    });
});
