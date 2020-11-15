import { EventListBase, ISubscribable } from "..";

/**
 * Base class that implements event handling. With a an
 * event list this base class will expose events that can be
 * subscribed to. This will give your class generic events.
 * 
 * @export
 * @abstract
 * @class HandlingBase
 * @template TEventHandler 
 * @template TDispatcher 
 * @template TList 
 */
export abstract class HandlingBase<
    TEventHandler,
    TDispatcher extends ISubscribable<TEventHandler>,
    TList extends EventListBase<TDispatcher>
> {
    constructor(protected events: TList) {}

    /**
     * Subscribes once to the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    one(name: string, fn: TEventHandler): void {
        this.events.get(name).one(fn);
    }

    /**
     * Checks it the event has a subscription for the specified handler.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    has(name: string, fn: TEventHandler): boolean {
        return this.events.get(name).has(fn);
    }

    /**
     * Subscribes to the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    subscribe(name: string, fn: TEventHandler): void {
        this.events.get(name).subscribe(fn);
    }

    /**
     * Subscribes to the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    sub(name: string, fn: TEventHandler): void {
        this.subscribe(name, fn);
    }

    /**
     * Unsubscribes from the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    unsubscribe(name: string, fn: TEventHandler): void {
        this.events.get(name).unsubscribe(fn);
    }

    /**
     * Unsubscribes from the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    unsub(name: string, fn: TEventHandler): void {
        this.unsubscribe(name, fn);
    }
}
