/*!
 * Strongly Typed Events for TypeScript
 * https://github.com/KeesCBakker/StronlyTypedEvents/
 * http://keestalkstech.com
 *
 * Copyright Kees C. Bakker / KeesTalksTech
 * Released under the MIT license
 */

var c = require("ste-core");
var m = require("ste-promise-simple-events");

var expose = require("./expose");

expose({

    DispatcherBase: c.DispatcherBase,
    PromiseDispatcherBase: c.PromiseDispatcherBase,
    DispatcherWrapper: c.DispatcherWrapper,
    EventListBase: c.EventListBase,
    Subscription: c.Subscription,

    PromiseSimpleEventDispatcher: m.PromiseSimpleEventDispatcher,
    PromiseSimpleEventHandlingBase: m.PromiseSimpleEventHandlingBase,
    PromiseSimpleEventList: m.PromiseSimpleEventList
});