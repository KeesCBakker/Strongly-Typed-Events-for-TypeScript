'use strict';
var chai_1 = require("chai");
var strongly_typed_events_1 = require("../strongly-typed-events");
describe("Strongly Typed Events - Simple event", function () {
    describe("createSimpleEventDispatcher", function () {
        it("Subscribing to the simple event dispatcher", function () {
            var dispatcher = strongly_typed_events_1.default.createSimpleEventDispatcher();
            var resultNr;
            dispatcher.subscribe(function (nr) {
                resultNr = nr;
            });
            dispatcher.dispatch(7);
            chai_1.expect(resultNr, 'resultNr should be 7.').to.equal(7);
        });
        it("Sub to the simple event dispatcher", function () {
            var dispatcher = strongly_typed_events_1.default.createSimpleEventDispatcher();
            var resultNr;
            dispatcher.sub(function (nr) {
                resultNr = nr;
            });
            dispatcher.dispatch(7);
            chai_1.expect(resultNr, 'resultNr should be 7.').to.equal(7);
        });
        it("Subscribing to the simple event dispatcher. Fire twice", function () {
            var dispatcher = strongly_typed_events_1.default.createSimpleEventDispatcher();
            var resultNr = 0;
            dispatcher.subscribe(function (nr) {
                resultNr += nr;
            });
            dispatcher.dispatch(7);
            dispatcher.dispatch(6);
            chai_1.expect(resultNr, 'resultNr should be 13.').to.equal(13);
        });
        it("Sub to the simple event dispatcher. Fire twice", function () {
            var dispatcher = strongly_typed_events_1.default.createSimpleEventDispatcher();
            var resultNr = 0;
            dispatcher.sub(function (nr) {
                resultNr += nr;
            });
            dispatcher.dispatch(7);
            dispatcher.dispatch(6);
            chai_1.expect(resultNr, 'resultNr should be 13.').to.equal(13);
        });
        it("One subscription to the simple event dispatcher. Fire twice.", function () {
            var dispatcher = strongly_typed_events_1.default.createSimpleEventDispatcher();
            var resultNr = 0;
            dispatcher.one(function (nr) {
                resultNr += nr;
            });
            dispatcher.dispatch(7);
            dispatcher.dispatch(6);
            chai_1.expect(resultNr, 'resultNr should be 7.').to.equal(7);
        });
        it("Unsubscribing to the simple event dispatcher.", function () {
            var dispatcher = strongly_typed_events_1.default.createSimpleEventDispatcher();
            var resultNr = 0;
            var fn = function (nr) {
                resultNr += nr;
            };
            dispatcher.sub(fn);
            dispatcher.unsub(fn);
            dispatcher.dispatch(6);
            chai_1.expect(resultNr, 'resultNr should be 0.').to.equal(0);
        });
        it("Unsub to the simple event dispatcher.", function () {
            var dispatcher = strongly_typed_events_1.default.createSimpleEventDispatcher();
            var resultNr = 0;
            var fn = function (nr) {
                resultNr += nr;
            };
            dispatcher.sub(fn);
            dispatcher.unsub(fn);
            dispatcher.dispatch(6);
            chai_1.expect(resultNr, 'resultNr should be 0.').to.equal(0);
        });
        it("Unsubscribing to a one subscription.", function () {
            var dispatcher = strongly_typed_events_1.default.createSimpleEventDispatcher();
            var resultNr = 0;
            var fn = function (nr) {
                resultNr += nr;
            };
            dispatcher.one(fn);
            dispatcher.unsubscribe(fn);
            dispatcher.dispatch(6);
            chai_1.expect(resultNr, 'resultNr should be 0.').to.equal(0);
        });
        it("Unsub from one subscription.", function () {
            var dispatcher = strongly_typed_events_1.default.createSimpleEventDispatcher();
            var resultNr = 0;
            var fn = function (nr) {
                resultNr += nr;
            };
            dispatcher.one(fn);
            dispatcher.unsub(fn);
            dispatcher.dispatch(6);
            chai_1.expect(resultNr, 'resultNr should be 0.').to.equal(0);
        });
        it("Has no event.", function () {
            var fn = function (nr) { };
            var dispatcher = strongly_typed_events_1.default.createSimpleEventDispatcher();
            var result = dispatcher.has(fn);
            chai_1.expect(result, 'Handler should not be present.').to.equal(false);
        });
        it("Has event through subscribe.", function () {
            var fn = function (nr) { };
            var dispatcher = strongly_typed_events_1.default.createSimpleEventDispatcher();
            dispatcher.subscribe(fn);
            var result = dispatcher.has(fn);
            chai_1.expect(result, 'Handler should be present.').to.equal(true);
        });
        it("Has event through one.", function () {
            var fn = function (nr) { };
            var dispatcher = strongly_typed_events_1.default.createSimpleEventDispatcher();
            dispatcher.one(fn);
            var result = dispatcher.has(fn);
            chai_1.expect(result, 'Handler should be present.').to.equal(true);
        });
        it("Test subscribe -> unsubscribe -> has", function () {
            var fn = function (nr) { };
            var dispatcher = strongly_typed_events_1.default.createSimpleEventDispatcher();
            dispatcher.subscribe(fn);
            dispatcher.unsubscribe(fn);
            var result = dispatcher.has(fn);
            chai_1.expect(result, 'Handler should not be present because of unsubscribe.').to.equal(false);
        });
        it("Clear subscriptions.", function () {
            var dispatcher = strongly_typed_events_1.default.createSimpleEventDispatcher();
            var resultNr = 0;
            dispatcher.subscribe(function (nr) {
                resultNr = nr;
            });
            dispatcher.clear();
            dispatcher.dispatch(7);
            chai_1.expect(resultNr, 'resultNr should be 0.').to.equal(0);
        });
    });
    describe("SimpleEventList", function () {
        it("Subscribe to event name", function () {
            var event = 'myEvent';
            var list = strongly_typed_events_1.default.createSimpleEventList();
            var fn = function (nr) { };
            list.get(event).subscribe(fn);
            var result = list.get(event).has(fn);
            chai_1.expect(result, 'result should be true.').to.equals(true);
        });
        it("Unsubscribe to event name", function () {
            var event = 'myEvent';
            var list = strongly_typed_events_1.default.createSimpleEventList();
            var fn = function (nr) { };
            list.get(event).subscribe(fn);
            list.get(event).unsubscribe(fn);
            var result = list.get(event).has(fn);
            chai_1.expect(result, 'result should be false due to unsubscribe.').to.equals(false);
        });
        it("Test firing two events in one list", function () {
            var list = strongly_typed_events_1.default.createSimpleEventList();
            var result;
            var event1 = 'ev1';
            var fn1 = function (nr) { result = 'ev1:' + nr; };
            var event2 = 'ev2';
            var fn2 = function (nr) { result = 'ev2:' + nr; };
            list.get(event1).subscribe(fn1);
            list.get(event2).subscribe(fn2);
            list.get(event2).dispatch(16);
            chai_1.expect(result, 'Result should be "ev2:16.').to.equal("ev2:16");
            list.get(event1).dispatch(8);
            chai_1.expect(result, 'Result should be "ev1:8.').to.equal("ev1:8");
        });
        it("Test remove from list.", function () {
            var list = strongly_typed_events_1.default.createSimpleEventList();
            var fn = function (nr) { };
            var event1 = 'ev1';
            list.get(event1).subscribe(fn);
            var event2 = 'ev2';
            list.get(event2).subscribe(fn);
            var result = list.get(event2).has(fn);
            chai_1.expect(result, 'Event 2 should be present.').to.equal(true);
            list.remove(event2);
            result = list.get(event1).has(fn);
            chai_1.expect(result, 'Event 1 should still be present.').to.equal(true);
            result = list.get(event2).has(fn);
            chai_1.expect(result, 'Event 2 should not be present.').to.equal(false);
        });
    });
});
