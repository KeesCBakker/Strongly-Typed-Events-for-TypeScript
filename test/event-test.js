'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var strongly_typed_events_1 = require("../strongly-typed-events");
var Dummy = /** @class */ (function () {
    function Dummy(name) {
    }
    return Dummy;
}());
describe("Strongly Typed Events - Event", function () {
    describe("createEventDispatcher", function () {
        it("Subscribing to the event dispatcher", function () {
            var carolus = new Dummy('Carolus');
            var dispatcher = new strongly_typed_events_1.EventDispatcher();
            var resultNr;
            var resultDummy;
            dispatcher.subscribe(function (dummy, nr) {
                resultDummy = dummy;
                resultNr = nr;
            });
            dispatcher.dispatch(carolus, 7);
            chai_1.expect(resultDummy, 'resultDummy should be Carolus').to.equal(carolus);
            chai_1.expect(resultNr, 'resultNr should be 7.').to.equal(7);
        });
        it("Sub to the event dispatcher", function () {
            var carolus = new Dummy('Carolus');
            var dispatcher = new strongly_typed_events_1.EventDispatcher();
            var resultNr;
            var resultDummy;
            dispatcher.sub(function (dummy, nr) {
                resultDummy = dummy;
                resultNr = nr;
            });
            dispatcher.dispatch(carolus, 7);
            chai_1.expect(resultDummy, 'resultDummy should be Carolus').to.equal(carolus);
            chai_1.expect(resultNr, 'resultNr should be 7.').to.equal(7);
        });
        it("Subscribing to the event dispatcher. Fire twice", function () {
            var carolus = new Dummy('Carolus');
            var dispatcher = new strongly_typed_events_1.EventDispatcher();
            var resultNr = 0;
            var resultDummy;
            dispatcher.subscribe(function (dummy, nr) {
                resultDummy = dummy;
                resultNr += nr;
            });
            dispatcher.dispatch(carolus, 7);
            dispatcher.dispatch(carolus, 6);
            chai_1.expect(resultDummy, 'resultDummy should be Carolus').to.equal(carolus);
            chai_1.expect(resultNr, 'resultNr should be 13.').to.equal(13);
        });
        it("Sub to the event dispatcher. Fire twice", function () {
            var carolus = new Dummy('Carolus');
            var dispatcher = new strongly_typed_events_1.EventDispatcher();
            var resultNr = 0;
            var resultDummy;
            dispatcher.sub(function (dummy, nr) {
                resultDummy = dummy;
                resultNr += nr;
            });
            dispatcher.dispatch(carolus, 7);
            dispatcher.dispatch(carolus, 6);
            chai_1.expect(resultDummy, 'resultDummy should be Carolus').to.equal(carolus);
            chai_1.expect(resultNr, 'resultNr should be 13.').to.equal(13);
        });
        it("One subscription to the event dispatcher. Fire twice.", function () {
            var carolus = new Dummy('Carolus');
            var dispatcher = new strongly_typed_events_1.EventDispatcher();
            var resultNr = 0;
            var resultDummy;
            dispatcher.one(function (dummy, nr) {
                resultDummy = dummy;
                resultNr += nr;
            });
            dispatcher.dispatch(carolus, 7);
            dispatcher.dispatch(carolus, 6);
            chai_1.expect(resultDummy, 'resultDummy should be Carolus').to.equal(carolus);
            chai_1.expect(resultNr, 'resultNr should be 7.').to.equal(7);
        });
        it("Unsubscribing from the event dispatcher.", function () {
            var carolus = new Dummy('Carolus');
            var dispatcher = new strongly_typed_events_1.EventDispatcher();
            var resultNr = 0;
            var resultDummy = null;
            var fn = function (dummy, nr) {
                resultDummy = dummy;
                resultNr += nr;
            };
            dispatcher.sub(fn);
            dispatcher.unsub(fn);
            dispatcher.dispatch(carolus, 6);
            chai_1.expect(resultDummy, 'resultDummy should be empty.').to.equal(null);
            chai_1.expect(resultNr, 'resultNr should be 0.').to.equal(0);
        });
        it("Unsub from the event dispatcher.", function () {
            var carolus = new Dummy('Carolus');
            var dispatcher = new strongly_typed_events_1.EventDispatcher();
            var resultNr = 0;
            var resultDummy = null;
            var fn = function (dummy, nr) {
                resultDummy = dummy;
                resultNr += nr;
            };
            dispatcher.sub(fn);
            dispatcher.unsub(fn);
            dispatcher.dispatch(carolus, 6);
            chai_1.expect(resultDummy, 'resultDummy should be empty.').to.equal(null);
            chai_1.expect(resultNr, 'resultNr should be 0.').to.equal(0);
        });
        it("Unsubscribing from event dispatcher using subscribe's return function.", function () {
            var carolus = new Dummy('Carolus');
            var dispatcher = new strongly_typed_events_1.EventDispatcher();
            var resultNr = 0;
            var resultDummy = null;
            var unsub = dispatcher.subscribe(function (dummy, nr) {
                resultDummy = dummy;
                resultNr += nr;
            });
            unsub();
            dispatcher.dispatch(carolus, 6);
            chai_1.expect(resultDummy, 'resultDummy should be empty.').to.equal(null);
            chai_1.expect(resultNr, 'resultNr should be 0.').to.equal(0);
        });
        it("Unsubscribing from event dispatcher using sub's return function.", function () {
            var carolus = new Dummy('Carolus');
            var dispatcher = new strongly_typed_events_1.EventDispatcher();
            var resultNr = 0;
            var resultDummy = null;
            var unsub = dispatcher.sub(function (dummy, nr) {
                resultDummy = dummy;
                resultNr += nr;
            });
            unsub();
            dispatcher.dispatch(carolus, 6);
            chai_1.expect(resultDummy, 'resultDummy should be empty.').to.equal(null);
            chai_1.expect(resultNr, 'resultNr should be 0.').to.equal(0);
        });
        it("Unsubscribing to a one subscription.", function () {
            var carolus = new Dummy('Carolus');
            var dispatcher = new strongly_typed_events_1.EventDispatcher();
            var resultNr = 0;
            var resultDummy = null;
            var fn = function (dummy, nr) {
                resultDummy = dummy;
                resultNr += nr;
            };
            dispatcher.one(fn);
            dispatcher.unsubscribe(fn);
            dispatcher.dispatch(carolus, 6);
            chai_1.expect(resultDummy, 'resultDummy should be empty.').to.equal(null);
            chai_1.expect(resultNr, 'resultNr should be 0.').to.equal(0);
        });
        it("Unsubscribing from event dispatcher using one's return function.", function () {
            var carolus = new Dummy('Carolus');
            var dispatcher = new strongly_typed_events_1.EventDispatcher();
            var resultNr = 0;
            var resultDummy = null;
            var unsub = dispatcher.one(function (dummy, nr) {
                resultDummy = dummy;
                resultNr += nr;
            });
            unsub();
            dispatcher.dispatch(carolus, 6);
            chai_1.expect(resultDummy, 'resultDummy should be empty.').to.equal(null);
            chai_1.expect(resultNr, 'resultNr should be 0.').to.equal(0);
        });
        it("Has no event.", function () {
            var fn = function (dummy, nr) { };
            var dispatcher = new strongly_typed_events_1.EventDispatcher();
            var result = dispatcher.has(fn);
            chai_1.expect(result, 'Handler should not be present.').to.equal(false);
        });
        it("Has event through subscribe.", function () {
            var fn = function (dummy, nr) { };
            var dispatcher = new strongly_typed_events_1.EventDispatcher();
            dispatcher.subscribe(fn);
            var result = dispatcher.has(fn);
            chai_1.expect(result, 'Handler should be present.').to.equal(true);
        });
        it("Has event through one.", function () {
            var fn = function (dummy, nr) { };
            var dispatcher = new strongly_typed_events_1.EventDispatcher();
            dispatcher.one(fn);
            var result = dispatcher.has(fn);
            chai_1.expect(result, 'Handler should be present.').to.equal(true);
        });
        it("Test subscribe -> unsubscribe -> has", function () {
            var fn = function (dummy, nr) { };
            var dispatcher = new strongly_typed_events_1.EventDispatcher();
            dispatcher.subscribe(fn);
            dispatcher.unsubscribe(fn);
            var result = dispatcher.has(fn);
            chai_1.expect(result, 'Handler should not be present because of unsubscribe.').to.equal(false);
        });
        it("Clear subscriptions.", function () {
            var carolus = new Dummy('Carolus');
            var willem = new Dummy('Willem');
            var dispatcher = new strongly_typed_events_1.EventDispatcher();
            var resultNr = 0;
            var resultDummy = willem;
            dispatcher.subscribe(function (dummy, nr) {
                resultDummy = dummy;
                resultNr = nr;
            });
            dispatcher.clear();
            dispatcher.dispatch(carolus, 7);
            chai_1.expect(resultDummy, 'resultDummy should be Willem').to.equal(willem);
            chai_1.expect(resultNr, 'resultNr should be 0.').to.equal(0);
        });
    });
    describe("EventList", function () {
        it("Subscribe to event name", function () {
            var event = 'myEvent';
            var list = new strongly_typed_events_1.EventList();
            var fn = function (dummy, nr) { };
            list.get(event).subscribe(fn);
            var result = list.get(event).has(fn);
            chai_1.expect(result, 'result should be true.').to.equals(true);
        });
        it("Unsubscribe to event name", function () {
            var event = 'myEvent';
            var list = new strongly_typed_events_1.EventList();
            var fn = function (dummy, nr) { };
            list.get(event).subscribe(fn);
            list.get(event).unsubscribe(fn);
            var result = list.get(event).has(fn);
            chai_1.expect(result, 'result should be false due to unsubscribe.').to.equals(false);
        });
        it("Test firing two events in one list", function () {
            var list = new strongly_typed_events_1.EventList();
            var result;
            var event1 = 'ev1';
            var fn1 = function (dummy, nr) { result = 'ev1:' + nr; };
            var event2 = 'ev2';
            var fn2 = function (dummy, nr) { result = 'ev2:' + nr; };
            list.get(event1).subscribe(fn1);
            list.get(event2).subscribe(fn2);
            list.get(event2).dispatch(null, 16);
            chai_1.expect(result, 'Result should be "ev2:16.').to.equal("ev2:16");
            list.get(event1).dispatch(null, 8);
            chai_1.expect(result, 'Result should be "ev1:8.').to.equal("ev1:8");
        });
        it("Test remove from list.", function () {
            var list = new strongly_typed_events_1.EventList();
            var fn = function (dummy, nr) { };
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
