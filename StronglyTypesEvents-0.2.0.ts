/// <reference path="definitions/stronglytypesevents-0.2.0.d.ts" />

/*!
 * Strongly Typed Events for TypeScript
 * https://github.com/KeesCBakker/StronlyTypedEvents/
 * http://keestalkstech.com
 *
 * Copyright Kees C. Bakker / KeesTalksTech
 * Released under the MIT license
 */

/**
 * Base class for implementation of the dispatcher. It facilitates the subscribe
 * and unsubscribe methods based on generic handlers. The TEventType specifies
 * the type of event that should be exposed. Use the asEvent to expose the
 * dispatcher as event.
 */
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
}


/** The dispatcher handles the storage of subsciptions and facilitates
 * subscription, unsubscription and dispatching of a simple event */
class SimpleEventDispatcher<TArgs> extends DispatcherBase<ISimpleEventHandler<TArgs>> implements ISimpleEvent<TArgs>
{
    /**
     * Dispatches the event.
     * @param sender The sender.
     * @param args The arguments object.
     */
    dispatch(args: TArgs): void {
        for (let handler of this._subscriptions) {
            handler(args);
        }
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

/** Base class for event lists classes. Implements the get and removes. */
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