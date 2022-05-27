import { EventListBase, ISubscribable } from "..";

/**
 * Base class that implements event handling. With a an
 * event list this base class will expose events that can be
 * subscribed to. This will give your class generic events.
 * 
 * @export
 * @abstract
 * @class HandlingBase
 * @template TEventHandler The type of event handler.
 * @template TDispatcher The type of dispatcher.
 * @template TList The type of event list.
 */
export abstract class HandlingBase<
    TEventHandler,
    TDispatcher extends ISubscribable<TEventHandler>,
    TList extends EventListBase<TDispatcher>
> {

    /**
     * Creates an instance of HandlingBase.
     * @param {TList} events The event list. Used for event management.
     * 
     * @memberOf HandlingBase
     */
    constructor(protected events: TList) {}

    /**
     * Subscribes once to the event with the specified name.
     * @param {string} name The name of the event.
     * @param {TEventHandler} fn The event handler.
     * 
     * @memberOf HandlingBase
     */
    one(name: string, fn: TEventHandler): void {
        this.events.get(name).one(fn);
    }

    /**
     * Checks it the event has a subscription for the specified handler.
     * @param {string} name The name of the event.
     * @param {TEventHandler} fn The event handler.
     * 
     * @memberOf HandlingBase
     */
    has(name: string, fn: TEventHandler): boolean {
        return this.events.get(name).has(fn);
    }

    /**
     * Subscribes to the event with the specified name.
     * @param {string} name The name of the event.
     * @param {TEventHandler} fn The event handler.
     * 
     * @memberOf HandlingBase
     */
    subscribe(name: string, fn: TEventHandler): void {
        this.events.get(name).subscribe(fn);
    }

    /**
     * Subscribes to the event with the specified name.
     * @param {string} name The name of the event.
     * @param {TEventHandler} fn The event handler.
     * 
     * @memberOf HandlingBase
     */
    sub(name: string, fn: TEventHandler): void {
        this.subscribe(name, fn);
    }

    /**
     * Unsubscribes from the event with the specified name.
     * @param {string} name The name of the event.
     * @param {TEventHandler} fn The event handler.
     * 
     * @memberOf HandlingBase
     */
    unsubscribe(name: string, fn: TEventHandler): void {
        this.events.get(name).unsubscribe(fn);
    }

    /**
     * Unsubscribes from the event with the specified name.
     * @param {string} name The name of the event.
     * @param {TEventHandler} fn The event handler.
     * 
     * @memberOf HandlingBase
     */
    unsub(name: string, fn: TEventHandler): void {
        this.unsubscribe(name, fn);
    }
}
