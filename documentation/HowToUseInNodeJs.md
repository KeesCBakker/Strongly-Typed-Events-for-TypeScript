# How to use Strongly Typed Events in Node.js?
We've got a node package for you! Install it the usual way:
```
npm install strongly-typed-events --save
```
## Code example
Using it is pretty straight forward:
```typescript
const { EventDispatcher } = require('strongly-typed-events');

export class TfsBuildClient {

    private _notifier = new EventDispatcher<TfsBuildClient, IBuildData>();

    public get onNotify() {
        return this._notifier.asEvent();
    }
}
```
## Exposed classes and methods
The following classes are exposed through the module exports:

```typescript
    EventDispatcher: <TSender, TArgs>() => EventDispatcher<TSender, TArgs>;
    SimpleEventDispatcher: <TArgs>() => SimpleEventDispatcher<TArgs>;
    SignalDispatcher: () => SignalDispatcher;

    EventList: <TSender, TArgs>() => EventList<TSender, TArgs>;
    SimpleEventList: <TArgs>() => SimpleEventList<TArgs>;
    SignalList: () => SignalList;

    EventHandlingBase: <TSender, TArgs>() => EventHandlingBase<TSender, TArgs>;
    SimpleEventHandlingBase: <TArgs>() => SimpleEventHandlingBase<TArgs>;
    SignalHandlingBase: () => SignalHandlingBase;

    EventListBase: <TEventDispatcher>() => EventListBase<TEventDispatcher>;
    DispatcherBase: <TEventHandler>() => DispatcherBase<TEventHandler>;
    DispatcherWrapper: <THandlerType>() => DispatcherWrapper<THandlerType>;
```
