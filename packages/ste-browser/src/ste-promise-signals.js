/*!
 * Strongly Typed Events for TypeScript
 * https://github.com/KeesCBakker/StronlyTypedEvents/
 * http://keestalkstech.com
 *
 * Copyright Kees C. Bakker / KeesTalksTech
 * Released under the MIT license
 */

var c = require("ste-core");
var m = require("ste-promise-signals");

var expose = require("./expose");

expose({

    DispatcherBase: c.DispatcherBase,
    PromiseDispatcherBase: c.PromiseDispatcherBase,
    DispatcherWrapper: c.DispatcherWrapper,
    EventListBase: c.EventListBase,
    Subscription: c.Subscription,

    PromiseSignalDispatcher: m.PromiseSignalDispatcher,
    PromiseSignalHandlingBase: m.PromiseSignalHandlingBase,
    PromiseSignalList: m.PromiseSignalList
});