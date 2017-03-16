/// <reference path="typings/node/node.d.ts" />

/*!
 * Strongly Typed Events for TypeScript - 0.4.2
 * https://github.com/KeesCBakker/StronlyTypedEvents/
 * http://keestalkstech.com
 *
 * Copyright Kees C. Bakker / KeesTalksTech
 * Released under the MIT license
 */

/**
 * Event handler function with a generic sender and a generic argument.
 */
interface IEventHandler<TSender, TArgs> {
    /**
      * @sender The sender.
      * @args The argument.
      */
    (sender: TSender, args: TArgs)
}

/**
 * Event handler function with a generic argument
 */
interface ISimpleEventHandler<TArgs> {
    /**
      * @args The argument.
      */
    (args: TArgs)
}

/**
 * Event handler function without arguments
 */
interface ISignalHandler {
    ()
}

/**
 * Indicates the object implements generic subscriptions. 
 */
interface ISubscribable<THandlerType> {

    /** 
     * Subscribe to the event.
     * @param fn The event handler that is called when the event is dispatched.
     */
    subscribe(fn: THandlerType);

    /** 
     * Subscribe to the event.
     * @param fn The event handler that is called when the event is dispatched.
     */
    sub(fn: THandlerType);

    /** 
     * Unsubscribe from the event.
     * @param fn The event handler that is will be unsubsribed from the event.
     */
    unsubscribe(fn: THandlerType);

    /** 
     * Unsubscribe from the event.
     * @param fn The event handler that is will be unsubsribed from the event.
     */
    unsub(fn: THandlerType);

    /**
     * Subscribes to the event only once.
     * @param fn The event handler that is will be unsubsribed from the event.
     */
    one(fn: THandlerType);

    /**
     * Checks it the event has a subscription for the specified handler.
     * @param fn The event handler.
     */
    has(fn: THandlerType): boolean;

    /**
     * Clears all the subscriptions.
     */
    clear();
}

/**
 * Models an event with a generic sender and generic argument.
 */
interface IEvent<TSender, TArgs> extends ISubscribable<IEventHandler<TSender, TArgs>> {
}

/** 
 * Models a simple event with a generic argument.
 */
interface ISimpleEvent<TArgs> extends ISubscribable<ISimpleEventHandler<TArgs>> {
}

/**
 * Models a signal. This type of events has no arguments.
 * @interface ISignalHandler
 * @extends {ISubscribable<ISignalHandler>}
 */
interface ISignal extends ISubscribable<ISignalHandler> {
}

/** 
 * Base interface for event handling.
 */
interface IBaseEventHandling<TEventHandler> {

    /** 
     * Subscribe to the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler that is called when the event is dispatched.
     */
    subscribe(name: string, fn: TEventHandler);

    /** 
     * Subscribe to the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler that is called when the event is dispatched.
     */
    sub(name: string, fn: TEventHandler);

    /** 
     * Unsubscribe from the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler that is will be unsubsribed from the event.
     */
    unsubscribe(name: string, fn: TEventHandler);

    /** 
     * Unsubscribe from the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler that is will be unsubsribed from the event.
     */
    unsub(name: string, fn: TEventHandler);

    /** 
     * Subscribe once to the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler that is called when the event is dispatched.
     */
    one(name: string, fn: TEventHandler);

    /**
     * Checks it the event has a subscription for the specified handler.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    has(name: string, fn: TEventHandler): boolean;
}

/**
 * Indicates the object is capable of handling named events.
 */
interface IEventHandling<TSender, TArgs> extends IBaseEventHandling<IEventHandler<TSender, TArgs>> {
}

/**
 * Indicates the object is capable of handling named simple events.
 */
interface ISimpleEventHandling<TArgs> extends IBaseEventHandling<ISimpleEventHandler<TArgs>> {
}

/**
 * Indicates the object is capable of handling named signals.
 */
interface ISignalHandling extends IBaseEventHandling<ISignalHandler> {
}

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
class Subscription<TEventHandler> {

    /**
     * Indicates if the subscription has been executed before.
     */
    public isExecuted = false;

    /**
     * Creates an instance of Subscription.
     * 
     * @param {TEventHandler} handler The handler for the subscription.
     * @param {boolean} isOnce Indicates if the handler should only be executed` once.
     */
    constructor(public handler: TEventHandler, public isOnce: boolean) {
    }

    /**
     * Executes the handler.
     * 
     * @param {boolean} executeAsync True if the even should be executed async.
     * @param {*} The scope the scope of the event.
     * @param {IArguments} args The arguments for the event.
     */
    public execute(executeAsync: boolean, scope: any, args: IArguments) {

        if (!this.isOnce || !this.isExecuted) {
            this.isExecuted = true;

            var fn: any = this.handler;
            if (executeAsync) {
                setTimeout(() => {
                    fn.apply(scope, args);
                }, 1);
            }
            else {
                fn.apply(scope, args);
            }
        }
    }
}

abstract class DispatcherBase<TEventHandler> implements ISubscribable<TEventHandler> {

    private _wrap = new DispatcherWrapper(this);
    private _subscriptions = new Array<Subscription<TEventHandler>>();

    /**
     * Subscribe to the event dispatcher.
     * @param fn The event handler that is called when the event is dispatched.
     */
    public subscribe(fn: TEventHandler) {
        if (fn) {
            this._subscriptions.push(new Subscription<TEventHandler>(fn, false));
        }
    }

    /**
     * Subscribe to the event dispatcher.
     * @param fn The event handler that is called when the event is dispatched.
     */
    public sub(fn: TEventHandler) {
        this.subscribe(fn);
    }

    /** 
     * Subscribe once to the event with the specified name.
     * @param fn The event handler that is called when the event is dispatched.
     */
    public one(fn: TEventHandler) {
        if (fn) {
            this._subscriptions.push(new Subscription<TEventHandler>(fn, true));
        }
    }

    /**
     * Checks it the event has a subscription for the specified handler.
     * @param fn The event handler.
     */
    public has(fn: TEventHandler): boolean {

        if (fn) {
            for (let sub of this._subscriptions) {
                if (sub.handler == fn) {
                    return true;
                }
            }
        }

        return false;
    }


    /**
     * Unsubscribes the handler from the dispatcher.
     * @param fn The event handler.
     */
    public unsubscribe(fn: TEventHandler) {

        if (fn) {
            for (let i = 0; i < this._subscriptions.length; i++) {
                let sub = this._subscriptions[i];
                if (sub.handler == fn) {
                    this._subscriptions.splice(i, 1);
                    break
                }
            }
        }
    }

    
    /**
     * Unsubscribes the handler from the dispatcher.
     * @param fn The event handler.
     */
    public unsub(fn: TEventHandler) {
        this.unsubscribe(fn);
    }

    /**
     * Generic dispatch will dispatch the handlers with the given arguments. 
     * 
     * @protected
     * @param {boolean} executeAsync True if the even should be executed async.
     * @param {*} The scope the scope of the event.
     * @param {IArguments} args The arguments for the event.
     */
    protected _dispatch(executeAsync: boolean, scope: any, args: IArguments) {

        for (let i = 0; i < this._subscriptions.length; i++) {
            let sub = this._subscriptions[i];

            if (sub.isOnce) {
                if (sub.isExecuted === true) {
                    continue;
                }

                this._subscriptions.splice(i, 1);
                i--;
            }

            sub.execute(executeAsync, scope, args);
        }
    }

    /**
     * Creates an event from the dispatcher. Will return the dispatcher
     * in a wrapper. This will prevent exposure of any dispatcher methods.
     */
    public asEvent(): ISubscribable<TEventHandler> {
        return this._wrap;
    }

    /**
     * Clears all the subscriptions.
     */
    public clear() {
        this._subscriptions.splice(0, this._subscriptions.length);
    }
}

/**
 * Dispatcher implementation for events. Can be used to subscribe, unsubscribe
 * or dispatch events. Use the ToEvent() method to expose the event.
 */
class EventDispatcher<TSender, TArgs> extends DispatcherBase<IEventHandler<TSender, TArgs>> implements IEvent<TSender, TArgs>
{
    /**
     * Creates a new EventDispatcher instance.
     */
    constructor(){
        super(); 
    }

    /**
     * Dispatches the event.
     * @param sender The sender.
     * @param args The arguments object.
     */
    dispatch(sender: TSender, args: TArgs) {
        this._dispatch(false, this, arguments);
    }

    /**
     * Dispatches the events thread.
     * @param sender The sender.
     * @param args The arguments object.
     */
    dispatchAsync(sender: TSender, args: TArgs) {
        this._dispatch(true, this, arguments);
    }
}

/**
 * The dispatcher handles the storage of subsciptions and facilitates
 * subscription, unsubscription and dispatching of a simple event 
 */
class SimpleEventDispatcher<TArgs> extends DispatcherBase<ISimpleEventHandler<TArgs>> implements ISimpleEvent<TArgs>
{
    /**
     * Creates a new SimpleEventDispatcher instance.
     */
    constructor(){
        super();
    }

    /**
     * Dispatches the event.
     * @param args The arguments object.
     */
    dispatch(args: TArgs) {
        this._dispatch(false, this, arguments);
    }

    /**
     * Dispatches the events thread.
     * @param args The arguments object.
     */
    dispatchAsync(args: TArgs) {
        this._dispatch(true, this, arguments);
    }
}

/**
 * The dispatcher handles the storage of subsciptions and facilitates
 * subscription, unsubscription and dispatching of a signal event. 
 */
class SignalDispatcher extends DispatcherBase<ISignalHandler> implements ISignal {

    /**
     * Creates a new SignalDispatcher instance.
     */
    constructor(){
        super();
    }

    /**
     * Dispatches the signal.
     */
    dispatch() {
        this._dispatch(false, this, arguments);
    }

    /**
     * Dispatches the signal threaded.
     */
    dispatchAsync() {
        this._dispatch(true, this, arguments);
    }
}

/**
 * Hides the implementation of the event dispatcher. Will expose methods that
 * are relevent to the event.
 */
class DispatcherWrapper<THandler> implements ISubscribable<THandler>
{
    private _subscribe: (fn: THandler) => void;
    private _unsubscribe: (fn: THandler) => void;
    private _one: (fn: THandler) => void;
    private _has: (fn: THandler) => boolean;
    private _clear: () => void;

    /**
     * Creates a new EventDispatcherWrapper instance.
     * @param dispatcher The dispatcher.
     */
    constructor(dispatcher: ISubscribable<THandler>) {
        this._subscribe = (fn: THandler) => dispatcher.subscribe(fn);
        this._unsubscribe = (fn: THandler) => dispatcher.unsubscribe(fn);
        this._one = (fn: THandler) => dispatcher.one(fn);
        this._has = (fn: THandler) => dispatcher.has(fn);
        this._clear = () => dispatcher.clear();
    }

    /**
     * Subscribe to the event dispatcher.
     * @param fn The event handler that is called when the event is dispatched.
     */
    public subscribe(fn: THandler) {
        this._subscribe(fn);
    }

    /**
     * Subscribe to the event dispatcher.
     * @param fn The event handler that is called when the event is dispatched.
     */
    public sub(fn: THandler) {
        this.subscribe(fn);
    }

    /**
     * Unsubscribe from the event dispatcher.
     * @param fn The event handler that is called when the event is dispatched.
     */
    public unsubscribe(fn: THandler) {
        this._unsubscribe(fn);
    }

    /**
     * Unsubscribe from the event dispatcher.
     * @param fn The event handler that is called when the event is dispatched.
     */
    public unsub(fn: THandler) {
        this.unsubscribe(fn);
    }

    /** 
     * Subscribe once to the event with the specified name.
     * @param fn The event handler that is called when the event is dispatched.
     */
    public one(fn: THandler) {
        this._one(fn);
    }

    /**
     * Checks it the event has a subscription for the specified handler.
     * @param fn The event handler.
     */
    public has(fn: THandler) {
        return this._has(fn);
    }
 
    /**
     * Clears all the subscriptions.
     */
    public clear() {
        this._clear();
    }
}

/**
 * Base class for event lists classes. Implements the get and remove. 
 */
abstract class EventListBase<TEventDispatcher> {

    private _events: { [name: string]: TEventDispatcher; } = {};

    /**
     * Gets the dispatcher associated with the name.
     * @param name The name of the event.
     */
    get(name: string): TEventDispatcher {

        let event = this._events[name];

        if (event) {
            return event;
        }

        event = this.createDispatcher();
        this._events[name] = event;
        return event;
    }

    /**
     * Removes the dispatcher associated with the name.
     * @param name The name of the event.
     */
    remove(name: string) {
        this._events[name] = null;
    }

    /**
     * Creates a new dispatcher instance.
     */
    protected abstract createDispatcher(): TEventDispatcher;
}

/**
 * Storage class for multiple events that are accessible by name.
 * Events dispatchers are automatically created.
 */
class EventList<TSender, TArgs> extends EventListBase<EventDispatcher<TSender, TArgs>> {

    /**
     * Creates a new dispatcher instance.
     */
    protected createDispatcher(): EventDispatcher<TSender, TArgs> {
        return new EventDispatcher<TSender, TArgs>();
    }
}

/**
 * Storage class for multiple simple events that are accessible by name.
 * Events dispatchers are automatically created.
 */
class SimpleEventList<TArgs> extends EventListBase<SimpleEventDispatcher<TArgs>> {

    /**
     * Creates a new dispatcher instance.
     */
    protected createDispatcher(): SimpleEventDispatcher<TArgs> {
        return new SimpleEventDispatcher<TArgs>();
    }
}

/**
 * Storage class for multiple signal events that are accessible by name.
 * Events dispatchers are automatically created.
 */
class SignalList extends EventListBase<SignalDispatcher> {

    /**
     * Creates a new dispatcher instance.
     */
    protected createDispatcher(): SignalDispatcher {
        return new SignalDispatcher();
    }
}

/**
 * Extends objects with event handling capabilities.
 */
abstract class EventHandlingBase<TSender, TArgs> implements IEventHandling<TSender, TArgs> {

    private _events = new EventList<TSender, TArgs>();

    /**
     * Gets the list with all the event dispatchers.
     */
    protected get events() {
        return this._events;
    }

    /**
     * Subscribes to the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    subscribe(name: string, fn: IEventHandler<TSender, TArgs>) {
        this._events.get(name).subscribe(fn);
    }

    /**
     * Subscribes to the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    sub(name: string, fn: IEventHandler<TSender, TArgs>) {
        this.subscribe(name, fn);
    }

    /**
     * Unsubscribes from the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    unsubscribe(name: string, fn: IEventHandler<TSender, TArgs>) {
        this._events.get(name).unsubscribe(fn);
    }

    /**
     * Unsubscribes from the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    unsub(name: string, fn: IEventHandler<TSender, TArgs>) {
        this.unsubscribe(name, fn);
    }

    /**
     * Subscribes to once the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    one(name: string, fn: IEventHandler<TSender, TArgs>) {
        this._events.get(name).one(fn);
    }

    /**
     * Subscribes to once the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    has(name: string, fn: IEventHandler<TSender, TArgs>) {
        return this._events.get(name).has(fn);
    }
}

/**
 * Extends objects with simple event handling capabilities.
 */
abstract class SimpleEventHandlingBase<TArgs> implements ISimpleEventHandling<TArgs> {

    private _events = new SimpleEventList<TArgs>();

    protected get events(): SimpleEventList<TArgs> {
        return this._events;
    }

    /**
     * Subscribes to the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    subscribe(name: string, fn: ISimpleEventHandler<TArgs>) {
        this._events.get(name).subscribe(fn);
    }

    /**
     * Subscribes to the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    sub(name: string, fn: ISimpleEventHandler<TArgs>) {
        this.subscribe(name, fn);    
    }

    /**
     * Subscribes once to the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    one(name: string, fn: ISimpleEventHandler<TArgs>) {
        this._events.get(name).one(fn);
    }

    /**
     * Checks it the event has a subscription for the specified handler.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    has(name: string, fn: ISimpleEventHandler<TArgs>) {
        return this._events.get(name).has(fn);
    }

    /**
     * Unsubscribes from the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    unsubscribe(name: string, fn: ISimpleEventHandler<TArgs>) {
        this._events.get(name).unsubscribe(fn);
    }

    /**
     * Unsubscribes from the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    unsub(name: string, fn: ISimpleEventHandler<TArgs>) {
        this.unsubscribe(name, fn);    
    }
}

/**
 * Extends objects with signal event handling capabilities.
 */
abstract class SignalHandlingBase implements ISignalHandling {

    private _events = new SignalList();

    protected get events(): SignalList {
        return this._events;
    }

    /**
     * Subscribes once to the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    one(name: string, fn: ISignalHandler) {
        this._events.get(name).one(fn);
    }

    /**
     * Checks it the event has a subscription for the specified handler.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    has(name: string, fn: ISignalHandler) {
        return this._events.get(name).has(fn);
    }

    /**
     * Subscribes to the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    subscribe(name: string, fn: ISignalHandler) {
        this._events.get(name).subscribe(fn);
    }

    /**
     * Subscribes to the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    sub(name: string, fn: ISignalHandler) {
        this.subscribe(name, fn);
    }

    /**
     * Unsubscribes from the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    unsubscribe(name: string, fn: ISignalHandler) {
        this._events.get(name).unsubscribe(fn);
    }
        
    /**
     * Unsubscribes from the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    unsub(name: string, fn: ISignalHandler) {
        this.unsubscribe(name, fn);
    }
}

interface IStronglyTypedEvents {

    EventList: <TSender, TArgs>() => EventList<TSender, TArgs>;
    SimpleEventList: <TArgs>() => SimpleEventList<TArgs>;
    SignalList: () => SignalList;

    createEventList: <TSender, TArgs>() => EventList<TSender, TArgs>;
    createSimpleEventList: <TArgs>() => SimpleEventList<TArgs>;
    createSignalList: () => SignalList;

    EventDispatcher: <TSender, TArgs>() => EventDispatcher<TSender, TArgs>;
    SimpleEventDispatcher: <TArgs>() => SimpleEventDispatcher<TArgs>;
    SignalDispatcher: () => SignalDispatcher;

    EventHandlingBase: <TSender, TArgs>() => EventHandlingBase<TSender, TArgs>;
    SimpleEventHandlingBase: <TArgs>() => SimpleEventHandlingBase<TArgs>;
    SignalHandlingBase: () => SignalHandlingBase;

    createEventDispatcher: <TSender, TArgs>() => EventDispatcher<TSender, TArgs>;
    createSimpleEventDispatcher: <TArgs>() => SimpleEventDispatcher<TArgs>;
    createSignalDispatcher: () => SignalDispatcher;

    EventListBase: <TEventDispatcher>() => EventListBase<TEventDispatcher>;
    DispatcherBase: <TEventHandler>() => DispatcherBase<TEventHandler>;
    DispatcherWrapper: <THandlerType>() => DispatcherWrapper<THandlerType>;
}

function createEventDispatcher<TSender, TArgs>() {
    return new EventDispatcher<TSender, TArgs>();
};

function createEventList<TSender, TArgs>() {
    return new EventList<TSender, TArgs>();
}

function createSimpleEventDispatcher<TArgs>() {
    return new SimpleEventDispatcher<TArgs>();
};

function createSimpleEventList<TArgs>() {
    return new SimpleEventList<TArgs>();
}

function createSignalDispatcher() {
    return new SignalDispatcher();
};

function createSignalList() {
    return new SignalList();
};

/* modules, require and stuff like that */
declare var define: any;

(function () {

    let exportables = [
        EventDispatcher, SimpleEventDispatcher, SignalDispatcher,
        EventList, SimpleEventList, SignalList,
        EventHandlingBase, SimpleEventHandlingBase, SignalHandlingBase,
        createEventDispatcher, createSimpleEventDispatcher, createSignalDispatcher,
        createEventList, createSimpleEventList, createSignalList
    ];

    // Node: function
    if (typeof module !== "undefined" && module.exports) {
        exportables.forEach(exp => module.exports[nameof(exp)] = exp);
    }
    // AMD/requirejs: Define the module
    else if (typeof define === 'function' && define.amd) {
        exportables.forEach(exp => define(() => exp));
    }
    //expose it through Window
    else if (window) {
        exportables.forEach(exp => (window as any)[nameof(exp)] = exp);
    }

    function nameof(fn: any): string {
        return typeof fn === 'undefined' ? '' : fn.name ? fn.name : (() => {
            let result = /^function\s+([\w\$]+)\s*\(/.exec(fn.toString());
            return !result ? '' : result[1];
        })();
    }

} ());