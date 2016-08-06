/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
/// <reference path="../StronglyTypedEvents.d.ts" />
'use strict';
var r = typeof require !== 'undefined';
var expect = r ? require('chai').expect : window.chai.expect;
var _e = r ? require('../StronglyTypedEvents') : window;
describe("Strongly Typed Events - Signal", function () {
    describe("createSignalDispatcher", function () {
        it("Subscribing to the signal dispatcher", function () {
            var dispatcher = _e.createSignalDispatcher();
            var resultNr;
            dispatcher.subscribe(function () {
                resultNr = 7;
            });
            dispatcher.dispatch();
            expect(resultNr, 'resultNr should be 7.').to.equal(7);
        });
        it("Sub to the signal dispatcher", function () {
            var dispatcher = _e.createSignalDispatcher();
            var resultNr;
            dispatcher.sub(function () {
                resultNr = 7;
            });
            dispatcher.dispatch();
            expect(resultNr, 'resultNr should be 7.').to.equal(7);
        });
        it("Subscribing to the signal dispatcher. Fire twice", function () {
            var dispatcher = _e.createSignalDispatcher();
            var resultNr = 0;
            dispatcher.subscribe(function () {
                resultNr += 6;
            });
            dispatcher.dispatch();
            dispatcher.dispatch();
            expect(resultNr, 'resultNr should be 12.').to.equal(12);
        });
        it("Sub to the signal dispatcher. Fire twice", function () {
            var dispatcher = _e.createSignalDispatcher();
            var resultNr = 0;
            dispatcher.sub(function () {
                resultNr += 6;
            });
            dispatcher.dispatch();
            dispatcher.dispatch();
            expect(resultNr, 'resultNr should be 12.').to.equal(12);
        });
        it("One subscription to the signal dispatcher. Fire twice.", function () {
            var dispatcher = _e.createSignalDispatcher();
            var resultNr = 0;
            dispatcher.one(function () {
                resultNr += 2;
            });
            dispatcher.dispatch();
            dispatcher.dispatch();
            expect(resultNr, 'resultNr should be 2.').to.equal(2);
        });
        it("Unsubscribing to the signal dispatcher.", function () {
            var dispatcher = _e.createSignalDispatcher();
            var resultNr = 0;
            var fn = function () {
                resultNr += 2;
            };
            dispatcher.subscribe(fn);
            dispatcher.unsubscribe(fn);
            dispatcher.dispatch();
            expect(resultNr, 'resultNr should be 0.').to.equal(0);
        });
        it("Unsub to the signal dispatcher.", function () {
            var dispatcher = _e.createSignalDispatcher();
            var resultNr = 0;
            var fn = function () {
                resultNr += 2;
            };
            dispatcher.sub(fn);
            dispatcher.unsub(fn);
            dispatcher.dispatch();
            expect(resultNr, 'resultNr should be 0.').to.equal(0);
        });
        it("Unsubscribing from one subscription.", function () {
            var dispatcher = _e.createSignalDispatcher();
            var resultNr = 0;
            var fn = function () {
                resultNr += 2;
            };
            dispatcher.one(fn);
            dispatcher.unsubscribe(fn);
            dispatcher.dispatch();
            expect(resultNr, 'resultNr should be 0.').to.equal(0);
        });
        it("Unsub from one subscription.", function () {
            var dispatcher = _e.createSignalDispatcher();
            var resultNr = 0;
            var fn = function () {
                resultNr += 2;
            };
            dispatcher.one(fn);
            dispatcher.unsub(fn);
            dispatcher.dispatch();
            expect(resultNr, 'resultNr should be 0.').to.equal(0);
        });
        it("Has no event.", function () {
            var fn = function () { };
            var dispatcher = _e.createSignalDispatcher();
            var result = dispatcher.has(fn);
            expect(result, 'Handler should not be present.').to.equal(false);
        });
        it("Has event through subscribe.", function () {
            var fn = function () { };
            var dispatcher = _e.createSignalDispatcher();
            dispatcher.subscribe(fn);
            var result = dispatcher.has(fn);
            expect(result, 'Handler should be present.').to.equal(true);
        });
        it("Has event through one.", function () {
            var fn = function () { };
            var dispatcher = _e.createSignalDispatcher();
            dispatcher.one(fn);
            var result = dispatcher.has(fn);
            expect(result, 'Handler should be present.').to.equal(true);
        });
        it("Test subscribe -> unsubscribe -> has", function () {
            var fn = function () { };
            var dispatcher = _e.createSignalDispatcher();
            dispatcher.subscribe(fn);
            dispatcher.unsubscribe(fn);
            var result = dispatcher.has(fn);
            expect(result, 'Handler should not be present because of unsubscribe.').to.equal(false);
        });
    });
    describe("SignalList", function () {
        it("Subscribe to event name", function () {
            var event = 'myEvent';
            var list = _e.createSignalList();
            var fn = function () { };
            list.get(event).subscribe(fn);
            var result = list.get(event).has(fn);
            expect(result, 'result should be true.').to.equals(true);
        });
        it("Unsubscribe to event name", function () {
            var event = 'myEvent';
            var list = _e.createSignalList();
            var fn = function () { };
            list.get(event).subscribe(fn);
            list.get(event).unsubscribe(fn);
            var result = list.get(event).has(fn);
            expect(result, 'result should be false due to unsubscribe.').to.equals(false);
        });
        it("Test firing two events in one list", function () {
            var list = _e.createSignalList();
            var result;
            var event1 = 'ev1';
            var fn1 = function () { result = 'ev1:' + 8; };
            var event2 = 'ev2';
            var fn2 = function () { result = 'ev2:' + 16; };
            list.get(event1).subscribe(fn1);
            list.get(event2).subscribe(fn2);
            list.get(event2).dispatch();
            expect(result, 'Result should be "ev2:16.').to.equal("ev2:16");
            list.get(event1).dispatch();
            expect(result, 'Result should be "ev1:8.').to.equal("ev1:8");
        });
        it("Test remove from list.", function () {
            var list = _e.createSignalList();
            var fn = function () { };
            var event1 = 'ev1';
            list.get(event1).subscribe(fn);
            var event2 = 'ev2';
            list.get(event2).subscribe(fn);
            var result = list.get(event2).has(fn);
            expect(result, 'Event 2 should be present.').to.equal(true);
            list.remove(event2);
            result = list.get(event1).has(fn);
            expect(result, 'Event 1 should still be present.').to.equal(true);
            result = list.get(event2).has(fn);
            expect(result, 'Event 2 should not be present.').to.equal(false);
        });
    });
});
