# History

#### Version 1.1
Removed the static. Internal restructuring of the package. Removed default exports, all exports are now named. _This is a breaking change_.

#### Version 1.0
Added default exports. Removed emulation through window. 

#### Version 0.5
Restructured includes for 'normal' web applications. Using `import` / `export` mechanisme. Emulating `exports` and `require` nodes through the `window` object for web.

#### Version 0.4
Introduced the `one` method on events to subscribe only once. Added `sub` and `unsub` methods as shorthands for `subscribe` and `unsubscribe`. Added a `has` method to check if a handler has been registered.
Now supports Node.js through npm package: `npm i strongly-typed-events`. Rewrote and split tests.<br/>
0.4.2: Introduced the `clear` method on events to clear all subscriptions.

#### Version 0.3
Introduced signal &ndash; events that contain no data and just fire. The unit tests now support modules. The following objects and features are present in this version:
- `ISignal` &ndash; Event handler function for a signal.
- `SignalDispatcher` &ndash; Dispatcher implementation for signals. Can be used to subscribe, 
unsubscribe or dispatch events. Use the ToEvent() method to expose the event.
- `SignalList` &ndash; Storage class for multiple signals that are accessible by name. Dispatchers are automatically created.
- `SignalHandlingBase` &ndash; Extends objects with signal handling capabilities.

#### Version 0.2
Introduced simple events &ndash; events that only use an arguments object. I've added many base classes and 
interfaces to make sure the base for both type of events are the same. The following objects and features are present in this version:

- `ISimpleEvent<TArgs>` &ndash; Event handler function with a generic argument.
- `SimpleEventDispatcher<TArgs>` &ndash; Dispatcher implementation for simple events. Can be used to subscribe, 
unsubscribe or dispatch events. Use the ToEvent() method to expose the event
- `SimpleEventList<TArgs>` &ndash; Storage class for multiple events that are accessible by name. Events dispatchers are automatically created.
- `SimpleEventHandlingBase<TArgs>` &ndash; Extends objects with simple event handling capabilities.
- Added an `asEvent` method to the dispatchers that will expose only the subsribe / unsubscribe methods. This will prevent
the `dispatch` method from being exposed through the events.
- Added an `dispatchAsync` method to the dispatchers that will execute all subsriptions asynchronously. 
<a href="documentation/HowToDoAsynchronousEventDispatching.md">Check this for more information</a>.

#### Version 0.1
Introducing the events - use a generic sender and a generic argument to dispatch events through your projects. The following 
objects and features are present in this version:

- `IEvent<TSender, TArgs>` &ndash; Event handler function with a generic sender and a generic argument.
- `EventDispatcher<TSender, TArgs>` &ndash; Dispatcher implementation for events. Can be used to subscribe, 
unsubscribe or dispatch events. Use the ToEvent() method to expose the event.
- `EventList<TSender, TArgs>` &ndash; Storage class for multiple events that are accessible by name. Events dispatchers are automatically created.
- `EventHandlingBase<TSender, TArgs>` &ndash; Extends objects with event handling capabilities.