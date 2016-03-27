QUnit.test("Testing subscribe / unsubsribe - event as property", (assert) => {

    class SimpleEventTester {
        private _myEvent: EventDispatcher<SimpleEventTester, string> = new EventDispatcher<SimpleEventTester, string>();

        get myEvent(): IEvent<SimpleEventTester, string> {
            return this._myEvent;
        }

        signal(str: string): void {
            this._myEvent.dispatch(this, str);
        }
    }

    var s = new SimpleEventTester();
    var r = null;

    var handler = (sender: SimpleEventTester, args: string) => {
        r = args;
    };

    s.myEvent.subscribe(handler);
    s.signal('Test1');
    assert.equal(r, 'Test1');

    s.myEvent.unsubscribe(handler);
    s.signal('Test2');
    assert.equal(r, 'Test1');
});

QUnit.test("Testing subscribe / unsubsribe - event on interface" , (assert) => {

    interface ISimpleEventTester {
        myEvent(): IEvent<ISimpleEventTester, string>;

        signal(str: string);
    }

    class SimpleEventTester implements ISimpleEventTester {
        private _myEvent: EventDispatcher<ISimpleEventTester, string> = new EventDispatcher<ISimpleEventTester, string>();

        myEvent(): IEvent<ISimpleEventTester, string> {
            return this._myEvent;
        }

        signal(str: string): void {
            this._myEvent.dispatch(this, str);
        }
    }

    var s: ISimpleEventTester = new SimpleEventTester();
    var r = null;

    var handler = (sender: SimpleEventTester, args: string) => {
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
