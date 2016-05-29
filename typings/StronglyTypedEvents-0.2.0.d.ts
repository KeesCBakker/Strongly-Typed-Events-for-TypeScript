/*!
 * Strongly Typed Events for TypeScript
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
 * Indicates the object is capable of handling named events.
 */
interface ISimpleEventHandling<TArgs> extends IBaseEventHandling<ISimpleEventHandler<TArgs>> {
}
