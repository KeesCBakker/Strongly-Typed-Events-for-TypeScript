# How to add multiple events to a class?

Need to add named event support to your class? Implement the `IEventHandling<TSender, TArgs>` or 
`ISimpleEventHandling<TArgs>` interface or extend from the abstract `EventHandlingBase` or `SimpleEventHandlingBase` class.

### Example
```typescript
import { EventList, IEventHandling, IEventHandler } from "strongly-typed-events";

class DynamicEventsExample implements IEventHandling<DynamicEventsExample, DynamicEventsExampleArgs>
{
    private _events = new EventList<DynamicEventsExample, DynamicEventsExampleArgs>();

    subscribe(name: string, fn: IEventHandler<DynamicEventsExample, DynamicEventsExampleArgs>) {
        this._events.get(name).subscribe(fn);
    }

    unsubscribe(name: string, fn: IEventHandler<DynamicEventsExample, DynamicEventsExampleArgs>) {
        this._events.get(name).unsubscribe(fn);
    }

    sub(name: string, fn: IEventHandler<DynamicEventsExample, DynamicEventsExampleArgs>) {
        this.subscribe(name, fn);
    }

    unsub(name: string, fn: IEventHandler<DynamicEventsExample, DynamicEventsExampleArgs>) {
        this.unsubscribe(name, fn);
    }

    one(name: string, fn: IEventHandler<DynamicEventsExample, DynamicEventsExampleArgs>) {
        this._events.get(name).one(fn);
    }

    has(name: string, fn: IEventHandler<DynamicEventsExample, DynamicEventsExampleArgs>) {
        return this._events.get(name).has(fn);
    }

    dispatch(name: string, sender: DynamicEventsExample, args: DynamicEventsExampleArgs) {
        this._events.get(name).dispatch(sender, args);
    }
}

class DynamicEventsExampleArgs
{
	public value: string = "";
}
```

The `dispatch` method is for demo purposes and doesn't need to be exposed. Normally a class would keep the dispatch private.
