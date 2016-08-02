/*!
 * Strongly Typed Events for TypeScript - 0.3.3
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
    (sender: TSender, args: TArgs): void
}

/**
 * Event handler function with a generic argument
 */
interface ISimpleEventHandler<TArgs> {
    /**
      * @args The argument.
      */
    (args: TArgs): void
}

/**
 * Event handler function without arguments
 */
interface ISignalHandler {
    (): void;
}

/**
 * Indicates the object implements generic subscriptions. 
 */
interface ISubscribable<THandlerType> {

    /** 
     * Subscribe to the event.
     * @param fn The event handler that is called when the event is dispatched.
     */
    subscribe(fn: THandlerType): void;

    /** 
     * Unsubscribe from the event.
     * @param fn The event handler that is will be unsubsribed from the event.
     */
    unsubscribe(fn: THandlerType): void;
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
    subscribe(name: string, fn: TEventHandler): void;

    /** 
     * Unsubscribe from the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler that is will be unsubsribed from the event.
     */
    unsubscribe(name: string, fn: TEventHandler): void;
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
abstract class DispatcherBase<TEventHandler> implements ISubscribable<TEventHandler> {

    private _wrap = new DispatcherWrapper(this);
    protected _subscriptions: Array<TEventHandler> = new Array<TEventHandler>();

    /**
     * Subscribe to the event dispatcher.
     * @param fn The event handler that is called when the event is dispatched.
     */
    subscribe(fn: TEventHandler): void {
        if (fn) {
            this._subscriptions.push(fn);
        }
    }

    /**
     * Unsubscribes the handler from the dispatcher.
     * @param fn The event handler.
     */
    unsubscribe(fn: TEventHandler): void {
        let i = this._subscriptions.indexOf(fn);
        if (i > -1) {
            this._subscriptions.splice(i, 1);
        }
    }

    /**
     * Creates an event from the dispatcher. Will return the dispatcher
     * in a wrapper. This will prevent exposure of any dispatcher methods.
     */
    public asEvent(): ISubscribable<TEventHandler> {
        return this._wrap;
    }
}

/**
 * Dispatcher implementation for events. Can be used to subscribe, unsubscribe
 * or dispatch events. Use the ToEvent() method to expose the event.
 */
class EventDispatcher<TSender, TArgs> extends DispatcherBase<IEventHandler<TSender, TArgs>> implements IEvent<TSender, TArgs>
{
    /**
     * Dispatches the event.
     * @param sender The sender.
     * @param args The arguments object.
     */
    dispatch(sender: TSender, args: TArgs): void {
        for (let handler of this._subscriptions) {
            handler(sender, args);
        }
    }

    /**
     * Dispatches the events thread.
     * @param sender The sender.
     * @param args The arguments object.
     */
    dispatchAsync(sender: TSender, args: TArgs): void {

        for (let handler of this._subscriptions) {
            this.excuteAsync(sender, args, handler);
        }
    }

    private excuteAsync(sender: TSender, args: TArgs, handler: IEventHandler<TSender, TArgs>): void {
        setTimeout(() => handler(sender, args), 0);
    }
}

/**
 * The dispatcher handles the storage of subsciptions and facilitates
 * subscription, unsubscription and dispatching of a simple event 
 */
class SimpleEventDispatcher<TArgs> extends DispatcherBase<ISimpleEventHandler<TArgs>> implements ISimpleEvent<TArgs>
{
    /**
     * Dispatches the event.
     * @param args The arguments object.
     */
    dispatch(args: TArgs): void {
        for (let handler of this._subscriptions) {
            handler(args);
        }
    }

    /**
     * Dispatches the events thread.
     * @param args The arguments object.
     */
    dispatchAsync(args: TArgs): void {

        for (let handler of this._subscriptions) {
            this.excuteAsync(args, handler);
        }
    }

    private excuteAsync(args: TArgs, handler: ISimpleEventHandler<TArgs>): void {
        setTimeout(() => handler(args), 0);
    }
}

class SignalDispatcher extends DispatcherBase<ISignalHandler> implements ISignal {
    /**
     * Dispatches the signal.
     */
    dispatch(): void {
        for (let handler of this._subscriptions) {
            handler();
        }
    }

    /**
     * Dispatches the signal threaded.
     */
    dispatchAsync(): void {

        for (let handler of this._subscriptions) {
            this.excuteAsync(handler);
        }
    }

    private excuteAsync(handler: ISignalHandler): void {
        setTimeout(() => handler(), 0);
    }
}

/**
 * Hides the implementation of the event dispatcher. Will expose methods that
 * are relevent to the event.
 */
class DispatcherWrapper<THandlerType> implements ISubscribable<THandlerType>
{
    private _subscribe: (fn: THandlerType) => void;
    private _unsubscribe: (fn: THandlerType) => void;

    /**
     * Creates a new EventDispatcherWrapper instance.
     * @param dispatcher The dispatcher.
     */
    constructor(dispatcher: ISubscribable<THandlerType>) {
        this._subscribe = (fn: THandlerType) => dispatcher.subscribe(fn);
        this._unsubscribe = (fn: THandlerType) => dispatcher.unsubscribe(fn);
    }

    /**
     * Subscribe to the event dispatcher.
     * @param fn The event handler that is called when the event is dispatched.
     */
    public subscribe(fn: THandlerType): void {
        this._subscribe(fn);
    }

    /**
     * Unsubscribe from the event dispatcher.
     * @param fn The event handler that is called when the event is dispatched.
     */
    public unsubscribe(fn: THandlerType): void {
        this._unsubscribe(fn);
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
    remove(name: string): void {
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
    protected get events(): EventList<TSender, TArgs> {
        return this._events;
    }

    /**
     * Subscribes to the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    subscribe(name: string, fn: IEventHandler<TSender, TArgs>): void {
        this._events.get(name).subscribe(fn);
    }

    /**
     * Unsubscribes from the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    unsubscribe(name: string, fn: IEventHandler<TSender, TArgs>): void {
        this._events.get(name).unsubscribe(fn);
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
    subscribe(name: string, fn: ISimpleEventHandler<TArgs>): void {
        this._events.get(name).subscribe(fn);
    }

    /**
     * Unsubscribes from the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    unsubscribe(name: string, fn: ISimpleEventHandler<TArgs>): void {
        this._events.get(name).unsubscribe(fn);
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
     * Subscribes to the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    subscribe(name: string, fn: ISignalHandler): void {
        this._events.get(name).subscribe(fn);
    }

    /**
     * Unsubscribes from the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    unsubscribe(name: string, fn: ISignalHandler): void {
        this._events.get(name).unsubscribe(fn);
    }
}

interface IStronglyTypedEvents {

    EventList: <TSender, TArgs>() => EventList<TSender, TArgs>;
    SimpleEventList: <TArgs>() => SimpleEventList<TArgs>;
    SignalList: () => SignalList;

    EventDispatcher: <TSender, TArgs>() => EventDispatcher<TSender, TArgs>;
    SimpleEventDispatcher: <TArgs>() => SimpleEventDispatcher<TArgs>;
    SignalDispatcher: () => SignalDispatcher;

    EventHandlingBase: <TSender, TArgs>() => EventHandlingBase<TSender, TArgs>;
    SimpleEventHandlingBase: <TArgs>() => SimpleEventHandlingBase<TArgs>;
    SignalHandlingBase: () => SignalHandlingBase;

    createEventDispatcher: <TSender, TArgs>() => EventDispatcher<TSender, TArgs>;
    createSimpleEventDispatcher: <TSender, TArgs>() => EventDispatcher<TSender, TArgs>;
    createSignalDispatcher: () => SignalDispatcher;

    EventListBase: <TEventDispatcher>() => EventListBase<TEventDispatcher>;
    DispatcherBase: <TEventHandler>() => DispatcherBase<TEventHandler>;
    DispatcherWrapper: <THandlerType>() => DispatcherWrapper<THandlerType>;
}

function createEventDispatcher<TSender, TArgs>() {
    return new EventDispatcher<TSender, TArgs>();
};

function createSimpleEventDispatcher<TArgs>() {
    return new SimpleEventDispatcher<TArgs>();
};

function createSignalDispatcher() {
    return new SignalDispatcher();
};




/* modules, require and stuff like that */
declare var define: any;
declare var module: any;

(function () {

    let exportables = [
        EventDispatcher, SimpleEventDispatcher, SignalDispatcher,
        EventList, SimpleEventList, SignalList,
        EventHandlingBase, SimpleEventHandlingBase, SignalHandlingBase,
        createEventDispatcher, createSimpleEventDispatcher, createSignalDispatcher
    ];

    // Node: Export function
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