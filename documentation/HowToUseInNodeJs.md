#How to use Strongly Typed Events in Node.js?
We've got a node package for you! Install it the usual way:
```
npm i strongly-typed-events
```
## Code example
Using it is pretty straight forward:
```
/// <reference path="node_modules/strongly-typed-events/strongly-typed-events.d.ts" />

let _e = require('strongly-typed-events') as IStronglyTypedEvents;

export class TfsBuildClient {

    private _notifier = _e.createEventDispatcher<TfsBuildClient, IBuildData>();

    public get onNotify() : IEvent<TfsBuildClient, IBuildData>{
        return this._notifier.asEvent();
    }
}
```
## Exposed classes and methods
The following objects are exposed through the module exports:

```
    createEventDispatcher: <TSender, TArgs>() => EventDispatcher<TSender, TArgs>;
    createSimpleEventDispatcher: <TSender, TArgs>() => EventDispatcher<TSender, TArgs>;
    createSignalDispatcher: () => SignalDispatcher;

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

## Express Webserver
The following code will serve the strongly-typed-events.js file from the package to the client:
```
//web dependencies
var express = require('express');
var app = express();

app.get("/strongly-typed-events.js", function(req, res){
    res.sendFile('./node_modules/strongly-typed-events/strongly-typed-events.js', root);
});
```
