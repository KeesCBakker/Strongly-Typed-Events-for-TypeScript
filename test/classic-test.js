'use strict';
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var strongly_typed_events_1 = require("../strongly-typed-events");
describe("Strongly Typed Events", function () {
    describe("Event", function () {
        it("Subscribe / unsubscribe - event as property", function () {
            var MyEventTester = /** @class */ (function () {
                function MyEventTester() {
                    this._myEvent = new strongly_typed_events_1.EventDispatcher();
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
            chai_1.expect(eventHandlerResult, 'The eventHandlerResult should be "Test1".').to.equal('Test1');
            tester.signal('Test2');
            chai_1.expect(eventHandlerResult, 'The eventHandlerResult should be "Test2".').to.equal('Test2');
            tester.myEvent.unsubscribe(handler);
            tester.signal('Test3');
            chai_1.expect(eventHandlerResult, 'The eventHandlerResult should still be "Test2".').to.equal('Test2');
        });
        it("Subscribe / unsubscribe - event on interface", function () {
            var MyEventTester = /** @class */ (function () {
                function MyEventTester() {
                    this._myEvent = new strongly_typed_events_1.EventDispatcher();
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
            chai_1.expect(eventHandlerResult, 'The eventHandlerResult should be "Test1".').to.equal('Test1');
            tester.myEvent().unsubscribe(handler);
            tester.signal('Test2');
            chai_1.expect(eventHandlerResult, 'The eventHandlerResult should still be "Test1".').to.equal('Test1');
        });
        it("Event list", function () {
            var events = new strongly_typed_events_1.EventList();
            var result;
            events.get('Test1').subscribe(function (sender, args) { return result = args; });
            events.get('Test1').dispatch(this, 'Testing 123');
            chai_1.expect(result, 'The result should be "Testing 123".').to.equal('Testing 123');
            events.get('Test2').dispatch(this, 'Testing 456');
            chai_1.expect(result, 'The result should still be "Testing 123".').to.equal('Testing 123');
            events.get('Test2').subscribe(function (sender, args) { return result = args; });
            events.get('Test2').dispatch(this, 'Testing 789');
            chai_1.expect(result, 'The result should be "Testing 789".').to.equal('Testing 789');
            events.get('Test3').asEvent().subscribe(function (sender, args) { return result = args; });
            events.get('Test3').dispatch(this, 'Testing 42');
            chai_1.expect(result, 'The result should be "Testing 42".').to.equal('Testing 42');
        });
        it('EventHandlingBase', function () {
            var MyTester = /** @class */ (function (_super) {
                __extends(MyTester, _super);
                function MyTester() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                MyTester.prototype.signal = function (name, str) {
                    this.events.get(name).dispatch(this, str);
                };
                return MyTester;
            }(strongly_typed_events_1.EventHandlingBase));
            var t = new MyTester();
            var result;
            t.subscribe('Test1', function (sender, args) { return result = args; });
            t.signal('Test1', 'Testing 123');
            chai_1.expect(result, 'The result should be "Testing 123".').to.equal('Testing 123');
            t.signal('Test2', 'Testing 456');
            chai_1.expect(result, 'The result should still be "Testing 123".').to.equal('Testing 123');
            t.subscribe('Test2', function (sender, args) { return result = args; });
            t.signal('Test2', 'Testing 789');
            chai_1.expect(result, 'The result should be "Testing 789".').to.equal('Testing 789');
        });
        it('Dispatcher', function () {
            var Source = /** @class */ (function () {
                function Source(name) {
                    this.name = name;
                }
                return Source;
            }());
            var Argument = /** @class */ (function () {
                function Argument(name) {
                    this.name = name;
                }
                return Argument;
            }());
            var dispatcher = new strongly_typed_events_1.EventDispatcher();
            var s1 = new Source('s1');
            var s2 = new Source('s2');
            var a1 = new Argument('a1');
            var a2 = new Argument('a2');
            dispatcher.subscribe(function (sender, argument) {
                chai_1.expect(sender, "Sender should be s1.").to.equal(s1);
                chai_1.expect(sender, "Sender should not be s2.").not.equal(s2);
                chai_1.expect(argument, "Argument should be a1.").to.equal(a1);
                chai_1.expect(argument, "Argument should not be a2.").not.equal(a2);
            });
            dispatcher.dispatch(s1, a1);
        });
        it('Async dispatch', function (done) {
            var dispatcher = new strongly_typed_events_1.EventDispatcher();
            var i = 0;
            dispatcher.subscribe(function (s, a) {
                i = a;
                chai_1.expect(i, 'i should be 1.').to.equal(1);
                done();
            });
            dispatcher.dispatchAsync(null, 1);
            chai_1.expect(i, 'Because of async dispatch, i should be 0.').to.equal(0);
        });
        it('Unsubscribe event handler after dispatching 2 times.', function () {
            var dispatcher = new strongly_typed_events_1.EventDispatcher();
            var i = 0;
            var unsub = dispatcher.subscribe(function (s, a) {
                i += a;
                if (i == 3) {
                    unsub();
                }
            });
            dispatcher.dispatch(null, 1);
            dispatcher.dispatch(null, 2);
            dispatcher.dispatch(null, 4);
            chai_1.expect(i, 'Because of unsubscribing, i should be 3.').to.equal(3);
        });
    });
    describe("Simple Event", function () {
        it("Subscribe / unsubscribe - simple event as property", function () {
            var MyEventTester = /** @class */ (function () {
                function MyEventTester() {
                    this._myEvent = new strongly_typed_events_1.SimpleEventDispatcher();
                }
                Object.defineProperty(MyEventTester.prototype, "myEvent", {
                    get: function () {
                        return this._myEvent.asEvent();
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
            chai_1.expect(result, 'Result should be "Test1".').to.equal('Test1');
            s.myEvent.unsubscribe(handler);
            s.signal('Test2');
            chai_1.expect(result, 'Result should still be "Test1" because of unsubscribe.').to.equal('Test1');
        });
        it("Subscribe / unsubscribe - simple event on interface", function () {
            var MyEventTester = /** @class */ (function () {
                function MyEventTester() {
                    this._myEvent = new strongly_typed_events_1.SimpleEventDispatcher();
                }
                MyEventTester.prototype.myEvent = function () {
                    return this._myEvent.asEvent();
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
            chai_1.expect(result, 'Result should be "Test1".').to.equal('Test1');
            s.myEvent().unsubscribe(handler);
            s.signal('Test2');
            chai_1.expect(result, 'Result should still be "Test1" because of unsubscribe.').to.equal('Test1');
        });
        it("Simple Event list", function () {
            var events = new strongly_typed_events_1.SimpleEventList();
            var result;
            events.get('Test1').subscribe(function (args) { return result = args; });
            events.get('Test1').dispatch('Testing 123');
            chai_1.expect(result, 'Result should be "Testing 123".').to.equal('Testing 123');
            events.get('Test2').dispatch('Testing 456');
            chai_1.expect(result, 'Result should still be "Testing 123".').to.equal('Testing 123');
            events.get('Test2').subscribe(function (args) { return result = args; });
            events.get('Test2').dispatch('Testing 789');
            chai_1.expect(result, 'Result should be "Testing 789".').to.equal('Testing 789');
            events.get('Test3').asEvent().subscribe(function (args) { return result = args; });
            events.get('Test3').dispatch('Testing 42');
            chai_1.expect(result, 'Result of dispatch of interface should be "Testing 42".').to.equal('Testing 42');
        });
        it('SimpleEventHandlingBase', function () {
            var MyTester = /** @class */ (function (_super) {
                __extends(MyTester, _super);
                function MyTester() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                MyTester.prototype.signal = function (name, str) {
                    this.events.get(name).dispatch(str);
                };
                return MyTester;
            }(strongly_typed_events_1.SimpleEventHandlingBase));
            var t = new MyTester();
            var result;
            t.subscribe('Test1', function (args) { return result = args; });
            t.signal('Test1', 'Testing 123');
            chai_1.expect(result, 'The result should be "Testing 123".').to.equal('Testing 123');
            t.signal('Test2', 'Testing 456');
            chai_1.expect(result, 'The result should still be "Testing 123".').to.equal('Testing 123');
            t.subscribe('Test2', function (args) { return result = args; });
            t.signal('Test2', 'Testing 789');
            chai_1.expect(result, 'The result should be "Testing 789".').to.equal('Testing 789');
        });
        it('Dispatcher', function () {
            var Argument = /** @class */ (function () {
                function Argument(name) {
                    this.name = name;
                }
                return Argument;
            }());
            var dispatcher = new strongly_typed_events_1.SimpleEventDispatcher();
            var a1 = new Argument('a1');
            var a2 = new Argument('a2');
            dispatcher.subscribe(function (argument) {
                chai_1.expect(argument, "Argument should be a1.").to.equal(a1);
                chai_1.expect(argument, "Argument should not be a2.").not.equal(a2);
            });
            dispatcher.dispatch(a1);
        });
        it('Async dispatch', function (done) {
            var dispatcher = new strongly_typed_events_1.SimpleEventDispatcher();
            var i = 0;
            dispatcher.subscribe(function (a) {
                i = a;
                chai_1.expect(i, 'i should be 1.').to.equal(1);
                done();
            });
            dispatcher.dispatchAsync(1);
            chai_1.expect(i, 'Because of async dispatch, i should be 0.').to.equal(0);
        });
        it('Unsubscribe event handler after dispatching 2 times.', function () {
            var dispatcher = new strongly_typed_events_1.SimpleEventDispatcher();
            var i = 0;
            var unsub = dispatcher.subscribe(function (a) {
                i += a;
                if (i == 3) {
                    unsub();
                }
            });
            dispatcher.dispatch(1);
            dispatcher.dispatch(2);
            dispatcher.dispatch(4);
            chai_1.expect(i, 'Because of unsubscribing, i should be 3.').to.equal(3);
        });
    });
    describe('Signal', function () {
        it("Subscribe / unsubscribe - signal as property", function () {
            var MyEventTester = /** @class */ (function () {
                function MyEventTester() {
                    this._myEvent = new strongly_typed_events_1.SignalDispatcher();
                }
                Object.defineProperty(MyEventTester.prototype, "myEvent", {
                    get: function () {
                        return this._myEvent.asEvent();
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
            chai_1.expect(i, 'i should be 1.').to.equal(1);
            s.myEvent.unsubscribe(handler);
            s.signal();
            chai_1.expect(i, 'i should still be 1 because of unsubscribe.').to.equal(1);
        });
        it("Subscribe / unsubscribe - signal on interface", function () {
            var MyEventTester = /** @class */ (function () {
                function MyEventTester() {
                    this._myEvent = new strongly_typed_events_1.SignalDispatcher();
                }
                MyEventTester.prototype.myEvent = function () {
                    return this._myEvent.asEvent();
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
            chai_1.expect(i, 'i should be 1.').to.equal(1);
            s.myEvent().unsubscribe(handler);
            s.signal();
            chai_1.expect(i, 'i should still be 1 because of unsubscribe.').to.equal(1);
        });
        it("Signal list", function () {
            var i = 10;
            var list = new strongly_typed_events_1.SignalList();
            list.get("one").subscribe(function () {
                i += 20;
            });
            list.get("two").subscribe(function () {
                i += 40;
            });
            list.get("one").dispatch();
            chai_1.expect(i, 'i should be 30.').to.equal(30);
            list.get('two').dispatch();
            chai_1.expect(i, 'i should be 70.').to.equal(70);
            list.remove('two');
            list.get('two').dispatch();
            chai_1.expect(i, 'i should still be 70, because event handler two was removed.').to.equal(70);
            list.get("one").dispatch();
            chai_1.expect(i, 'i should be 90.').to.equal(90);
        });
        it('SignalHandlingBase', function () {
            var MyTester = /** @class */ (function (_super) {
                __extends(MyTester, _super);
                function MyTester() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                MyTester.prototype.signal = function (name) {
                    this.events.get(name).dispatch();
                };
                return MyTester;
            }(strongly_typed_events_1.SignalHandlingBase));
            var t = new MyTester();
            var result = '';
            t.subscribe('Test1', function () { return result = 'Testing 123'; });
            t.signal('Test1');
            chai_1.expect(result, 'The result should be "Testing 123".').to.equal('Testing 123');
            t.signal('Test2');
            chai_1.expect(result, 'The result should still be "Testing 123".').to.equal('Testing 123');
            t.subscribe('Test2', function () { return result = 'Testing 789'; });
            t.signal('Test2');
            chai_1.expect(result, 'The result should be "Testing 789".').to.equal('Testing 789');
        });
        it('Async dispatch', function (done) {
            var dispatcher = new strongly_typed_events_1.SignalDispatcher();
            var i = 0;
            dispatcher.subscribe(function () {
                i = 1;
                chai_1.expect(i, 'i should be 1.').to.equal(1);
                done();
            });
            dispatcher.dispatchAsync();
            chai_1.expect(i, 'Because of async dispatch, i should be 0.').to.equal(0);
        });
        it('Unsubscribe event handler after dispatching 2 times.', function () {
            var dispatcher = new strongly_typed_events_1.SignalDispatcher();
            var i = 0;
            var unsub = dispatcher.subscribe(function () {
                i++;
                if (i == 2) {
                    unsub();
                }
            });
            dispatcher.dispatch();
            dispatcher.dispatch();
            dispatcher.dispatch();
            chai_1.expect(i, 'Because of unsubscribing, i should be 2.').to.equal(2);
        });
    });
    describe("One", function () {
        it("Execute one on an event dispatcher", function () {
            var i = 0;
            var dispatcher = new strongly_typed_events_1.EventDispatcher();
            dispatcher.one(function (sender, args) {
                i += args;
            });
            dispatcher.dispatch(null, 1);
            chai_1.expect(i, 'i should be 1.').to.equal(1);
            dispatcher.dispatch(null, 1);
            chai_1.expect(i, 'i should still be 1, because the event should only fire once.').to.equal(1);
        });
        it("Execute 2x one on an event dispatcher", function () {
            var i = 0;
            var dispatcher = new strongly_typed_events_1.EventDispatcher();
            dispatcher.one(function (sender, args) {
                i += args;
            });
            dispatcher.one(function (sender, args) {
                i += args;
            });
            dispatcher.dispatch(null, 1);
            chai_1.expect(i, 'i should be 2.').to.equal(2);
            dispatcher.dispatch(null, 1);
            chai_1.expect(i, 'i should still be 2, because the event should only fire once.').to.equal(2);
        });
        it("Unsubscribe one on an event dispatcher", function () {
            var i = 0;
            var dispatcher = new strongly_typed_events_1.EventDispatcher();
            var fn = function (sender, args) {
                i += args;
            };
            dispatcher.one(fn);
            dispatcher.unsubscribe(fn);
            dispatcher.dispatch(null, 1);
            chai_1.expect(i, 'i should be 0.').to.equal(0);
        });
        it("Register", function () {
            var i = 0;
            var dispatcher = new strongly_typed_events_1.EventDispatcher();
            var fn = function (sender, args) {
                i += args;
            };
            dispatcher.one(fn);
            dispatcher.one(fn);
            dispatcher.unsubscribe(fn);
            dispatcher.dispatch(null, 1);
            chai_1.expect(i, 'i should be 1.').to.equal(1);
        });
    });
});
