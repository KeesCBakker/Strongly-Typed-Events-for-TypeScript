/*!
 * Strongly Typed Events for TypeScript
 * https://github.com/KeesCBakker/StronlyTypedEvents/
 * http://keestalkstech.com
 *
 * Copyright Kees C. Bakker / KeesTalksTech
 * Released under the MIT license
 */
var m = require("ste-signals");
var expose = require("./expose");

expose({
    SignalDispatcher: m.SignalDispatcher,
    SignalHandlingBase: m.SignalHandlingBase,
    SignalList: m.SignalList
});