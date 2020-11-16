/*!
 * Strongly Typed Events for TypeScript
 * https://github.com/KeesCBakker/StronlyTypedEvents/
 * http://keestalkstech.com
 *
 * Copyright Kees C. Bakker / KeesTalksTech
 * Released under the MIT license
 */
var m = require("strongly-typed-events");
var expose = require("./expose");

expose({
    Subscription: m.Subscription,
    DispatcherBase: m.DispatcherBase,
    DispatcherWrapper: m.DispatcherWrapper,
    EventListBase: m.EventListBase,
    EventManagement: m.EventManagement,
    DispatchError: m.DispatchError,
    PromiseSubscription: m.PromiseSubscription,
    PromiseDispatcherBase: m.PromiseDispatcherBase,
    HandlingBase: m.HandlingBase,
    EventDispatcher: m.EventDispatcher,
    EventHandlingBase: m.EventHandlingBase,
    EventList: m.EventList,
    NonUniformEventList: m.NonUniformEventList,
    SimpleEventDispatcher: m.SimpleEventDispatcher,
    SimpleEventHandlingBase: m.SimpleEventHandlingBase,
    SimpleEventList: m.SimpleEventList,
    NonUniformSimpleEventList: m.NonUniformSimpleEventList,
    SignalDispatcher: m.SignalDispatcher,
    SignalHandlingBase: m.SignalHandlingBase,
    SignalList: m.SignalList,
    PromiseEventDispatcher: m.PromiseEventDispatcher,
    PromiseEventHandlingBase: m.PromiseEventHandlingBase,
    PromiseEventList: m.PromiseEventList,
    NonUniformPromiseEventList: m.NonUniformPromiseEventList,
    PromiseSignalDispatcher: m.PromiseSignalDispatcher,
    PromiseSignalHandlingBase: m.PromiseSignalHandlingBase,
    PromiseSignalList: m.PromiseSignalList,
    PromiseSimpleEventDispatcher: m.PromiseSimpleEventDispatcher,
    PromiseSimpleEventHandlingBase: m.PromiseSimpleEventHandlingBase,
    PromiseSimpleEventList: m.PromiseSimpleEventList,
    NonUniformPromiseSimpleEventList: m.NonUniformPromiseSimpleEventList,
});
