# History

#### Version 2.1
It is now possible to subscribe to `onSubscriptionChange` on all dispatchers; this allows you to monitor a change in subscriptions. Both `onSubscriptionChange` and `asEvent` are (now) lazy loading.

Methods that will trigger a change: `subscribe`, `sub`, `unsubcribe`, `unsub`, `one` and sometimes `dispatch` (after a `one` trigger is dispatched and that trigger is removed).

#### Version 2.0
Better support for code splitting. All objects now recide in their own
class, which makes splitting and tree shaking easier and should produce
smaller packages.

New features:

- All `dispatch` methods will now return an <a href="../packages/ste-core/src/dispatching/IPropagationStatus.ts">IPropagationStatus</a> with an indication if the event was stopped (`propagationStopped`). Note: does not work for `dispatchAsync`, because this dispatch is not handled synchronously.
- We have support for `Promise` handlers, please check <a href="../packages/ste-promise-events/src/PromiseEventDispatcher.ts">PromiseEventDispatcher</a>, <a href="../packages/ste-promise-simple-events/src/PromiseSimpleEventDispatcher.ts">PromiseSimpleEventDispatcher</a> and <a href="../packages/ste-promise-signals/src/PromiseSignalDispatcher.ts">PromiseSignalDispatcher</a>.
- A new base class that will give classes generic events: <a href="../packages/ste-core/src/handling/HandlingBase.ts">HandlingBase</a>. This base class is now used by all the `...HandlingBase`-classes.

We now have the following packages:

|Package|Description|
|-------|-----------|
|<a href="https://www.npmjs.com/package/ste-core">`ste-core`</a>|Package that contains all the building blocks for the creation of events. The dispatcher implementation is its main hero.|
|<a href="https://www.npmjs.com/package/ste-events">`ste-events`</a> or <a href="https://www.npmjs.com/package/ste-promise-events">`ste-promise-events`</a>|Events that are modeled after .Net with a `sender` and `argument`. If you use typescript, you can leverage the support for generics and get strongly typed code.|
|<a href="https://www.npmjs.com/package/ste-simple-events">`ste-simple-events`</a> or <a href="https://www.npmjs.com/package/ste-promise-simple-events">`ste-promise-simple-events`</a>|A simpler version of the `ste-event`-event. No sender, just an argument.|
|<a href="https://www.npmjs.com/package/ste-signals">`ste-signals`</a> or <a href="https://www.npmjs.com/package/ste-promise-signals">`ste-promise-signals`</a>|A signal is even simpler, it is just a callback for when you need to be alerted without any scope.|
|<a href="https://www.npmjs.com/package/strongly-typed-events">`strongly-typed-events`</a>|This package includes everything.|
|<a href="https://www.npmjs.com/package/ste-browser">`ste-browser`</a>|Helps to host events in the browser.|
<br/>



#### Version 1.7
Added browser support for the individual flavors of events:

```html
<script src="https://cdn.jsdelivr.net/npm/ste-browser@latest/dist/ste-events.js"></script>
<script src="https://cdn.jsdelivr.net/npm/ste-browser@latest/dist/ste-events.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/ste-browser@latest/dist/ste-simple-events.js"></script>
<script src="https://cdn.jsdelivr.net/npm/ste-browser@latest/dist/ste-simple-events.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/ste-browser@latest/dist/ste-signals.js"></script>
<script src="https://cdn.jsdelivr.net/npm/ste-browser@latest/dist/ste-signals.min.js"></script>
```

#### Version 1.6
<a href="https://github.com/DustinWoods">@DustinWoods</a> added support for <a href="/documentation/HowToAddDynamicNamedEeventsToAClass.md#non-uniform-event-lists">non uniform event lists</a>.

#### Version 1.5
Added support for subscription `.count` from the dispatcher.

#### Version 1.4
Added support for UMD for the ste-browser package.


#### Version 1.3
We transformed the single package to 5 packages:

|Package|Description|
|-------|-----------|
|`ste-core`|Package that contains all the building blocks for the creation of events. The dispatcher implementation is its main hero.|
|`ste-events`|Events that are modeled after .Net with a `sender` and `argument`. If you use typescript, you can leverage the support for generics and get strongly typed code.|
|`ste-simple-events`|A simpler version of the `ste-event`-event. No sender, just an argument.|
|`ste-signals`|A signal is even simpler, it is just a callback for when you need to be alerted without any scope.|
|`strongly-typed-events`|This package includes everything.|

#### Version 1.2
Added `ev.stopPropagation` and `ev.unsub()` to aid in event management. Each event type has an extra parameter that can be used to manage the event:
```typescript
//log the name of the clock and the tick argument to the console - this is an event
clock.onClockTick.subscribe((c, n, ev) =>

  console.log(`${c.name} ticked ${n} times.`)

  //stop further event propagation:
  ev.stopPropagation();

  //unsubscribes the event handler that caused the event:
  ev.unsub();
);
```

#### Version 1.1
Removed the static. Internal restructuring of the package. Removed default exports, all exports are now named. _This is a breaking change_.
An unsubscribe function is now returned when registering a subscription: `let unsub = x.sub(x => {}); unsub();`.

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
