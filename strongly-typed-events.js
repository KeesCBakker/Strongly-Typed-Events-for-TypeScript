/// <reference path="typings/node/node.d.ts" />
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*!
 * Strongly Typed Events for TypeScript - 0.5.0
 * https://github.com/KeesCBakker/StronlyTypedEvents/
 * http://keestalkstech.com
 *
 * Copyright Kees C. Bakker / KeesTalksTech
 * Released under the MIT license
 */
/* small bridge to web JS */
(function (w) {
    if (!w) {
        return;
    }
    w.exports = w.exports || {};
    w.require = w.require || function (src) {
        return w[src] || w.exports;
    };
}(window));
/**
 * Base class for implementation of the dispatcher. It facilitates the subscribe
 * and unsubscribe methods based on generic handlers. The TEventType specifies
 * the type of event that should be exposed. Use the asEvent to expose the
 * dispatcher as event.
 */
"use strict";
/**
 * Stores a handler. Manages execution meta data.
 * @class Subscription
 * @template TEventHandler
 */
var Subscription = (function () {
    /**
     * Creates an instance of Subscription.
     *
     * @param {TEventHandler} handler The handler for the subscription.
     * @param {boolean} isOnce Indicates if the handler should only be executed` once.
     */
    function Subscription(handler, isOnce) {
        this.handler = handler;
        this.isOnce = isOnce;
        /**
         * Indicates if the subscription has been executed before.
         */
        this.isExecuted = false;
    }
    /**
     * Executes the handler.
     *
     * @param {boolean} executeAsync True if the even should be executed async.
     * @param {*} The scope the scope of the event.
     * @param {IArguments} args The arguments for the event.
     */
    Subscription.prototype.execute = function (executeAsync, scope, args) {
        if (!this.isOnce || !this.isExecuted) {
            this.isExecuted = true;
            var fn = this.handler;
            if (executeAsync) {
                setTimeout(function () {
                    fn.apply(scope, args);
                }, 1);
            }
            else {
                fn.apply(scope, args);
            }
        }
    };
    return Subscription;
}());
exports.Subscription = Subscription;
var DispatcherBase = (function () {
    function DispatcherBase() {
        this._wrap = new DispatcherWrapper(this);
        this._subscriptions = new Array();
    }
    /**
     * Subscribe to the event dispatcher.
     * @param fn The event handler that is called when the event is dispatched.
     */
    DispatcherBase.prototype.subscribe = function (fn) {
        if (fn) {
            this._subscriptions.push(new Subscription(fn, false));
        }
    };
    /**
     * Subscribe to the event dispatcher.
     * @param fn The event handler that is called when the event is dispatched.
     */
    DispatcherBase.prototype.sub = function (fn) {
        this.subscribe(fn);
    };
    /**
     * Subscribe once to the event with the specified name.
     * @param fn The event handler that is called when the event is dispatched.
     */
    DispatcherBase.prototype.one = function (fn) {
        if (fn) {
            this._subscriptions.push(new Subscription(fn, true));
        }
    };
    /**
     * Checks it the event has a subscription for the specified handler.
     * @param fn The event handler.
     */
    DispatcherBase.prototype.has = function (fn) {
        if (fn) {
            for (var _i = 0, _a = this._subscriptions; _i < _a.length; _i++) {
                var sub = _a[_i];
                if (sub.handler == fn) {
                    return true;
                }
            }
        }
        return false;
    };
    /**
     * Unsubscribes the handler from the dispatcher.
     * @param fn The event handler.
     */
    DispatcherBase.prototype.unsubscribe = function (fn) {
        if (fn) {
            for (var i = 0; i < this._subscriptions.length; i++) {
                var sub = this._subscriptions[i];
                if (sub.handler == fn) {
                    this._subscriptions.splice(i, 1);
                    break;
                }
            }
        }
    };
    /**
     * Unsubscribes the handler from the dispatcher.
     * @param fn The event handler.
     */
    DispatcherBase.prototype.unsub = function (fn) {
        this.unsubscribe(fn);
    };
    /**
     * Generic dispatch will dispatch the handlers with the given arguments.
     *
     * @protected
     * @param {boolean} executeAsync True if the even should be executed async.
     * @param {*} The scope the scope of the event.
     * @param {IArguments} args The arguments for the event.
     */
    DispatcherBase.prototype._dispatch = function (executeAsync, scope, args) {
        for (var i = 0; i < this._subscriptions.length; i++) {
            var sub = this._subscriptions[i];
            if (sub.isOnce) {
                if (sub.isExecuted === true) {
                    continue;
                }
                this._subscriptions.splice(i, 1);
                i--;
            }
            sub.execute(executeAsync, scope, args);
        }
    };
    /**
     * Creates an event from the dispatcher. Will return the dispatcher
     * in a wrapper. This will prevent exposure of any dispatcher methods.
     */
    DispatcherBase.prototype.asEvent = function () {
        return this._wrap;
    };
    /**
     * Clears all the subscriptions.
     */
    DispatcherBase.prototype.clear = function () {
        this._subscriptions.splice(0, this._subscriptions.length);
    };
    return DispatcherBase;
}());
exports.DispatcherBase = DispatcherBase;
/**
 * Dispatcher implementation for events. Can be used to subscribe, unsubscribe
 * or dispatch events. Use the ToEvent() method to expose the event.
 */
var EventDispatcher = (function (_super) {
    __extends(EventDispatcher, _super);
    /**
     * Creates a new EventDispatcher instance.
     */
    function EventDispatcher() {
        return _super.call(this) || this;
    }
    /**
     * Dispatches the event.
     * @param sender The sender.
     * @param args The arguments object.
     */
    EventDispatcher.prototype.dispatch = function (sender, args) {
        this._dispatch(false, this, arguments);
    };
    /**
     * Dispatches the events thread.
     * @param sender The sender.
     * @param args The arguments object.
     */
    EventDispatcher.prototype.dispatchAsync = function (sender, args) {
        this._dispatch(true, this, arguments);
    };
    return EventDispatcher;
}(DispatcherBase));
exports.EventDispatcher = EventDispatcher;
/**
 * The dispatcher handles the storage of subsciptions and facilitates
 * subscription, unsubscription and dispatching of a simple event
 */
var SimpleEventDispatcher = (function (_super) {
    __extends(SimpleEventDispatcher, _super);
    /**
     * Creates a new SimpleEventDispatcher instance.
     */
    function SimpleEventDispatcher() {
        return _super.call(this) || this;
    }
    /**
     * Dispatches the event.
     * @param args The arguments object.
     */
    SimpleEventDispatcher.prototype.dispatch = function (args) {
        this._dispatch(false, this, arguments);
    };
    /**
     * Dispatches the events thread.
     * @param args The arguments object.
     */
    SimpleEventDispatcher.prototype.dispatchAsync = function (args) {
        this._dispatch(true, this, arguments);
    };
    return SimpleEventDispatcher;
}(DispatcherBase));
exports.SimpleEventDispatcher = SimpleEventDispatcher;
/**
 * The dispatcher handles the storage of subsciptions and facilitates
 * subscription, unsubscription and dispatching of a signal event.
 */
var SignalDispatcher = (function (_super) {
    __extends(SignalDispatcher, _super);
    /**
     * Creates a new SignalDispatcher instance.
     */
    function SignalDispatcher() {
        return _super.call(this) || this;
    }
    /**
     * Dispatches the signal.
     */
    SignalDispatcher.prototype.dispatch = function () {
        this._dispatch(false, this, arguments);
    };
    /**
     * Dispatches the signal threaded.
     */
    SignalDispatcher.prototype.dispatchAsync = function () {
        this._dispatch(true, this, arguments);
    };
    return SignalDispatcher;
}(DispatcherBase));
exports.SignalDispatcher = SignalDispatcher;
/**
 * Hides the implementation of the event dispatcher. Will expose methods that
 * are relevent to the event.
 */
var DispatcherWrapper = (function () {
    /**
     * Creates a new EventDispatcherWrapper instance.
     * @param dispatcher The dispatcher.
     */
    function DispatcherWrapper(dispatcher) {
        this._subscribe = function (fn) { return dispatcher.subscribe(fn); };
        this._unsubscribe = function (fn) { return dispatcher.unsubscribe(fn); };
        this._one = function (fn) { return dispatcher.one(fn); };
        this._has = function (fn) { return dispatcher.has(fn); };
        this._clear = function () { return dispatcher.clear(); };
    }
    /**
     * Subscribe to the event dispatcher.
     * @param fn The event handler that is called when the event is dispatched.
     */
    DispatcherWrapper.prototype.subscribe = function (fn) {
        this._subscribe(fn);
    };
    /**
     * Subscribe to the event dispatcher.
     * @param fn The event handler that is called when the event is dispatched.
     */
    DispatcherWrapper.prototype.sub = function (fn) {
        this.subscribe(fn);
    };
    /**
     * Unsubscribe from the event dispatcher.
     * @param fn The event handler that is called when the event is dispatched.
     */
    DispatcherWrapper.prototype.unsubscribe = function (fn) {
        this._unsubscribe(fn);
    };
    /**
     * Unsubscribe from the event dispatcher.
     * @param fn The event handler that is called when the event is dispatched.
     */
    DispatcherWrapper.prototype.unsub = function (fn) {
        this.unsubscribe(fn);
    };
    /**
     * Subscribe once to the event with the specified name.
     * @param fn The event handler that is called when the event is dispatched.
     */
    DispatcherWrapper.prototype.one = function (fn) {
        this._one(fn);
    };
    /**
     * Checks it the event has a subscription for the specified handler.
     * @param fn The event handler.
     */
    DispatcherWrapper.prototype.has = function (fn) {
        return this._has(fn);
    };
    /**
     * Clears all the subscriptions.
     */
    DispatcherWrapper.prototype.clear = function () {
        this._clear();
    };
    return DispatcherWrapper;
}());
exports.DispatcherWrapper = DispatcherWrapper;
/**
 * Base class for event lists classes. Implements the get and remove.
 */
var EventListBase = (function () {
    function EventListBase() {
        this._events = {};
    }
    /**
     * Gets the dispatcher associated with the name.
     * @param name The name of the event.
     */
    EventListBase.prototype.get = function (name) {
        var event = this._events[name];
        if (event) {
            return event;
        }
        event = this.createDispatcher();
        this._events[name] = event;
        return event;
    };
    /**
     * Removes the dispatcher associated with the name.
     * @param name The name of the event.
     */
    EventListBase.prototype.remove = function (name) {
        this._events[name] = null;
    };
    return EventListBase;
}());
exports.EventListBase = EventListBase;
/**
 * Storage class for multiple events that are accessible by name.
 * Events dispatchers are automatically created.
 */
var EventList = (function (_super) {
    __extends(EventList, _super);
    /**
     * Creates a new EventList instance.
     */
    function EventList() {
        return _super.call(this) || this;
    }
    /**
     * Creates a new dispatcher instance.
     */
    EventList.prototype.createDispatcher = function () {
        return new EventDispatcher();
    };
    return EventList;
}(EventListBase));
exports.EventList = EventList;
/**
 * Storage class for multiple simple events that are accessible by name.
 * Events dispatchers are automatically created.
 */
var SimpleEventList = (function (_super) {
    __extends(SimpleEventList, _super);
    /**
     * Creates a new SimpleEventList instance.
     */
    function SimpleEventList() {
        return _super.call(this) || this;
    }
    /**
     * Creates a new dispatcher instance.
     */
    SimpleEventList.prototype.createDispatcher = function () {
        return new SimpleEventDispatcher();
    };
    return SimpleEventList;
}(EventListBase));
exports.SimpleEventList = SimpleEventList;
/**
 * Storage class for multiple signal events that are accessible by name.
 * Events dispatchers are automatically created.
 */
var SignalList = (function (_super) {
    __extends(SignalList, _super);
    /**
     * Creates a new SignalList instance.
     */
    function SignalList() {
        return _super.call(this) || this;
    }
    /**
     * Creates a new dispatcher instance.
     */
    SignalList.prototype.createDispatcher = function () {
        return new SignalDispatcher();
    };
    return SignalList;
}(EventListBase));
exports.SignalList = SignalList;
/**
 * Extends objects with event handling capabilities.
 */
var EventHandlingBase = (function () {
    function EventHandlingBase() {
        this._events = new EventList();
    }
    Object.defineProperty(EventHandlingBase.prototype, "events", {
        /**
         * Gets the list with all the event dispatchers.
         */
        get: function () {
            return this._events;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Subscribes to the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    EventHandlingBase.prototype.subscribe = function (name, fn) {
        this._events.get(name).subscribe(fn);
    };
    /**
     * Subscribes to the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    EventHandlingBase.prototype.sub = function (name, fn) {
        this.subscribe(name, fn);
    };
    /**
     * Unsubscribes from the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    EventHandlingBase.prototype.unsubscribe = function (name, fn) {
        this._events.get(name).unsubscribe(fn);
    };
    /**
     * Unsubscribes from the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    EventHandlingBase.prototype.unsub = function (name, fn) {
        this.unsubscribe(name, fn);
    };
    /**
     * Subscribes to once the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    EventHandlingBase.prototype.one = function (name, fn) {
        this._events.get(name).one(fn);
    };
    /**
     * Subscribes to once the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    EventHandlingBase.prototype.has = function (name, fn) {
        return this._events.get(name).has(fn);
    };
    return EventHandlingBase;
}());
exports.EventHandlingBase = EventHandlingBase;
/**
 * Extends objects with simple event handling capabilities.
 */
var SimpleEventHandlingBase = (function () {
    function SimpleEventHandlingBase() {
        this._events = new SimpleEventList();
    }
    Object.defineProperty(SimpleEventHandlingBase.prototype, "events", {
        get: function () {
            return this._events;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Subscribes to the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    SimpleEventHandlingBase.prototype.subscribe = function (name, fn) {
        this._events.get(name).subscribe(fn);
    };
    /**
     * Subscribes to the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    SimpleEventHandlingBase.prototype.sub = function (name, fn) {
        this.subscribe(name, fn);
    };
    /**
     * Subscribes once to the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    SimpleEventHandlingBase.prototype.one = function (name, fn) {
        this._events.get(name).one(fn);
    };
    /**
     * Checks it the event has a subscription for the specified handler.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    SimpleEventHandlingBase.prototype.has = function (name, fn) {
        return this._events.get(name).has(fn);
    };
    /**
     * Unsubscribes from the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    SimpleEventHandlingBase.prototype.unsubscribe = function (name, fn) {
        this._events.get(name).unsubscribe(fn);
    };
    /**
     * Unsubscribes from the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    SimpleEventHandlingBase.prototype.unsub = function (name, fn) {
        this.unsubscribe(name, fn);
    };
    return SimpleEventHandlingBase;
}());
exports.SimpleEventHandlingBase = SimpleEventHandlingBase;
/**
 * Extends objects with signal event handling capabilities.
 */
var SignalHandlingBase = (function () {
    function SignalHandlingBase() {
        this._events = new SignalList();
    }
    Object.defineProperty(SignalHandlingBase.prototype, "events", {
        get: function () {
            return this._events;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Subscribes once to the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    SignalHandlingBase.prototype.one = function (name, fn) {
        this._events.get(name).one(fn);
    };
    /**
     * Checks it the event has a subscription for the specified handler.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    SignalHandlingBase.prototype.has = function (name, fn) {
        return this._events.get(name).has(fn);
    };
    /**
     * Subscribes to the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    SignalHandlingBase.prototype.subscribe = function (name, fn) {
        this._events.get(name).subscribe(fn);
    };
    /**
     * Subscribes to the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    SignalHandlingBase.prototype.sub = function (name, fn) {
        this.subscribe(name, fn);
    };
    /**
     * Unsubscribes from the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    SignalHandlingBase.prototype.unsubscribe = function (name, fn) {
        this._events.get(name).unsubscribe(fn);
    };
    /**
     * Unsubscribes from the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    SignalHandlingBase.prototype.unsub = function (name, fn) {
        this.unsubscribe(name, fn);
    };
    return SignalHandlingBase;
}());
exports.SignalHandlingBase = SignalHandlingBase;
function createEventDispatcher() {
    return new EventDispatcher();
}
exports.createEventDispatcher = createEventDispatcher;
;
function createEventList() {
    return new EventList();
}
exports.createEventList = createEventList;
function createSimpleEventDispatcher() {
    return new SimpleEventDispatcher();
}
exports.createSimpleEventDispatcher = createSimpleEventDispatcher;
;
function createSimpleEventList() {
    return new SimpleEventList();
}
exports.createSimpleEventList = createSimpleEventList;
function createSignalDispatcher() {
    return new SignalDispatcher();
}
exports.createSignalDispatcher = createSignalDispatcher;
;
function createSignalList() {
    return new SignalList();
}
exports.createSignalList = createSignalList;
;
(function () {
    var exportables = {};
    exportables['EventDispatcher'] = EventDispatcher;
    exportables['SimpleEventDispatcher'] = SimpleEventDispatcher;
    exportables['SignalDispatcher'] = SignalDispatcher;
    exportables['EventList'] = EventList;
    exportables['SimpleEventList'] = SimpleEventList;
    exportables['SignalList'] = SignalList;
    exportables['EventHandlingBase'] = EventHandlingBase;
    exportables['SimpleEventHandlingBase'] = SimpleEventHandlingBase;
    exportables['SignalHandlingBase'] = SignalHandlingBase;
    exportables['createEventDispatcher'] = createEventDispatcher;
    exportables['createSimpleEventDispatcher'] = createSimpleEventDispatcher;
    exportables['createSignalDispatcher'] = createSignalDispatcher;
    exportables['createEventList'] = createEventList;
    exportables['createSimpleEventList'] = createSimpleEventList;
    exportables['createSignalList'] = createSignalList;
    function map(key, exp) {
        if (typeof module !== "undefined" && module.exports) {
            module.exports[key] = exp;
        }
        else if (typeof define === 'function' && define.amd) {
            define(function () { return exp; });
        }
        else {
            window[key] = exp;
            window._e = window._e || window;
        }
    }
    for (var key in exportables) {
        if (exportables.hasOwnProperty(key)) {
            map(key, exportables[key]);
        }
    }
}());
