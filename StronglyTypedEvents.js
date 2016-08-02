/*!
 * Strongly Typed Events for TypeScript - 0.3.1
 * https://github.com/KeesCBakker/StronlyTypedEvents/
 * http://keestalkstech.com
 *
 * Copyright Kees C. Bakker / KeesTalksTech
 * Released under the MIT license
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
"use strict";
var DispatcherBase = (function () {
    function DispatcherBase() {
        this._wrap = new DispatcherWrapper(this);
        this._subscriptions = new Array();
    }
    DispatcherBase.prototype.subscribe = function (fn) {
        if (fn) {
            this._subscriptions.push(fn);
        }
    };
    DispatcherBase.prototype.unsubscribe = function (fn) {
        var i = this._subscriptions.indexOf(fn);
        if (i > -1) {
            this._subscriptions.splice(i, 1);
        }
    };
    DispatcherBase.prototype.asEvent = function () {
        return this._wrap;
    };
    return DispatcherBase;
}());
var EventDispatcher = (function (_super) {
    __extends(EventDispatcher, _super);
    function EventDispatcher() {
        _super.apply(this, arguments);
    }
    EventDispatcher.prototype.dispatch = function (sender, args) {
        for (var _i = 0, _a = this._subscriptions; _i < _a.length; _i++) {
            var handler = _a[_i];
            handler(sender, args);
        }
    };
    EventDispatcher.prototype.dispatchAsync = function (sender, args) {
        for (var _i = 0, _a = this._subscriptions; _i < _a.length; _i++) {
            var handler = _a[_i];
            this.excuteAsync(sender, args, handler);
        }
    };
    EventDispatcher.prototype.excuteAsync = function (sender, args, handler) {
        window.setTimeout(function () { return handler(sender, args); }, 0);
    };
    return EventDispatcher;
}(DispatcherBase));
var SimpleEventDispatcher = (function (_super) {
    __extends(SimpleEventDispatcher, _super);
    function SimpleEventDispatcher() {
        _super.apply(this, arguments);
    }
    SimpleEventDispatcher.prototype.dispatch = function (args) {
        for (var _i = 0, _a = this._subscriptions; _i < _a.length; _i++) {
            var handler = _a[_i];
            handler(args);
        }
    };
    SimpleEventDispatcher.prototype.dispatchAsync = function (args) {
        for (var _i = 0, _a = this._subscriptions; _i < _a.length; _i++) {
            var handler = _a[_i];
            this.excuteAsync(args, handler);
        }
    };
    SimpleEventDispatcher.prototype.excuteAsync = function (args, handler) {
        window.setTimeout(function () { return handler(args); }, 0);
    };
    return SimpleEventDispatcher;
}(DispatcherBase));
var SignalDispatcher = (function (_super) {
    __extends(SignalDispatcher, _super);
    function SignalDispatcher() {
        _super.apply(this, arguments);
    }
    SignalDispatcher.prototype.dispatch = function () {
        for (var _i = 0, _a = this._subscriptions; _i < _a.length; _i++) {
            var handler = _a[_i];
            handler();
        }
    };
    SignalDispatcher.prototype.dispatchAsync = function () {
        for (var _i = 0, _a = this._subscriptions; _i < _a.length; _i++) {
            var handler = _a[_i];
            this.excuteAsync(handler);
        }
    };
    SignalDispatcher.prototype.excuteAsync = function (handler) {
        window.setTimeout(function () { return handler(); }, 0);
    };
    return SignalDispatcher;
}(DispatcherBase));
var DispatcherWrapper = (function () {
    function DispatcherWrapper(dispatcher) {
        this._subscribe = function (fn) { return dispatcher.subscribe(fn); };
        this._unsubscribe = function (fn) { return dispatcher.unsubscribe(fn); };
    }
    DispatcherWrapper.prototype.subscribe = function (fn) {
        this._subscribe(fn);
    };
    DispatcherWrapper.prototype.unsubscribe = function (fn) {
        this._unsubscribe(fn);
    };
    return DispatcherWrapper;
}());
var EventListBase = (function () {
    function EventListBase() {
        this._events = {};
    }
    EventListBase.prototype.get = function (name) {
        var event = this._events[name];
        if (event) {
            return event;
        }
        event = this.createDispatcher();
        this._events[name] = event;
        return event;
    };
    EventListBase.prototype.remove = function (name) {
        this._events[name] = null;
    };
    return EventListBase;
}());
var EventList = (function (_super) {
    __extends(EventList, _super);
    function EventList() {
        _super.apply(this, arguments);
    }
    EventList.prototype.createDispatcher = function () {
        return new EventDispatcher();
    };
    return EventList;
}(EventListBase));
var SimpleEventList = (function (_super) {
    __extends(SimpleEventList, _super);
    function SimpleEventList() {
        _super.apply(this, arguments);
    }
    SimpleEventList.prototype.createDispatcher = function () {
        return new SimpleEventDispatcher();
    };
    return SimpleEventList;
}(EventListBase));
var SignalList = (function (_super) {
    __extends(SignalList, _super);
    function SignalList() {
        _super.apply(this, arguments);
    }
    SignalList.prototype.createDispatcher = function () {
        return new SignalDispatcher();
    };
    return SignalList;
}(EventListBase));
var EventHandlingBase = (function () {
    function EventHandlingBase() {
        this._events = new EventList();
    }
    Object.defineProperty(EventHandlingBase.prototype, "events", {
        get: function () {
            return this._events;
        },
        enumerable: true,
        configurable: true
    });
    EventHandlingBase.prototype.subscribe = function (name, fn) {
        this._events.get(name).subscribe(fn);
    };
    EventHandlingBase.prototype.unsubscribe = function (name, fn) {
        this._events.get(name).unsubscribe(fn);
    };
    return EventHandlingBase;
}());
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
    SimpleEventHandlingBase.prototype.subscribe = function (name, fn) {
        this._events.get(name).subscribe(fn);
    };
    SimpleEventHandlingBase.prototype.unsubscribe = function (name, fn) {
        this._events.get(name).unsubscribe(fn);
    };
    return SimpleEventHandlingBase;
}());
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
    SignalHandlingBase.prototype.subscribe = function (name, fn) {
        this._events.get(name).subscribe(fn);
    };
    SignalHandlingBase.prototype.unsubscribe = function (name, fn) {
        this._events.get(name).unsubscribe(fn);
    };
    return SignalHandlingBase;
}());
function createEventDispatcher() {
    return new EventDispatcher();
}
;
function createSimpleEventDispatcher() {
    return new SimpleEventDispatcher();
}
;
function createSignalDispatcher() {
    return new SignalDispatcher();
}
;
(function () {
    var exportables = [
        EventDispatcher, SimpleEventDispatcher, SignalDispatcher,
        EventList, SimpleEventList, SignalList,
        EventHandlingBase, SimpleEventHandlingBase, SignalHandlingBase,
        createEventDispatcher, createSimpleEventDispatcher, createSignalDispatcher
    ];
    if (typeof module !== "undefined" && module.exports) {
        exportables.forEach(function (exp) { return module.exports[nameof(exp)] = exp; });
    }
    else if (typeof define === 'function' && define.amd) {
        exportables.forEach(function (exp) { return define(function () { return exp; }); });
    }
    else if (window) {
        exportables.forEach(function (exp) { return window[nameof(exp)] = exp; });
    }
    function nameof(fn) {
        return typeof fn === 'undefined' ? '' : fn.name ? fn.name : (function () {
            var result = /^function\s+([\w\$]+)\s*\(/.exec(fn.toString());
            return !result ? '' : result[1];
        })();
    }
}());
