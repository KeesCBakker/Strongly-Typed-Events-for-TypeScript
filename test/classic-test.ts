/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
/// <reference path="../strongly-typed-events.ts" />

'use strict'

var r = typeof require !== 'undefined';
var expect: Chai.ExpectStatic = r ? require('chai').expect : (window as any).chai.expect;
var _e: IStronglyTypedEvents = r ? require('../strongly-typed-events') : window;

describe("Strongly Typed Events", function () {

    describe("Event", function () {

        it("Subscribe / unsubscribe - event as property", function () {

            class MyEventTester {
                private _myEvent = _e.createEventDispatcher<MyEventTester, string>();

                get myEvent(): IEvent<MyEventTester, string> {
                    return this._myEvent.asEvent();
                }

                signal(str: string): void {
                    this._myEvent.dispatch(this, str);
                }
            }

            let tester = new MyEventTester();
            let eventHandlerResult: string = null;

            let handler = (sender: MyEventTester, args: string) => {
                eventHandlerResult = args;
            };

            tester.myEvent.subscribe(handler);
            tester.signal('Test1');
            expect(eventHandlerResult, 'The eventHandlerResult should be "Test1".').to.equal('Test1');

            tester.signal('Test2');
            expect(eventHandlerResult, 'The eventHandlerResult should be "Test2".').to.equal('Test2');
            tester.myEvent.unsubscribe(handler);
            tester.signal('Test3');

            expect(eventHandlerResult, 'The eventHandlerResult should still be "Test2".').to.equal('Test2');
        });

        it("Subscribe / unsubscribe - event on interface", function () {

            interface IMyEventTester {
                myEvent(): IEvent<IMyEventTester, string>;

                signal(str: string): void;
            }

            class MyEventTester implements IMyEventTester {
                private _myEvent: EventDispatcher<IMyEventTester, string> = _e.createEventDispatcher<IMyEventTester, string>();

                myEvent(): IEvent<IMyEventTester, string> {
                    return this._myEvent.asEvent();
                }

                signal(str: string): void {
                    this._myEvent.dispatch(this, str);
                }
            }

            let tester: IMyEventTester = new MyEventTester();
            let eventHandlerResult: string = null;

            let handler = (sender: IMyEventTester, args: string) => {
                eventHandlerResult = args;
            };

            tester.myEvent().subscribe(handler);
            tester.signal('Test1');
            expect(eventHandlerResult, 'The eventHandlerResult should be "Test1".').to.equal('Test1');

            tester.myEvent().unsubscribe(handler);
            tester.signal('Test2');
            expect(eventHandlerResult, 'The eventHandlerResult should still be "Test1".').to.equal('Test1');
        });

        it("Event list", function () {

            var events = _e.createEventList<any, string>();
            var result: string;

            events.get('Test1').subscribe((sender: any, args: string) => result = args);
            events.get('Test1').dispatch(this, 'Testing 123');
            expect(result, 'The result should be "Testing 123".').to.equal('Testing 123');

            events.get('Test2').dispatch(this, 'Testing 456');
            expect(result, 'The result should still be "Testing 123".').to.equal('Testing 123');

            events.get('Test2').subscribe((sender: any, args: string) => result = args);
            events.get('Test2').dispatch(this, 'Testing 789');
            expect(result, 'The result should be "Testing 789".').to.equal('Testing 789');

            events.get('Test3').asEvent().subscribe((sender: any, args: string) => result = args);
            events.get('Test3').dispatch(this, 'Testing 42');
            expect(result, 'The result should be "Testing 42".').to.equal('Testing 42');
        });

        it('EventHandlingBase', function () {

            class MyTester extends _e.EventHandlingBase<MyTester, string> {

                signal(name: string, str: string): void {
                    this.events.get(name).dispatch(this, str);
                }
            }

            var t = new MyTester();
            var result: string;

            t.subscribe('Test1', (sender: MyTester, args: string) => result = args);
            t.signal('Test1', 'Testing 123');
            expect(result, 'The result should be "Testing 123".').to.equal('Testing 123');

            t.signal('Test2', 'Testing 456');
            expect(result, 'The result should still be "Testing 123".').to.equal('Testing 123');

            t.subscribe('Test2', (sender: MyTester, args: string) => result = args);
            t.signal('Test2', 'Testing 789');
            expect(result, 'The result should be "Testing 789".').to.equal('Testing 789');
        });

        it('Dispatcher', function () {

            class Source { constructor(public name: string) { } }
            class Argument { constructor(public name: string) { } }

            let dispatcher = _e.createEventDispatcher<Source, Argument>();

            var s1 = new Source('s1');
            var s2 = new Source('s2');
            var a1 = new Argument('a1');
            var a2 = new Argument('a2');

            dispatcher.subscribe((sender: Source, argument: Argument) => {

                expect(sender, "Sender should be s1.").to.equal(s1);
                expect(sender, "Sender should not be s2.").not.equal(s2);

                expect(argument, "Argument should be a1.").to.equal(a1);
                expect(argument, "Argument should not be a2.").not.equal(a2);
            });

            dispatcher.dispatch(s1, a1);
        });

        it('Async dispatch', function (done) {

            let dispatcher = _e.createEventDispatcher<any, number>();

            let i = 0;

            dispatcher.subscribe((s, a) => {
                i = a;
                expect(i, 'i should be 1.').to.equal(1);
                done();
            });

            dispatcher.dispatchAsync(null, 1);
            expect(i, 'Because of async dispatch, i should be 0.').to.equal(0);
        });
    });

    describe("Simple Event", function () {

        it("Subscribe / unsubscribe - simple event as property", function () {

            class MyEventTester {
                private _myEvent = _e.createSimpleEventDispatcher<string>();

                get myEvent() {
                    return this._myEvent.asEvent();
                }

                signal(str: string): void {
                    this._myEvent.dispatch(str);
                }
            }

            let s = new MyEventTester();
            let result: string = null;

            var handler = (args: string) => {
                result = args;
            };

            s.myEvent.subscribe(handler);
            s.signal('Test1');
            expect(result, 'Result should be "Test1".').to.equal('Test1');

            s.myEvent.unsubscribe(handler);
            s.signal('Test2');
            expect(result, 'Result should still be "Test1" because of unsubscribe.').to.equal('Test1');
        });

        it("Subscribe / unsubscribe - simple event on interface", function () {

            interface IMyEventTester {
                myEvent(): ISimpleEvent<string>;

                signal(str: string);
            }

            class MyEventTester implements IMyEventTester {
                private _myEvent = _e.createSimpleEventDispatcher<string>();

                myEvent() {
                    return this._myEvent.asEvent();
                }

                signal(str: string): void {
                    this._myEvent.dispatch(str);
                }
            }

            let s: IMyEventTester = new MyEventTester();
            let result: string = null;

            var handler = (args: string) => {
                result = args;
            };

            s.myEvent().subscribe(handler);
            s.signal('Test1');
            expect(result, 'Result should be "Test1".').to.equal('Test1');

            s.myEvent().unsubscribe(handler);
            s.signal('Test2');
            expect(result, 'Result should still be "Test1" because of unsubscribe.').to.equal('Test1');
        });

        it("Simple Event list", function () {

            var events = _e.createSimpleEventList<string>();
            var result: string;

            events.get('Test1').subscribe((args: string) => result = args);
            events.get('Test1').dispatch('Testing 123');
            expect(result, 'Result should be "Testing 123".').to.equal('Testing 123');

            events.get('Test2').dispatch('Testing 456');
            expect(result, 'Result should still be "Testing 123".').to.equal('Testing 123');

            events.get('Test2').subscribe((args: string) => result = args);
            events.get('Test2').dispatch('Testing 789');
            expect(result, 'Result should be "Testing 789".').to.equal('Testing 789');

            events.get('Test3').asEvent().subscribe((args: string) => result = args);
            events.get('Test3').dispatch('Testing 42');
            expect(result, 'Result of dispatch of interface should be "Testing 42".').to.equal('Testing 42');
        });

        it('SimpleEventHandlingBase', function () {

            class MyTester extends _e.SimpleEventHandlingBase<string> {

                signal(name: string, str: string): void {
                    this.events.get(name).dispatch(str);
                }
            }

            var t = new MyTester();
            var result: string;

            t.subscribe('Test1', (args: string) => result = args);
            t.signal('Test1', 'Testing 123');
            expect(result, 'The result should be "Testing 123".').to.equal('Testing 123');

            t.signal('Test2', 'Testing 456');
            expect(result, 'The result should still be "Testing 123".').to.equal('Testing 123');

            t.subscribe('Test2', (args: string) => result = args);
            t.signal('Test2', 'Testing 789');
            expect(result, 'The result should be "Testing 789".').to.equal('Testing 789');
        });

        it('Dispatcher', function () {

            class Argument { constructor(public name: string) { } }

            let dispatcher = _e.createSimpleEventDispatcher<Argument>();

            var a1 = new Argument('a1');
            var a2 = new Argument('a2');

            dispatcher.subscribe((argument: Argument) => {
                expect(argument, "Argument should be a1.").to.equal(a1);
                expect(argument, "Argument should not be a2.").not.equal(a2);
            });

            dispatcher.dispatch(a1);
        });

        it('Async dispatch', function (done) {

            let dispatcher = new SimpleEventDispatcher<number>();

            let i = 0;

            dispatcher.subscribe((a) => {
                i = a;
                expect(i, 'i should be 1.').to.equal(1);
                done();
            });

            dispatcher.dispatchAsync(1);
            expect(i, 'Because of async dispatch, i should be 0.').to.equal(0);
        });
    });


    describe('Signal', function () {

        it("Subscribe / unsubscribe - signal as property", function () {

            class MyEventTester {
                private _myEvent = _e.createSignalDispatcher();

                get myEvent() {
                    return this._myEvent.asEvent();
                }

                signal(): void {
                    this._myEvent.dispatch();
                }
            }

            let s = new MyEventTester();
            let i = 0;

            var handler = function () {
                i++;
            };

            s.myEvent.subscribe(handler);
            s.signal();
            expect(i, 'i should be 1.').to.equal(1);

            s.myEvent.unsubscribe(handler);
            s.signal();
            expect(i, 'i should still be 1 because of unsubscribe.').to.equal(1);
        });

        it("Subscribe / unsubscribe - signal on interface", function () {

            interface IMyEventTester {
                myEvent(): ISignal;

                signal();
            }

            class MyEventTester implements IMyEventTester {
                private _myEvent = new SignalDispatcher();

                myEvent() {
                    return this._myEvent.asEvent();
                }

                signal(): void {
                    this._myEvent.dispatch();
                }
            }

            let s: IMyEventTester = new MyEventTester();
            let i = 0;

            var handler = function () {
                i++;
            };

            s.myEvent().subscribe(handler);
            s.signal();
            expect(i, 'i should be 1.').to.equal(1);

            s.myEvent().unsubscribe(handler);
            s.signal();
            expect(i, 'i should still be 1 because of unsubscribe.').to.equal(1);
        });

        it("Signal list", function () {

            let i = 10;
            let list = _e.createSignalList();

            list.get("one").subscribe(function () {
                i += 20;
            });

            list.get("two").subscribe(function () {
                i += 40;
            });

            list.get("one").dispatch();
            expect(i, 'i should be 30.').to.equal(30);

            list.get('two').dispatch();
            expect(i, 'i should be 70.').to.equal(70);

            list.remove('two');
            list.get('two').dispatch();
            expect(i, 'i should still be 70, because event handler two was removed.').to.equal(70);

            list.get("one").dispatch();
            expect(i, 'i should be 90.').to.equal(90);
        });

        it('SignalHandlingBase', function () {

            class MyTester extends _e.SignalHandlingBase {

                signal(name: string): void {
                    this.events.get(name).dispatch();
                }
            }

            let t = new MyTester();
            let result = '';

            t.subscribe('Test1', () => result = 'Testing 123');
            t.signal('Test1');
            expect(result, 'The result should be "Testing 123".').to.equal('Testing 123');

            t.signal('Test2');
            expect(result, 'The result should still be "Testing 123".').to.equal('Testing 123');

            t.subscribe('Test2', () => result = 'Testing 789');
            t.signal('Test2');
            expect(result, 'The result should be "Testing 789".').to.equal('Testing 789');
        });

        it('Async dispatch', function (done) {

            let dispatcher = _e.createSignalDispatcher();

            let i = 0;

            dispatcher.subscribe(function () {
                i = 1;
                expect(i, 'i should be 1.').to.equal(1);
                done();
            });

            dispatcher.dispatchAsync();
            expect(i, 'Because of async dispatch, i should be 0.').to.equal(0);
        });
    });

    describe("One", function () {

        it("Execute one on an event dispatcher", function () {

            var i = 0;
            var dispatcher = _e.createEventDispatcher<any, number>();
            dispatcher.one((sender, args) => {
                i += args;
            });

            dispatcher.dispatch(null, 1);
            expect(i, 'i should be 1.').to.equal(1);

            dispatcher.dispatch(null, 1);
            expect(i, 'i should still be 1, because the event should only fire once.').to.equal(1);
        });

        it("Execute 2x one on an event dispatcher", function () {

            var i = 0;
            var dispatcher = _e.createEventDispatcher<any, number>();
            dispatcher.one((sender, args) => {
                i += args;
            });
            dispatcher.one((sender, args) => {
                i += args;
            });

            dispatcher.dispatch(null, 1);
            expect(i, 'i should be 2.').to.equal(2);

            dispatcher.dispatch(null, 1);
            expect(i, 'i should still be 2, because the event should only fire once.').to.equal(2);
        });

        it("Unsubscribe one on an event dispatcher", function () {

            var i = 0;
            var dispatcher = _e.createEventDispatcher<any, number>();
            let fn = (sender, args) => {
                i += args;
            };

            dispatcher.one(fn);
            dispatcher.unsubscribe(fn);
            dispatcher.dispatch(null, 1);

            expect(i, 'i should be 0.').to.equal(0);
        });

        it("Register", function () {


            var i = 0;
            var dispatcher = _e.createEventDispatcher<any, number>();
            let fn = (sender, args) => {
                i += args;
            };

            dispatcher.one(fn);
            dispatcher.one(fn);
            dispatcher.unsubscribe(fn);
            dispatcher.dispatch(null, 1);

            expect(i, 'i should be 1.').to.equal(1);

        });
    });
});