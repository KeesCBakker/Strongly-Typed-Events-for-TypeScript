/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
/// <reference path="../strongly-typed-events.d.ts" />
'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var r = typeof require !== 'undefined';
var expect = r ? require('chai').expect : window.chai.expect;
var _e = r ? require('../strongly-typed-events') : window;
describe("Strongly Typed Events", function () {
    describe("Event", function () {
        it("Subscribe / unsubscribe - event as property", function () {
            var MyEventTester = (function () {
                function MyEventTester() {
                    this._myEvent = new _e.EventDispatcher();
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
            expect(eventHandlerResult, 'The eventHandlerResult should be "Test1".').to.equal('Test1');
            tester.signal('Test2');
            expect(eventHandlerResult, 'The eventHandlerResult should be "Test2".').to.equal('Test2');
            tester.myEvent.unsubscribe(handler);
            tester.signal('Test3');
            expect(eventHandlerResult, 'The eventHandlerResult should still be "Test2".').to.equal('Test2');
        });
        it("Subscribe / unsubscribe - event on interface", function () {
            var MyEventTester = (function () {
                function MyEventTester() {
                    this._myEvent = new _e.EventDispatcher();
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
            expect(eventHandlerResult, 'The eventHandlerResult should be "Test1".').to.equal('Test1');
            tester.myEvent().unsubscribe(handler);
            tester.signal('Test2');
            expect(eventHandlerResult, 'The eventHandlerResult should still be "Test1".').to.equal('Test1');
        });
        it("Event list", function () {
            var events = new _e.EventList();
            var result;
            events.get('Test1').subscribe(function (sender, args) { return result = args; });
            events.get('Test1').dispatch(this, 'Testing 123');
            expect(result, 'The result should be "Testing 123".').to.equal('Testing 123');
            events.get('Test2').dispatch(this, 'Testing 456');
            expect(result, 'The result should still be "Testing 123".').to.equal('Testing 123');
            events.get('Test2').subscribe(function (sender, args) { return result = args; });
            events.get('Test2').dispatch(this, 'Testing 789');
            expect(result, 'The result should be "Testing 789".').to.equal('Testing 789');
            events.get('Test3').asEvent().subscribe(function (sender, args) { return result = args; });
            events.get('Test3').dispatch(this, 'Testing 42');
            expect(result, 'The result should be "Testing 42".').to.equal('Testing 42');
        });
        it('EventHandlingBase', function () {
            var MyTester = (function (_super) {
                __extends(MyTester, _super);
                function MyTester() {
                    _super.apply(this, arguments);
                }
                MyTester.prototype.signal = function (name, str) {
                    this.events.get(name).dispatch(this, str);
                };
                return MyTester;
            }(_e.EventHandlingBase));
            var t = new MyTester();
            var result;
            t.subscribe('Test1', function (sender, args) { return result = args; });
            t.signal('Test1', 'Testing 123');
            expect(result, 'The result should be "Testing 123".').to.equal('Testing 123');
            t.signal('Test2', 'Testing 456');
            expect(result, 'The result should still be "Testing 123".').to.equal('Testing 123');
            t.subscribe('Test2', function (sender, args) { return result = args; });
            t.signal('Test2', 'Testing 789');
            expect(result, 'The result should be "Testing 789".').to.equal('Testing 789');
        });
        it('Dispatcher', function () {
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
            var dispatcher = new _e.EventDispatcher();
            var s1 = new Source('s1');
            var s2 = new Source('s2');
            var a1 = new Argument('a1');
            var a2 = new Argument('a2');
            dispatcher.subscribe(function (sender, argument) {
                expect(sender, "Sender should be s1.").to.equal(s1);
                expect(sender, "Sender should not be s2.").not.equal(s2);
                expect(argument, "Argument should be a1.").to.equal(a1);
                expect(argument, "Argument should not be a2.").not.equal(a2);
            });
            dispatcher.dispatch(s1, a1);
        });
        it('Async dispatch', function (done) {
            var dispatcher = new _e.EventDispatcher();
            var i = 0;
            dispatcher.subscribe(function (s, a) {
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
            var MyEventTester = (function () {
                function MyEventTester() {
                    this._myEvent = new _e.SimpleEventDispatcher();
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
            expect(result, 'Result should be "Test1".').to.equal('Test1');
            s.myEvent.unsubscribe(handler);
            s.signal('Test2');
            expect(result, 'Result should still be "Test1" because of unsubscribe.').to.equal('Test1');
        });
        it("Subscribe / unsubscribe - simple event on interface", function () {
            var MyEventTester = (function () {
                function MyEventTester() {
                    this._myEvent = new _e.SimpleEventDispatcher();
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
            expect(result, 'Result should be "Test1".').to.equal('Test1');
            s.myEvent().unsubscribe(handler);
            s.signal('Test2');
            expect(result, 'Result should still be "Test1" because of unsubscribe.').to.equal('Test1');
        });
        it("Simple Event list", function () {
            var events = new _e.SimpleEventList();
            var result;
            events.get('Test1').subscribe(function (args) { return result = args; });
            events.get('Test1').dispatch('Testing 123');
            expect(result, 'Result should be "Testing 123".').to.equal('Testing 123');
            events.get('Test2').dispatch('Testing 456');
            expect(result, 'Result should still be "Testing 123".').to.equal('Testing 123');
            events.get('Test2').subscribe(function (args) { return result = args; });
            events.get('Test2').dispatch('Testing 789');
            expect(result, 'Result should be "Testing 789".').to.equal('Testing 789');
            events.get('Test3').asEvent().subscribe(function (args) { return result = args; });
            events.get('Test3').dispatch('Testing 42');
            expect(result, 'Result of dispatch of interface should be "Testing 42".').to.equal('Testing 42');
        });
        it('SimpleEventHandlingBase', function () {
            var MyTester = (function (_super) {
                __extends(MyTester, _super);
                function MyTester() {
                    _super.apply(this, arguments);
                }
                MyTester.prototype.signal = function (name, str) {
                    this.events.get(name).dispatch(str);
                };
                return MyTester;
            }(_e.SimpleEventHandlingBase));
            var t = new MyTester();
            var result;
            t.subscribe('Test1', function (args) { return result = args; });
            t.signal('Test1', 'Testing 123');
            expect(result, 'The result should be "Testing 123".').to.equal('Testing 123');
            t.signal('Test2', 'Testing 456');
            expect(result, 'The result should still be "Testing 123".').to.equal('Testing 123');
            t.subscribe('Test2', function (args) { return result = args; });
            t.signal('Test2', 'Testing 789');
            expect(result, 'The result should be "Testing 789".').to.equal('Testing 789');
        });
        it('Dispatcher', function () {
            var Argument = (function () {
                function Argument(name) {
                    this.name = name;
                }
                return Argument;
            }());
            var dispatcher = new _e.SimpleEventDispatcher();
            var a1 = new Argument('a1');
            var a2 = new Argument('a2');
            dispatcher.subscribe(function (argument) {
                expect(argument, "Argument should be a1.").to.equal(a1);
                expect(argument, "Argument should not be a2.").not.equal(a2);
            });
            dispatcher.dispatch(a1);
        });
        it('Async dispatch', function (done) {
            var dispatcher = new _e.SimpleEventDispatcher();
            var i = 0;
            dispatcher.subscribe(function (a) {
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
            var MyEventTester = (function () {
                function MyEventTester() {
                    this._myEvent = new _e.SignalDispatcher();
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
            expect(i, 'i should be 1.').to.equal(1);
            s.myEvent.unsubscribe(handler);
            s.signal();
            expect(i, 'i should still be 1 because of unsubscribe.').to.equal(1);
        });
        it("Subscribe / unsubscribe - signal on interface", function () {
            var MyEventTester = (function () {
                function MyEventTester() {
                    this._myEvent = new _e.SignalDispatcher();
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
            expect(i, 'i should be 1.').to.equal(1);
            s.myEvent().unsubscribe(handler);
            s.signal();
            expect(i, 'i should still be 1 because of unsubscribe.').to.equal(1);
        });
        it("Signal list", function () {
            var i = 10;
            var list = new _e.SignalList();
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
            var MyTester = (function (_super) {
                __extends(MyTester, _super);
                function MyTester() {
                    _super.apply(this, arguments);
                }
                MyTester.prototype.signal = function (name) {
                    this.events.get(name).dispatch();
                };
                return MyTester;
            }(_e.SignalHandlingBase));
            var t = new MyTester();
            var result = '';
            t.subscribe('Test1', function () { return result = 'Testing 123'; });
            t.signal('Test1');
            expect(result, 'The result should be "Testing 123".').to.equal('Testing 123');
            t.signal('Test2');
            expect(result, 'The result should still be "Testing 123".').to.equal('Testing 123');
            t.subscribe('Test2', function () { return result = 'Testing 789'; });
            t.signal('Test2');
            expect(result, 'The result should be "Testing 789".').to.equal('Testing 789');
        });
        it('Async dispatch', function (done) {
            var dispatcher = new _e.SignalDispatcher();
            var i = 0;
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
            var dispatcher = _e.createEventDispatcher();
            dispatcher.one(function (sender, args) {
                i += args;
            });
            dispatcher.dispatch(null, 1);
            expect(i, 'i should be 1.').to.equal(1);
            dispatcher.dispatch(null, 1);
            expect(i, 'i should still be 1, because the event should only fire once.').to.equal(1);
        });
        it("Execute 2x one on an event dispatcher", function () {
            var i = 0;
            var dispatcher = _e.createEventDispatcher();
            dispatcher.one(function (sender, args) {
                i += args;
            });
            dispatcher.one(function (sender, args) {
                i += args;
            });
            dispatcher.dispatch(null, 1);
            expect(i, 'i should be 2.').to.equal(2);
            dispatcher.dispatch(null, 1);
            expect(i, 'i should still be 2, because the event should only fire once.').to.equal(2);
        });
        it("Unsubscribe one on an event dispatcher", function () {
            var i = 0;
            var dispatcher = _e.createEventDispatcher();
            var fn = function (sender, args) {
                i += args;
            };
            dispatcher.one(fn);
            dispatcher.unsubscribe(fn);
            dispatcher.dispatch(null, 1);
            expect(i, 'i should be 0.').to.equal(0);
        });
        it("Register", function () {
            var i = 0;
            var dispatcher = _e.createEventDispatcher();
            var fn = function (sender, args) {
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
