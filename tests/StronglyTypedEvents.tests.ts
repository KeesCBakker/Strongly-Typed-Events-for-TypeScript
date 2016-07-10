/// <reference path="../typings/qunit.d.ts" />
/// <reference path="../typings/stronglytypedevents.d.ts" />
/// <reference path="../stronglytypedevents.ts" />

QUnit.module('Event', function () {

    QUnit.test("Subscribe / unsubscribe - event as property", (assert) => {

        assert.expect(2);

        class MyEventTester {
            private _myEvent: EventDispatcher<MyEventTester, string> = new EventDispatcher<MyEventTester, string>();

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
        assert.equal(eventHandlerResult, 'Test1', 'The eventHandlerResult should be "Test1".');

        tester.myEvent.unsubscribe(handler);
        tester.signal('Test2');
        assert.equal(eventHandlerResult, 'Test1', 'The eventHandlerResult should still be "Test1".');
    });

    QUnit.test("Subscribe / unsubscribe - event on interface", (assert) => {

        assert.expect(2);

        interface IMyEventTester {
            myEvent(): IEvent<IMyEventTester, string>;

            signal(str: string): void;
        }

        class MyEventTester implements IMyEventTester {
            private _myEvent: EventDispatcher<IMyEventTester, string> = new EventDispatcher<IMyEventTester, string>();

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
        assert.equal(eventHandlerResult, 'Test1', 'The eventHandlerResult should be "Test1".');

        tester.myEvent().unsubscribe(handler);
        tester.signal('Test2');
        assert.equal(eventHandlerResult, 'Test1', 'The eventHandlerResult should still be "Test1".');
    });

    QUnit.test("Event list", (assert) => {

        assert.expect(4);

        var events = new EventList<any, string>();
        var result: string;

        events.get('Test1').subscribe((sender: any, args: string) => result = args);
        events.get('Test1').dispatch(this, 'Testing 123');
        assert.equal(result, 'Testing 123', 'The result should be "Testing 123".');

        events.get('Test2').dispatch(this, 'Testing 456');
        assert.equal(result, 'Testing 123', 'The result should still be "Testing 123".');

        events.get('Test2').subscribe((sender: any, args: string) => result = args);
        events.get('Test2').dispatch(this, 'Testing 789');
        assert.equal(result, 'Testing 789', 'The result should be "Testing 789".');

        events.get('Test3').asEvent().subscribe((sender: any, args: string) => result = args);
        events.get('Test3').dispatch(this, 'Testing 42');
        assert.equal(result, 'Testing 42', 'The result should be "Testing 42".');
    });

    QUnit.test('EventHandlingBase', (assert) => {

        assert.expect(3);

        class MyTester extends EventHandlingBase<MyTester, string> {

            signal(name: string, str: string): void {
                this.events.get(name).dispatch(this, str);
            }
        }

        var t = new MyTester();
        var result: string;

        t.subscribe('Test1', (sender: MyTester, args: string) => result = args);
        t.signal('Test1', 'Testing 123');
        assert.equal(result, 'Testing 123', 'The result should be "Testing 123".');

        t.signal('Test2', 'Testing 456');
        assert.equal(result, 'Testing 123', 'The result should still be "Testing 123".');

        t.subscribe('Test2', (sender: MyTester, args: string) => result = args);
        t.signal('Test2', 'Testing 789');
        assert.equal(result, 'Testing 789', 'The result should be "Testing 789".');
    });

    QUnit.test('Dispatcher', (assert) => {

        assert.expect(4);

        class Source { constructor(public name: string) { } }
        class Argument { constructor(public name: string) { } }

        let dispatcher = new EventDispatcher<Source, Argument>();

        var s1 = new Source('s1');
        var s2 = new Source('s2');
        var a1 = new Argument('a1');
        var a2 = new Argument('a2');

        dispatcher.subscribe((sender: Source, argument: Argument) => {
            assert.deepEqual(sender, s1, "Sender should be s1.");
            assert.notDeepEqual(sender, s2, "Sender should not be s2.");

            assert.deepEqual(argument, a1, 'Argument should be a1.');
            assert.notDeepEqual(argument, a2, 'Argument should not be a2.');
        });

        dispatcher.dispatch(s1, a1);
    });

    QUnit.test('Async dispatch', (assert) => {

        assert.expect(2);

        let done = assert.async();
        let dispatcher = new EventDispatcher<any, number>();

        let i = 0;

        dispatcher.subscribe((s, a) => {
            i = a;
            assert.equal(i, 1, 'i should be 1.');
            done();
        });

        dispatcher.dispatchAsync(null, 1);
        assert.equal(i, 0, 'Because of async dispatch, i should be 0.');
    });
});

QUnit.module('Simple event', function () {

    QUnit.test("Subscribe / unsubscribe - simple event as property", (assert) => {

        assert.expect(2);

        class MyEventTester {
            private _myEvent: SimpleEventDispatcher<string> = new SimpleEventDispatcher<string>();

            get myEvent(): ISimpleEvent<string> {
                return this._myEvent;
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
        assert.equal(result, 'Test1', 'Result should be "Test1".');

        s.myEvent.unsubscribe(handler);
        s.signal('Test2');
        assert.equal(result, 'Test1', 'Result should still be "Test1" because of unsubscribe.');
    });

    QUnit.test("Subscribe / unsubscribe - simple event on interface", (assert) => {

        assert.expect(2);

        interface IMyEventTester {
            myEvent(): ISimpleEvent<string>;

            signal(str: string);
        }

        class MyEventTester implements IMyEventTester {
            private _myEvent: SimpleEventDispatcher<string> = new SimpleEventDispatcher<string>();

            myEvent(): ISimpleEvent<string> {
                return this._myEvent;
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
        assert.equal(result, 'Test1', 'Result should be "Test1".');

        s.myEvent().unsubscribe(handler);
        s.signal('Test2');
        assert.equal(result, 'Test1', 'Result should still be "Test1" because of unsubscribe.');
    });

    QUnit.test("Simple event list", (assert) => {

        assert.expect(4);

        var events = new SimpleEventList<string>();
        var result: string;

        events.get('Test1').subscribe((args) => result = args);
        events.get('Test1').dispatch('Testing 123');
        assert.equal(result, 'Testing 123', 'Result should be "Testing 123".');

        events.get('Test2').dispatch('Testing 456');
        assert.equal(result, 'Testing 123', 'Result should still be "Testing 123", because of the unsubscribe.');

        events.get('Test2').subscribe((args) => result = args);
        events.get('Test2').dispatch('Testing 789');
        assert.equal(result, 'Testing 789', 'Result should be "Testing 789".');

        events.get('Test3').asEvent().subscribe((args) => result = args);
        events.get('Test3').dispatch('Testing 42');
        assert.equal(result, 'Testing 42', 'Result of dispatch of interface should be "Testing 42".');
    });

    QUnit.test('SimpleEventHandlingBase', (assert) => {

        assert.expect(3);

        class MyTester extends SimpleEventHandlingBase<string> {

            signal(name: string, str: string): void {
                this.events.get(name).dispatch(str);
            }
        }

        var t = new MyTester();
        var result: string;

        t.subscribe('Test1', (args: string) => result = args);
        t.signal('Test1', 'Testing 123');
        assert.equal(result, 'Testing 123', 'The result should be "Testing 123".');

        t.signal('Test2', 'Testing 456');
        assert.equal(result, 'Testing 123', 'The result should still be "Testing 123".');

        t.subscribe('Test2', (args: string) => result = args);
        t.signal('Test2', 'Testing 789');
        assert.equal(result, 'Testing 789', 'The result should be "Testing 789".');
    });

    QUnit.test('Dispatcher', (assert) => {

        assert.expect(2);

        class Argument { constructor(public name: string) { } }

        let dispatcher = new SimpleEventDispatcher<Argument>();

        var a1 = new Argument('a1');
        var a2 = new Argument('a2');

        dispatcher.subscribe((argument: Argument) => {
            assert.deepEqual(argument, a1, 'Argument should be a1.');
            assert.notDeepEqual(argument, a2, 'Argument should not be a2.');
        });

        dispatcher.dispatch(a1);
    });

    QUnit.test('Async dispatch', (assert) => {

        let done = assert.async();
        let dispatcher = new SimpleEventDispatcher<number>();

        let i = 0;

        dispatcher.subscribe((a) => {
            i = a;
            assert.equal(i, 1, 'i should be 1.');
            done();
        });

        dispatcher.dispatchAsync(1);
        assert.equal(i, 0, 'Because of async dispatch, i should be 0.');
    });
});


QUnit.module('Signal', function () {

    QUnit.test("Subscribe / unsubscribe - signal as property", (assert) => {

        assert.expect(2);

        class MyEventTester {
            private _myEvent = new SignalDispatcher();

            get myEvent(): ISignal {
                return this._myEvent;
            }

            signal(): void {
                this._myEvent.dispatch();
            }
        }

        let s = new MyEventTester();
        let i = 0;

        var handler = () => {
            i++;
        };

        s.myEvent.subscribe(handler);
        s.signal();
        assert.equal(i, 1, 'i should be 1.');

        s.myEvent.unsubscribe(handler);
        s.signal();
        assert.equal(i, 1, 'i should still be 1 because of unsubscribe.');
    });

    QUnit.test("Subscribe / unsubscribe - signal on interface", (assert) => {

        assert.expect(2);

        interface IMyEventTester {
            myEvent(): ISignal;

            signal();
        }

        class MyEventTester implements IMyEventTester {
            private _myEvent = new SignalDispatcher();

            myEvent(): ISignal {
                return this._myEvent;
            }

            signal(): void {
                this._myEvent.dispatch();
            }
        }

        let s: IMyEventTester = new MyEventTester();
        let i = 0;

        var handler = () => {
            i++;
        };

        s.myEvent().subscribe(handler);
        s.signal();
        assert.equal(i, 1, 'i should be 1.');

        s.myEvent().unsubscribe(handler);
        s.signal();
        assert.equal(i, 1, 'i should still be 1 because of unsubscribe.');
    });

    QUnit.test("Singal list", (assert) => {

        assert.expect(4);

        let i = 10;
        let list = new SignalList();

        list.get("one").subscribe(()=>{
            i += 20;
        });

        list.get("two").subscribe(()=>{
            i += 40;
        });

        list.get("one").dispatch();
        assert.equal(i, 30, 'i should be 30.');

        list.get('two').dispatch();
        assert.equal(i, 70, 'i should be 70.');

        list.remove('two');
        list.get('two').dispatch();
        assert.equal(i, 70, 'i should still be 70, because event handler two was removed.');

        list.get("one").dispatch();
        assert.equal(i, 90, 'i should be 90.');
    });

    QUnit.test('SignalHandlingBase', (assert) => {

        assert.expect(3);

        class MyTester extends SignalHandlingBase {

            signal(name: string): void {
                this.events.get(name).dispatch();
            }
        }

        let t = new MyTester();
        let result = '';

        t.subscribe('Test1', () => result = 'Testing 123');
        t.signal('Test1');
        assert.equal(result, 'Testing 123', 'The result should be "Testing 123".');

        t.signal('Test2');
        assert.equal(result, 'Testing 123', 'The result should still be "Testing 123".');

        t.subscribe('Test2', () => result = 'Testing 789');
        t.signal('Test2');
        assert.equal(result, 'Testing 789', 'The result should be "Testing 789".');
    });

    QUnit.test('Async dispatch', (assert) => {

        let done = assert.async();
        let dispatcher = new SignalDispatcher();

        let i = 0;

        dispatcher.subscribe(() => {
            i = 1;
            assert.equal(i, 1, 'i should be 1.');
            done();
        });

        dispatcher.dispatchAsync();
        assert.equal(i, 0, 'Because of async dispatch, i should be 0.');
    });
});