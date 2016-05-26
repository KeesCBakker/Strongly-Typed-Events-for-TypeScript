/*!
 * Strongly Typed Events for TypeScript
 * https://github.com/KeesCBakker/StronlyTypedEvents/
 * http://keestalkstech.com
 *
 * Copyright Kees C. Bakker / KeesTalksTech
 * Released under the MIT license
 */

/*
 * Event handler function with a generic sender and a generic argument.
 */
interface IEventHandler<TSender, TArgs> {
    (sender: TSender, args: TArgs): void
}

/** 
 * Event handler function with a generic argument
 */
interface ISimpleEventHandler<TArgs> {
    (args: TArgs): void
}

/**
  * Indicates the object implements generic subscriptions. 
  */
interface ISubscribable<THandlerType> {

    subscribe(fn: THandlerType): void;

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

    subscribe(name: string, fn: TEventHandler): void;
     
    unsubscribe(name: string, fn: TEventHandler): void;
}

/**
 * Indicates the object is capable of handling named events.
 */
interface IEventHandling<TSender, TArgs> extends IBaseEventHandling<IEventHandler<TSender, TArgs>> {
}

/*
 * Indicates the object is capable of handling named events.
 */
interface ISimpleEventHandling<TArgs> extends IBaseEventHandling<ISimpleEventHandler<TArgs>> {
}