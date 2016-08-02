var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
QUnit.module('Event', function () {
    var _this = this;
    QUnit.test("Subscribe / unsubscribe - event as property", function (assert) {
        assert.expect(2);
        var MyEventTester = (function () {
            function MyEventTester() {
                this._myEvent = new EventDispatcher();
            }
            Object.defineProperty(MyEventTester.prototype, "myEvent", {
                get: function () {
                    return this._myEvent.asEvent();
                },
                enumerable: true,
                configurable: true
            });
            MyEventTester.prototype.signal = function (str) {
                this._myEvent.dispatch(this, str);
            };
            return MyEventTester;
        }());
        var tester = new MyEventTester();
        var eventHandlerResult = null;
        var handler = function (sender, args) {
            eventHandlerResult = args;
        };
        tester.myEvent.subscribe(handler);
        tester.signal('Test1');
        assert.equal(eventHandlerResult, 'Test1', 'The eventHandlerResult should be "Test1".');
        tester.myEvent.unsubscribe(handler);
        tester.signal('Test2');
        assert.equal(eventHandlerResult, 'Test1', 'The eventHandlerResult should still be "Test1".');
    });
    QUnit.test("Subscribe / unsubscribe - event on interface", function (assert) {
        assert.expect(2);
        var MyEventTester = (function () {
            function MyEventTester() {
                this._myEvent = new EventDispatcher();
            }
            MyEventTester.prototype.myEvent = function () {
                return this._myEvent.asEvent();
            };
            MyEventTester.prototype.signal = function (str) {
                this._myEvent.dispatch(this, str);
            };
            return MyEventTester;
        }());
        var tester = new MyEventTester();
        var eventHandlerResult = null;
        var handler = function (sender, args) {
            eventHandlerResult = args;
        };
        tester.myEvent().subscribe(handler);
        tester.signal('Test1');
        assert.equal(eventHandlerResult, 'Test1', 'The eventHandlerResult should be "Test1".');
        tester.myEvent().unsubscribe(handler);
        tester.signal('Test2');
        assert.equal(eventHandlerResult, 'Test1', 'The eventHandlerResult should still be "Test1".');
    });
    QUnit.test("Event list", function (assert) {
        assert.expect(4);
        var events = new EventList();
        var result;
        events.get('Test1').subscribe(function (sender, args) { return result = args; });
        events.get('Test1').dispatch(_this, 'Testing 123');
        assert.equal(result, 'Testing 123', 'The result should be "Testing 123".');
        events.get('Test2').dispatch(_this, 'Testing 456');
        assert.equal(result, 'Testing 123', 'The result should still be "Testing 123".');
        events.get('Test2').subscribe(function (sender, args) { return result = args; });
        events.get('Test2').dispatch(_this, 'Testing 789');
        assert.equal(result, 'Testing 789', 'The result should be "Testing 789".');
        events.get('Test3').asEvent().subscribe(function (sender, args) { return result = args; });
        events.get('Test3').dispatch(_this, 'Testing 42');
        assert.equal(result, 'Testing 42', 'The result should be "Testing 42".');
    });
    QUnit.test('EventHandlingBase', function (assert) {
        assert.expect(3);
        var MyTester = (function (_super) {
            __extends(MyTester, _super);
            function MyTester() {
                _super.apply(this, arguments);
            }
            MyTester.prototype.signal = function (name, str) {
                this.events.get(name).dispatch(this, str);
            };
            return MyTester;
        }(EventHandlingBase));
        var t = new MyTester();
        var result;
        t.subscribe('Test1', function (sender, args) { return result = args; });
        t.signal('Test1', 'Testing 123');
        assert.equal(result, 'Testing 123', 'The result should be "Testing 123".');
        t.signal('Test2', 'Testing 456');
        assert.equal(result, 'Testing 123', 'The result should still be "Testing 123".');
        t.subscribe('Test2', function (sender, args) { return result = args; });
        t.signal('Test2', 'Testing 789');
        assert.equal(result, 'Testing 789', 'The result should be "Testing 789".');
    });
    QUnit.test('Dispatcher', function (assert) {
        assert.expect(4);
        var Source = (function () {
            function Source(name) {
                this.name = name;
            }
            return Source;
        }());
        var Argument = (function () {
            function Argument(name) {
                this.name = name;
            }
            return Argument;
        }());
        var dispatcher = new EventDispatcher();
        var s1 = new Source('s1');
        var s2 = new Source('s2');
        var a1 = new Argument('a1');
        var a2 = new Argument('a2');
        dispatcher.subscribe(function (sender, argument) {
            assert.deepEqual(sender, s1, "Sender should be s1.");
            assert.notDeepEqual(sender, s2, "Sender should not be s2.");
            assert.deepEqual(argument, a1, 'Argument should be a1.');
            assert.notDeepEqual(argument, a2, 'Argument should not be a2.');
        });
        dispatcher.dispatch(s1, a1);
    });
    QUnit.test('Async dispatch', function (assert) {
        assert.expect(2);
        var done = assert.async();
        var dispatcher = new EventDispatcher();
        var i = 0;
        dispatcher.subscribe(function (s, a) {
            i = a;
            assert.equal(i, 1, 'i should be 1.');
            done();
        });
        dispatcher.dispatchAsync(null, 1);
        assert.equal(i, 0, 'Because of async dispatch, i should be 0.');
    });
});
QUnit.module('Simple event', function () {
    QUnit.test("Subscribe / unsubscribe - simple event as property", function (assert) {
        assert.expect(2);
        var MyEventTester = (function () {
            function MyEventTester() {
                this._myEvent = new SimpleEventDispatcher();
            }
            Object.defineProperty(MyEventTester.prototype, "myEvent", {
                get: function () {
                    return this._myEvent;
                },
                enumerable: true,
                configurable: true
            });
            MyEventTester.prototype.signal = function (str) {
                this._myEvent.dispatch(str);
            };
            return MyEventTester;
        }());
        var s = new MyEventTester();
        var result = null;
        var handler = function (args) {
            result = args;
        };
        s.myEvent.subscribe(handler);
        s.signal('Test1');
        assert.equal(result, 'Test1', 'Result should be "Test1".');
        s.myEvent.unsubscribe(handler);
        s.signal('Test2');
        assert.equal(result, 'Test1', 'Result should still be "Test1" because of unsubscribe.');
    });
    QUnit.test("Subscribe / unsubscribe - simple event on interface", function (assert) {
        assert.expect(2);
        var MyEventTester = (function () {
            function MyEventTester() {
                this._myEvent = new SimpleEventDispatcher();
            }
            MyEventTester.prototype.myEvent = function () {
                return this._myEvent;
            };
            MyEventTester.prototype.signal = function (str) {
                this._myEvent.dispatch(str);
            };
            return MyEventTester;
        }());
        var s = new MyEventTester();
        var result = null;
        var handler = function (args) {
            result = args;
        };
        s.myEvent().subscribe(handler);
        s.signal('Test1');
        assert.equal(result, 'Test1', 'Result should be "Test1".');
        s.myEvent().unsubscribe(handler);
        s.signal('Test2');
        assert.equal(result, 'Test1', 'Result should still be "Test1" because of unsubscribe.');
    });
    QUnit.test("Simple event list", function (assert) {
        assert.expect(4);
        var events = new SimpleEventList();
        var result;
        events.get('Test1').subscribe(function (args) { return result = args; });
        events.get('Test1').dispatch('Testing 123');
        assert.equal(result, 'Testing 123', 'Result should be "Testing 123".');
        events.get('Test2').dispatch('Testing 456');
        assert.equal(result, 'Testing 123', 'Result should still be "Testing 123", because of the unsubscribe.');
        events.get('Test2').subscribe(function (args) { return result = args; });
        events.get('Test2').dispatch('Testing 789');
        assert.equal(result, 'Testing 789', 'Result should be "Testing 789".');
        events.get('Test3').asEvent().subscribe(function (args) { return result = args; });
        events.get('Test3').dispatch('Testing 42');
        assert.equal(result, 'Testing 42', 'Result of dispatch of interface should be "Testing 42".');
    });
    QUnit.test('SimpleEventHandlingBase', function (assert) {
        assert.expect(3);
        var MyTester = (function (_super) {
            __extends(MyTester, _super);
            function MyTester() {
                _super.apply(this, arguments);
            }
            MyTester.prototype.signal = function (name, str) {
                this.events.get(name).dispatch(str);
            };
            return MyTester;
        }(SimpleEventHandlingBase));
        var t = new MyTester();
        var result;
        t.subscribe('Test1', function (args) { return result = args; });
        t.signal('Test1', 'Testing 123');
        assert.equal(result, 'Testing 123', 'The result should be "Testing 123".');
        t.signal('Test2', 'Testing 456');
        assert.equal(result, 'Testing 123', 'The result should still be "Testing 123".');
        t.subscribe('Test2', function (args) { return result = args; });
        t.signal('Test2', 'Testing 789');
        assert.equal(result, 'Testing 789', 'The result should be "Testing 789".');
    });
    QUnit.test('Dispatcher', function (assert) {
        assert.expect(2);
        var Argument = (function () {
            function Argument(name) {
                this.name = name;
            }
            return Argument;
        }());
        var dispatcher = new SimpleEventDispatcher();
        var a1 = new Argument('a1');
        var a2 = new Argument('a2');
        dispatcher.subscribe(function (argument) {
            assert.deepEqual(argument, a1, 'Argument should be a1.');
            assert.notDeepEqual(argument, a2, 'Argument should not be a2.');
        });
        dispatcher.dispatch(a1);
    });
    QUnit.test('Async dispatch', function (assert) {
        var done = assert.async();
        var dispatcher = new SimpleEventDispatcher();
        var i = 0;
        dispatcher.subscribe(function (a) {
            i = a;
            assert.equal(i, 1, 'i should be 1.');
            done();
        });
        dispatcher.dispatchAsync(1);
        assert.equal(i, 0, 'Because of async dispatch, i should be 0.');
    });
});
QUnit.module('Signal', function () {
    QUnit.test("Subscribe / unsubscribe - signal as property", function (assert) {
        assert.expect(2);
        var MyEventTester = (function () {
            function MyEventTester() {
                this._myEvent = new SignalDispatcher();
            }
            Object.defineProperty(MyEventTester.prototype, "myEvent", {
                get: function () {
                    return this._myEvent;
                },
                enumerable: true,
                configurable: true
            });
            MyEventTester.prototype.signal = function () {
                this._myEvent.dispatch();
            };
            return MyEventTester;
        }());
        var s = new MyEventTester();
        var i = 0;
        var handler = function () {
            i++;
        };
        s.myEvent.subscribe(handler);
        s.signal();
        assert.equal(i, 1, 'i should be 1.');
        s.myEvent.unsubscribe(handler);
        s.signal();
        assert.equal(i, 1, 'i should still be 1 because of unsubscribe.');
    });
    QUnit.test("Subscribe / unsubscribe - signal on interface", function (assert) {
        assert.expect(2);
        var MyEventTester = (function () {
            function MyEventTester() {
                this._myEvent = new SignalDispatcher();
            }
            MyEventTester.prototype.myEvent = function () {
                return this._myEvent;
            };
            MyEventTester.prototype.signal = function () {
                this._myEvent.dispatch();
            };
            return MyEventTester;
        }());
        var s = new MyEventTester();
        var i = 0;
        var handler = function () {
            i++;
        };
        s.myEvent().subscribe(handler);
        s.signal();
        assert.equal(i, 1, 'i should be 1.');
        s.myEvent().unsubscribe(handler);
        s.signal();
        assert.equal(i, 1, 'i should still be 1 because of unsubscribe.');
    });
    QUnit.test("Singal list", function (assert) {
        assert.expect(4);
        var i = 10;
        var list = new SignalList();
        list.get("one").subscribe(function () {
            i += 20;
        });
        list.get("two").subscribe(function () {
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
    QUnit.test('SignalHandlingBase', function (assert) {
        assert.expect(3);
        var MyTester = (function (_super) {
            __extends(MyTester, _super);
            function MyTester() {
                _super.apply(this, arguments);
            }
            MyTester.prototype.signal = function (name) {
                this.events.get(name).dispatch();
            };
            return MyTester;
        }(SignalHandlingBase));
        var t = new MyTester();
        var result = '';
        t.subscribe('Test1', function () { return result = 'Testing 123'; });
        t.signal('Test1');
        assert.equal(result, 'Testing 123', 'The result should be "Testing 123".');
        t.signal('Test2');
        assert.equal(result, 'Testing 123', 'The result should still be "Testing 123".');
        t.subscribe('Test2', function () { return result = 'Testing 789'; });
        t.signal('Test2');
        assert.equal(result, 'Testing 789', 'The result should be "Testing 789".');
    });
    QUnit.test('Async dispatch', function (assert) {
        var done = assert.async();
        var dispatcher = new SignalDispatcher();
        var i = 0;
        dispatcher.subscribe(function () {
            i = 1;
            assert.equal(i, 1, 'i should be 1.');
            done();
        });
        dispatcher.dispatchAsync();
        assert.equal(i, 0, 'Because of async dispatch, i should be 0.');
    });
});
