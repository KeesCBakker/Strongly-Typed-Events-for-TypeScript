# How to add an event to a class?

Adding an event to a class is pretty easy. Expose it an an `IEvent<TSender, TArgs>` or 
`ISimpleEvent<TArgs>` and implement it as a dispatcher (`EventDispatcher` or `SimpleEventDispatcher`).

### Example
Conside the following example:

```typescript
import { EventDispatcher, IEvent } from "strongly-typed-events";

class MyClass
{
	private _myEvent = new EventDispatcher<MyClass, string>();
	
	public get onMyEvent(): IEvent<MyClass, string>
	{
		return this._myEvent.asEvent();
	}

	public signal(message: string)
	{
		if(message) {
			this._myEvent.dispatch(this, message);	
		}
	}
}
```
The event itself is exposed by a getter. The implementation can return the entire event dispatcher 
or class the `asEvent()` on the dispatcher to return a wrapper with the dispatcher.


### Usage
Subscibing to an event is pretty straight forward:
```typescript
let myObject = new MyClass();
myObject.onMyEvent.subscribe((s: MyClass, a: string) => {
	alert(s);
});
```

An event handler can be unsubscribed like this:

```typescript
let unsubscribe = myObject.onMyEvent.subscribe((s: MyClass, a: string) => {
	alert(s);
});
unsubscribe();
``` 

### Event methods
The `IEvent<TSender, TArgs>`, `ISimpleEvent<TArgs>`, `EventDispatcher<TSender, TArgs>`, `SimpleEventDispatcher<TArgs>` share the
same basic methods:

- `subscribe(eventHandler)` - subscribes to the event by registring an event handler. The handler will be executed when
the event is dispatched. The subscribe method returns a function that can be used to unsubscribe the eventHandler directly.
- `unsubscribe(eventHandler)` - removes the subscription by removing the handler. This will stop the handler from being executed
when the event is dispatched.

Only the `EventDispatcher<TSender, TArgs>` and `SimpleEventDispatcher<TArgs>` have a `dispatch` method:

- `EventDispatcher.dispatch(sender, args)` - calls the registered handlers with the sender and arguments.
- `SimpleEventDispatcher.dispatch(args)` - calls the registered handlers with the arguments.
