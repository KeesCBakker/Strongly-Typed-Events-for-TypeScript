/*!
 * Strongly Typed Events for TypeScript
 * https://github.com/KeesCBakker/StronlyTypedEvents/
 * http://keestalkstech.com
 *
 * Copyright Kees C. Bakker / KeesTalksTech
 * Released under the MIT license
 */
var m = require("ste-simple-events");
var expose = require("./expose");

expose({
    SimpleEventDispatcher: m.SimpleEventDispatcher,
    SimpleEventHandlingBase: m.SimpleEventHandlingBase,
    SimpleEventList: m.SimpleEventList
});