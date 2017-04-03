/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
/// <reference path="../strongly-typed-events.ts" />

'use strict';

var r = typeof require !== 'undefined';
var expect: Chai.ExpectStatic = r ? require('chai').expect : (window as any).chai.expect;

import {
    SignalDispatcher,
    SignalList
} from '../strongly-typed-events'


describe("Strongly Typed Events - Signal", function () {

    describe("createSignalDispatcher", function () {

        it("Subscribing to the signal dispatcher", function () {

            let dispatcher = new SignalDispatcher();
            let resultNr: number;

            dispatcher.subscribe(() => {
                resultNr = 7;
            });

            dispatcher.dispatch();

            expect(resultNr, 'resultNr should be 7.').to.equal(7);
        });

        it("Sub to the signal dispatcher", function () {

            let dispatcher = new SignalDispatcher();
            let resultNr: number;

            dispatcher.sub(() => {
                resultNr = 7;
            });

            dispatcher.dispatch();

            expect(resultNr, 'resultNr should be 7.').to.equal(7);
        });


        it("Subscribing to the signal dispatcher. Fire twice", function () {

            let dispatcher = new SignalDispatcher();
            let resultNr = 0;

            dispatcher.subscribe(() => {
                resultNr += 6;
            });

            dispatcher.dispatch();
            dispatcher.dispatch();

            expect(resultNr, 'resultNr should be 12.').to.equal(12);
        });

        it("Sub to the signal dispatcher. Fire twice", function () {

            let dispatcher = new SignalDispatcher();
            let resultNr = 0;

            dispatcher.sub(() => {
                resultNr += 6;
            });

            dispatcher.dispatch();
            dispatcher.dispatch();

            expect(resultNr, 'resultNr should be 12.').to.equal(12);
        });

        it("One subscription to the signal dispatcher. Fire twice.", function () {

            let dispatcher = new SignalDispatcher();
            let resultNr = 0;

            dispatcher.one(() => {
                resultNr += 2;
            });

            dispatcher.dispatch();
            dispatcher.dispatch();

            expect(resultNr, 'resultNr should be 2.').to.equal(2);
        });

        it("Unsubscribing to the signal dispatcher.", function () {

            let dispatcher = new SignalDispatcher();
            let resultNr = 0;

            var fn = () => {
                resultNr += 2;
            };

            dispatcher.subscribe(fn);
            dispatcher.unsubscribe(fn);
            dispatcher.dispatch();

            expect(resultNr, 'resultNr should be 0.').to.equal(0);
        });

        it("Unsub to the signal dispatcher.", function () {

            let dispatcher = new SignalDispatcher();
            let resultNr = 0;

            var fn = () => {
                resultNr += 2;
            };

            dispatcher.sub(fn);
            dispatcher.unsub(fn);
            dispatcher.dispatch();

            expect(resultNr, 'resultNr should be 0.').to.equal(0);
        });


        it("Unsubscribing from one subscription.", function () {

            let dispatcher = new SignalDispatcher();
            let resultNr = 0;

            var fn = () => {
                resultNr += 2;
            };

            dispatcher.one(fn);
            dispatcher.unsubscribe(fn);
            dispatcher.dispatch();

            expect(resultNr, 'resultNr should be 0.').to.equal(0);
        });


        it("Unsub from one subscription.", function () {

            let dispatcher = new SignalDispatcher();
            let resultNr = 0;

            var fn = () => {
                resultNr += 2;
            };

            dispatcher.one(fn);
            dispatcher.unsub(fn);
            dispatcher.dispatch();

            expect(resultNr, 'resultNr should be 0.').to.equal(0);
        });

        it("Has no event.", function () {
            var fn = () => { };
            let dispatcher = new SignalDispatcher();
            let result = dispatcher.has(fn);
            expect(result, 'Handler should not be present.').to.equal(false);
        });

        it("Has event through subscribe.", function () {
            var fn = () => { };
            let dispatcher = new SignalDispatcher();
            dispatcher.subscribe(fn);
            let result = dispatcher.has(fn);
            expect(result, 'Handler should be present.').to.equal(true);
        });

        it("Has event through one.", function () {
            var fn = () => { };
            let dispatcher = new SignalDispatcher();
            dispatcher.one(fn);
            let result = dispatcher.has(fn);
            expect(result, 'Handler should be present.').to.equal(true);
        });

        it("Test subscribe -> unsubscribe -> has", function () {
            var fn = () => { };
            let dispatcher = new SignalDispatcher();
            dispatcher.subscribe(fn);
            dispatcher.unsubscribe(fn);
            let result = dispatcher.has(fn);
            expect(result, 'Handler should not be present because of unsubscribe.').to.equal(false);
        });

        it("Clear subscriptions.", function () {

            let dispatcher = new SignalDispatcher();
            let resultNr = 0;

            dispatcher.subscribe(() => {
                resultNr = 7;
            });

            dispatcher.clear();
            dispatcher.dispatch();

            expect(resultNr, 'resultNr should be 0.').to.equal(0);
        });

    });

    describe("SignalList", function () {

        it("Subscribe to event name", function () {
            let event = 'myEvent';
            let list = new SignalList();
            var fn = () => { };

            list.get(event).subscribe(fn);
            var result = list.get(event).has(fn);
            expect(result, 'result should be true.').to.equals(true);
        });

        it("Unsubscribe to event name", function () {
            let event = 'myEvent';
            let list = new SignalList();
            var fn = () => { };

            list.get(event).subscribe(fn);
            list.get(event).unsubscribe(fn);

            var result = list.get(event).has(fn);
            expect(result, 'result should be false due to unsubscribe.').to.equals(false);
        });

        it("Test firing two events in one list", function () {

            let list = new SignalList();
            let result: string;

            let event1 = 'ev1';
            var fn1 = () => { result = 'ev1:' + 8 };

            let event2 = 'ev2';
            var fn2 = () => { result = 'ev2:' + 16 };

            list.get(event1).subscribe(fn1);
            list.get(event2).subscribe(fn2);

            list.get(event2).dispatch();
            expect(result, 'Result should be "ev2:16.').to.equal("ev2:16");

            list.get(event1).dispatch();
            expect(result, 'Result should be "ev1:8.').to.equal("ev1:8");
        });

        it("Test remove from list.", function () {

            let list = new SignalList();
            var fn = () => { };

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