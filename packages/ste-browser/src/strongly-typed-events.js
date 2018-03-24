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
    DispatcherBase: m.DispatcherBase,
    DispatcherWrapper: m.DispatcherWrapper,
    EventListBase: m.EventListBase,
    Subscription: m.Subscription,
    EventDispatcher: m.EventDispatcher,
    EventHandlingBase: m.EventHandlingBase,
    EventList: m.EventList,
    SignalDispatcher: m.SignalDispatcher,
    SignalHandlingBase: m.SignalHandlingBase,
    SignalList: m.SignalList,
    SimpleEventDispatcher: m.SimpleEventDispatcher,
    SimpleEventHandlingBase: m.SimpleEventHandlingBase,
    SimpleEventList: m.SimpleEventList
});