/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
/// <reference path="../strongly-typed-events.ts" />

'use strict';

var r = typeof require !== 'undefined';
var expect: Chai.ExpectStatic = r ? require('chai').expect : (window as any).chai.expect;

import {
    EventDispatcher,
    EventList
} from '../strongly-typed-events'


class Dummy {
    constructor(name: string) { }
}

describe("Strongly Typed Events - Event", function () {

    describe("createEventDispatcher", function () {

        it("Subscribing to the event dispatcher", function () {

            var carolus = new Dummy('Carolus');

            let dispatcher = new EventDispatcher<Dummy, number>();
            let resultNr: number;
            let resultDummy: Dummy;

            dispatcher.subscribe((dummy, nr) => {
                resultDummy = dummy;
                resultNr = nr;
            });

            dispatcher.dispatch(carolus, 7);

            expect(resultDummy, 'resultDummy should be Carolus').to.equal(carolus);
            expect(resultNr, 'resultNr should be 7.').to.equal(7);
        });

        it("Sub to the event dispatcher", function () {

            var carolus = new Dummy('Carolus');

            let dispatcher = new EventDispatcher<Dummy, number>();
            let resultNr: number;
            let resultDummy: Dummy;

            dispatcher.sub((dummy, nr) => {
                resultDummy = dummy;
                resultNr = nr;
            });

            dispatcher.dispatch(carolus, 7);

            expect(resultDummy, 'resultDummy should be Carolus').to.equal(carolus);
            expect(resultNr, 'resultNr should be 7.').to.equal(7);
        });


        it("Subscribing to the event dispatcher. Fire twice", function () {

            var carolus = new Dummy('Carolus');

            let dispatcher = new EventDispatcher<Dummy, number>();
            let resultNr = 0;
            let resultDummy: Dummy;

            dispatcher.subscribe((dummy, nr) => {
                resultDummy = dummy;
                resultNr += nr;
            });

            dispatcher.dispatch(carolus, 7);
            dispatcher.dispatch(carolus, 6);

            expect(resultDummy, 'resultDummy should be Carolus').to.equal(carolus);
            expect(resultNr, 'resultNr should be 13.').to.equal(13);
        });


        it("Sub to the event dispatcher. Fire twice", function () {

            var carolus = new Dummy('Carolus');

            let dispatcher = new EventDispatcher<Dummy, number>();
            let resultNr = 0;
            let resultDummy: Dummy;

            dispatcher.sub((dummy, nr) => {
                resultDummy = dummy;
                resultNr += nr;
            });

            dispatcher.dispatch(carolus, 7);
            dispatcher.dispatch(carolus, 6);

            expect(resultDummy, 'resultDummy should be Carolus').to.equal(carolus);
            expect(resultNr, 'resultNr should be 13.').to.equal(13);
        });


        it("One subscription to the event dispatcher. Fire twice.", function () {

            var carolus = new Dummy('Carolus');

            let dispatcher = new EventDispatcher<Dummy, number>();
            let resultNr = 0;
            let resultDummy: Dummy;

            dispatcher.one((dummy, nr) => {
                resultDummy = dummy;
                resultNr += nr;
            });

            dispatcher.dispatch(carolus, 7);
            dispatcher.dispatch(carolus, 6);

            expect(resultDummy, 'resultDummy should be Carolus').to.equal(carolus);
            expect(resultNr, 'resultNr should be 7.').to.equal(7);
        });

        it("Unsubscribing from the event dispatcher.", function () {

            var carolus = new Dummy('Carolus');

            let dispatcher = new EventDispatcher<Dummy, number>();
            let resultNr = 0;
            let resultDummy: Dummy = null;

            var fn = (dummy: Dummy, nr: number) => {
                resultDummy = dummy;
                resultNr += nr;
            };

            dispatcher.sub(fn);
            dispatcher.unsub(fn);
            dispatcher.dispatch(carolus, 6);

            expect(resultDummy, 'resultDummy should be empty.').to.equal(null);
            expect(resultNr, 'resultNr should be 0.').to.equal(0);
            
        });

        it("Unsub from the event dispatcher.", function () {

            var carolus = new Dummy('Carolus');

            let dispatcher = new EventDispatcher<Dummy, number>();
            let resultNr = 0;
            let resultDummy: Dummy = null;

            var fn = (dummy: Dummy, nr: number) => {
                resultDummy = dummy;
                resultNr += nr;
            };

            dispatcher.sub(fn);
            dispatcher.unsub(fn);
            dispatcher.dispatch(carolus, 6);

            expect(resultDummy, 'resultDummy should be empty.').to.equal(null);
            expect(resultNr, 'resultNr should be 0.').to.equal(0);
        });


        it("Unsubscribing to a one subscription.", function () {

            var carolus = new Dummy('Carolus');

            let dispatcher = new EventDispatcher<Dummy, number>();
            let resultNr = 0;
            let resultDummy: Dummy = null;

            var fn = (dummy: Dummy, nr: number) => {
                resultDummy = dummy;
                resultNr += nr;
            };

            dispatcher.one(fn);
            dispatcher.unsubscribe(fn);
            dispatcher.dispatch(carolus, 6);

            expect(resultDummy, 'resultDummy should be empty.').to.equal(null);
            expect(resultNr, 'resultNr should be 0.').to.equal(0);
        });


        it("Has no event.", function () {
            var fn = (dummy: Dummy, nr: number) => { };
            let dispatcher = new EventDispatcher<Dummy, number>();
            let result = dispatcher.has(fn);
            expect(result, 'Handler should not be present.').to.equal(false);
        });

        it("Has event through subscribe.", function () {
            var fn = (dummy: Dummy, nr: number) => { };
            let dispatcher = new EventDispatcher<Dummy, number>();
            dispatcher.subscribe(fn);
            let result = dispatcher.has(fn);
            expect(result, 'Handler should be present.').to.equal(true);
        });

        it("Has event through one.", function () {
            var fn = (dummy: Dummy, nr: number) => { };
            let dispatcher = new EventDispatcher<Dummy, number>();
            dispatcher.one(fn);
            let result = dispatcher.has(fn);
            expect(result, 'Handler should be present.').to.equal(true);
        });

        it("Test subscribe -> unsubscribe -> has", function () {
            var fn = (dummy: Dummy, nr: number) => { };
            let dispatcher = new EventDispatcher<Dummy, number>();
            dispatcher.subscribe(fn);
            dispatcher.unsubscribe(fn);
            let result = dispatcher.has(fn);
            expect(result, 'Handler should not be present because of unsubscribe.').to.equal(false);
        });

        it("Clear subscriptions.", function () {

            var carolus = new Dummy('Carolus');
            var willem = new Dummy('Willem');

            let dispatcher = new EventDispatcher<Dummy, number>();
            let resultNr = 0;
            let resultDummy = willem;

            dispatcher.subscribe((dummy, nr) => {
                resultDummy = dummy;
                resultNr = nr;
            });

            dispatcher.clear();
            dispatcher.dispatch(carolus, 7);

            expect(resultDummy, 'resultDummy should be Willem').to.equal(willem);
            expect(resultNr, 'resultNr should be 0.').to.equal(0);
        });

    });

    describe("EventList", function () {

        it("Subscribe to event name", function () {
            let event = 'myEvent';
            let list = new EventList<Dummy, number>();
            var fn = (dummy: Dummy, nr: number) => { };

            list.get(event).subscribe(fn);
            var result = list.get(event).has(fn);
            expect(result, 'result should be true.').to.equals(true);
        });

        it("Unsubscribe to event name", function () {
            let event = 'myEvent';
            let list = new EventList<Dummy, number>();
            var fn = (dummy: Dummy, nr: number) => { };

            list.get(event).subscribe(fn);
            list.get(event).unsubscribe(fn);

            var result = list.get(event).has(fn);
            expect(result, 'result should be false due to unsubscribe.').to.equals(false);
        });

        it("Test firing two events in one list", function () {

            let list = new EventList<Dummy, number>();
            let result: string;

            let event1 = 'ev1';
            var fn1 = (dummy: Dummy, nr: number) => { result = 'ev1:' + nr };

            let event2 = 'ev2';
            var fn2 = (dummy: Dummy, nr: number) => { result = 'ev2:' + nr };

            list.get(event1).subscribe(fn1);
            list.get(event2).subscribe(fn2);

            list.get(event2).dispatch(null, 16);
            expect(result, 'Result should be "ev2:16.').to.equal("ev2:16");

            list.get(event1).dispatch(null, 8);
            expect(result, 'Result should be "ev1:8.').to.equal("ev1:8");
        });

        it("Test remove from list.", function () {

            let list = new EventList<Dummy, number>();
            var fn = (dummy: Dummy, nr: number) => { };

            let event1 = 'ev1';
            list.get(event1).subscribe(fn);

            let event2 = 'ev2';
            list.get(event2).subscribe(fn);

            let result = list.get(event2).has(fn);
            expect(result, 'Event 2 should be present.').to.equal(true);

            list.remove(event2);

            result = list.get(event1).has(fn);
            expect(result, 'Event 1 should still be present.').to.equal(true);

            result = list.get(event2).has(fn);
            expect(result, 'Event 2 should not be present.').to.equal(false);
        });
    });
});