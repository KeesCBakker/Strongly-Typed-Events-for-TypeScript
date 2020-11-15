/**
 * Base class for event lists classes. Implements the get and remove.
 */
export abstract class EventListBase<TEventDispatcher> {
    
    private _events: { [name: string]: TEventDispatcher } = {};

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
        delete this._events[name];
    }

    /**
     * Creates a new dispatcher instance.
     */
    protected abstract createDispatcher(): TEventDispatcher;
}
