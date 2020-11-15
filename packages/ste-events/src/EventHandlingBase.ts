import { IEventHandling } from "./IEventHandling";
import { IEventHandler } from "./IEventHandler";
import { EventList } from "./EventList";

/**
 * Extends objects with event handling capabilities.
 */

export abstract class EventHandlingBase<TSender, TArgs>
    implements IEventHandling<TSender, TArgs> {
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
     * Subscribes to the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    sub(name: string, fn: IEventHandler<TSender, TArgs>): void {
        this.subscribe(name, fn);
    }

    /**
     * Unsubscribes from the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    unsubscribe(name: string, fn: IEventHandler<TSender, TArgs>): void {
        this._events.get(name).unsubscribe(fn);
    }

    /**
     * Unsubscribes from the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    unsub(name: string, fn: IEventHandler<TSender, TArgs>): void {
        this.unsubscribe(name, fn);
    }

    /**
     * Subscribes to once the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    one(name: string, fn: IEventHandler<TSender, TArgs>): void {
        this._events.get(name).one(fn);
    }

    /**
     * Subscribes to once the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    has(name: string, fn: IEventHandler<TSender, TArgs>): boolean {
        return this._events.get(name).has(fn);
    }
}
