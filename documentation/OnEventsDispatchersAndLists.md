#On events, dispatchers and lists (a general explanation of the system)
The system works with the following classes and interfaces:

- **Events**<br/> This is how events are exposed to the ourside world
	- `IEvent<TSender, TArgs>` &ndash;  models an event with a generic sender and generic argument.
	- `ISimpleEvent<TArgs>` &ndash; Models a simple event with a generic argument.
	- `ISubscribable<THandlerType>` &ndash; Base interface for the events. Not used outside the system. Helps to make an abstraction
over events by making the handler of an event generic. Needed for the system to make base features.<br/><br/>
- **Handlers**<br/> This is how the the outside world subscribes to an event. It defines the function signature.
	- `IEventHandler<TSender, TArgs>` &ndash; `(sender: TSender, args: TArgs): void` &ndash; this handler is for events.
	- `ISimpleEventHandler<TArgs>` &ndash; `(args: TArgs): void` &ndash; this handler is for simple events.<br/><br/>
- **Dispatchers**<br/>This is how events are implemented. It implements a `subscribe`, `unsubscribe` and provides a
`dispatch` method for dispatching the events. Dispatchers make the whole system work.
	- `EventDispatcher<TSender, TArgs>` &ndash; implements a dispatcher for events.
	- `SimpleEventDispatcher<TArgs>` &ndash; implements a dispatcher for simple events.
	- `DispatcherBase<TEventHandler>` &ndash; abstract base class to implement dispatchers.<br/><br/>
- **Eventlists**<br/>Helps with the implementation of multiple named events. Events are automatically created when a `get` is called.
Uses when <a href="HowToAddMultipleEventsToAClass.md">implementing multiple events on a class</a>.
	- `EventList<TSender, TArgs>` &ndash; implements an event list for events.
	- `SimpleEventList<TArgs>` &ndash; implements an event list for simple events.
	- `EventListBase<TEventDispatcher>` &ndash; abstract base class for event lists.<br/><br/>