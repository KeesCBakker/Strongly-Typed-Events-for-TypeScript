/*!
 * Strongly Typed Events for TypeScript
 * https://github.com/KeesCBakker/StronlyTypedEvents/
 * http://keestalkstech.com
 *
 * Copyright Kees C. Bakker / KeesTalksTech
 * Released under the MIT license
 */
var m = require("ste-events");
var expose = require("./expose"); 

expose({
    EventDispatcher: m.EventDispatcher,
    EventHandlingBase: m.EventHandlingBase,
    EventList: m.EventList
});