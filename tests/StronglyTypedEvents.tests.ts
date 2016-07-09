/// <reference path="../typings/qunit.d.ts" />
/// <reference path="../typings/stronglytypedevents.d.ts" />
/// <reference path="../stronglytypedevents.ts" />

QUnit.test("Testing subscribe / unsubscribe - event as property", (assert) => {

    class MyEventTester {
        private _myEvent: EventDispatcher<MyEventTester, string> = new EventDispatcher<MyEventTester, string>();

        get myEvent(): IEvent<MyEventTester, string> {
            return this._myEvent.asEvent();
        }

        signal(str: string): void {
            this._myEvent.dispatch(this, str);
        }
    }

    var s = new MyEventTester();
    var r = null;

    var handler = (sender: MyEventTester, args: string) => {
        r = args;
    };

    s.myEvent.subscribe(handler);
    s.signal('Test1');
    assert.equal(r, 'Test1');

    s.myEvent.unsubscribe(handler);
    s.signal('Test2');
    assert.equal(r, 'Test1');
});

QUnit.test("Testing subscribe / unsubscribe - event on interface" , (assert) => {

    interface IMyEventTester {
        myEvent(): IEvent<IMyEventTester, string>;

        signal(str: string);
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

    var s: IMyEventTester = new MyEventTester();
    var r = null;

    var handler = (sender: IMyEventTester, args: string) => {
        r = args;
    };

    s.myEvent().subscribe(handler);
    s.signal('Test1');
    assert.equal(r, 'Test1');

    s.myEvent().unsubscribe(handler);
    s.signal('Test2');
    assert.equal(r, 'Test1');
});

QUnit.test("Testing event list", (assert) => {

    var events = new EventList<any, string>();
    var result: string;

    events.get('Test1').subscribe((sender, args) => result = args);
    events.get('Test1').dispatch(this, 'Testing 123');
    assert.equal(result, 'Testing 123');

    events.get('Test2').dispatch(this, 'Testing 456');
    assert.equal(result, 'Testing 123');

    events.get('Test2').subscribe((sender, args) => result = args);
    events.get('Test2').dispatch(this, 'Testing 789');
    assert.equal(result, 'Testing 789');

    events.get('Test3').asEvent().subscribe((sender, args) => result = args);
    events.get('Test3').dispatch(this, 'Testing 42');
    assert.equal(result, 'Testing 42');

});

QUnit.test('Testing EventHandlingBase', (assert) => {

    class MyTester extends EventHandlingBase<MyTester, string> {

        signal(name: string, str: string): void {
            this.events.get(name).dispatch(this, str);
        }
    }

    var t = new MyTester();
    var result: string;

    t.subscribe('Test1', (sender, args) => result = args);
    t.signal('Test1', 'Testing 123');
    assert.equal(result, 'Testing 123');

    t.signal('Test2', 'Testing 456');
    assert.equal(result, 'Testing 123');

    t.subscribe('Test2', (sender, args) => result = args);
    t.signal('Test2', 'Testing 789');
    assert.equal(result, 'Testing 789');
});

QUnit.test("Testing subscribe / unsubscribe - simple event as property", (assert) => {

    class MyEventTester {
        private _myEvent: SimpleEventDispatcher<string> = new SimpleEventDispatcher<string>();

        get myEvent(): ISimpleEvent<string> {
            return this._myEvent;
        }

        signal(str: string): void {
            this._myEvent.dispatch(str);
        }
    }

    var s = new MyEventTester();
    var r = null;

    var handler = (args: string) => {
        r = args;
    };

    s.myEvent.subscribe(handler);
    s.signal('Test1');
    assert.equal(r, 'Test1');

    s.myEvent.unsubscribe(handler);
    s.signal('Test2');
    assert.equal(r, 'Test1');
});

QUnit.test("Testing subscribe / unsubscribe - simple event on interface", (assert) => {

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

    var s: IMyEventTester = new MyEventTester();
    var r = null;

    var handler = (args: string) => {
        r = args;
    };

    s.myEvent().subscribe(handler);
    s.signal('Test1');
    assert.equal(r, 'Test1');

    s.myEvent().unsubscribe(handler);
    s.signal('Test2');
    assert.equal(r, 'Test1');
});

QUnit.test("Testing simple event list", (assert) => {

    var events = new SimpleEventList<string>();
    var result: string;

    events.get('Test1').subscribe((args) => result = args);
    events.get('Test1').dispatch('Testing 123');
    assert.equal(result, 'Testing 123');

    events.get('Test2').dispatch('Testing 456');
    assert.equal(result, 'Testing 123');

    events.get('Test2').subscribe((args) => result = args);
    events.get('Test2').dispatch('Testing 789');
    assert.equal(result, 'Testing 789');

    events.get('Test3').asEvent().subscribe((args) => result = args);
    events.get('Test3').dispatch('Testing 42');
    assert.equal(result, 'Testing 42');

});

QUnit.test('Testing SimpleEventHandlingBase', (assert) => {

    class MyTester extends SimpleEventHandlingBase<string> {

        signal(name: string, str: string): void {
            this.events.get(name).dispatch(str);
        }
    }

    var t = new MyTester();
    var result: string;

    t.subscribe('Test1', (args) => result = args);
    t.signal('Test1', 'Testing 123');
    assert.equal(result, 'Testing 123');

    t.signal('Test2', 'Testing 456');
    assert.equal(result, 'Testing 123');

    t.subscribe('Test2', (args) => result = args);
    t.signal('Test2', 'Testing 789');
    assert.equal(result, 'Testing 789');
});

QUnit.test('Testing event dispatcher', (assert) => {

    class Source { }
    class Argument { }

    let dispatcher = new EventDispatcher<Source, Argument>();

    var s1 = new Source();
    var s2 = new Source();
    var a1 = new Argument();
    var a2 = new Argument();

    dispatcher.subscribe((sender: Source, argument: Argument) => {
        assert.equal(sender === s1, true);
        assert.equal(sender === s2 ,false);

        assert.equal(argument === a1, true);
        assert.equal(argument === a2, false);
    });

    dispatcher.dispatch(s1, a1);
});


QUnit.test('Testing simple event dispatcher', (assert) => {

    class Argument { }

    let dispatcher = new SimpleEventDispatcher< Argument>();

    var a1 = new Argument();
    var a2 = new Argument();

    dispatcher.subscribe((argument: Argument) => {
        assert.equal(argument === a1, true);
        assert.equal(argument === a2, false);
    });

    dispatcher.dispatch(a1);
});

QUnit.test('Testing event async dispatch', (assert) => {

    let dispatcher = new EventDispatcher<any, number>();

    let i = 0;

    dispatcher.subscribe((s, a) => {
        i = a;

        assert.equal(i, 1);
    });

    dispatcher.dispatchAsync(null, 1);

    assert.equal(i, 0);
});

QUnit.test('Testing simple event async dispatch', (assert) => {

    let dispatcher = new SimpleEventDispatcher<number>();

    let i = 0;

    dispatcher.subscribe((a) => {
        i = a;

        assert.equal(i, 1);
    });

    dispatcher.dispatchAsync(1);

    assert.equal(i, 0);
});
