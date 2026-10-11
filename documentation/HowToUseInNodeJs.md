# How to use Strongly Typed Events in Node.js?
Version 4.0.0 requires Node.js 22.22.2 or newer. Install the package:
```sh
npm install strongly-typed-events
```
## Code example
Using it is pretty straight forward:
```javascript
const { EventDispatcher } = require('strongly-typed-events');

class TfsBuildClient {
    _notifier = new EventDispatcher();

    get onNotify() {
        return this._notifier.asEvent();
    }

    notify(buildData) {
        this._notifier.dispatch(this, buildData);
    }
}

const client = new TfsBuildClient();
client.onNotify.subscribe((sender, buildData) => {
    console.log(buildData.status);
});
client.notify({ status: 'completed' });
```
Output: `completed`.

In TypeScript, use a named import (`import { EventDispatcher } from
"strongly-typed-events"`) and supply the sender and argument types when creating
the dispatcher, for example `new EventDispatcher<TfsBuildClient, IBuildData>()`
with your own `IBuildData` interface.
## Exposed classes and methods
Named exports include:

- Dispatchers: `EventDispatcher`, `SimpleEventDispatcher`, `SignalDispatcher`.
- Lists: `EventList`, `SimpleEventList`, `SignalList`.
- Handling base classes: `EventHandlingBase`, `SimpleEventHandlingBase`, `SignalHandlingBase`.
- Core building blocks: `EventListBase`, `DispatcherBase`, `DispatcherWrapper`.
- Promise variants, including `PromiseEventDispatcher`, `PromiseSimpleEventDispatcher`, and `PromiseSignalDispatcher`.

Construct dispatchers and lists with `new`; extend abstract base classes to
implement your own behavior. TypeScript interfaces and generic type parameters
do not exist at JavaScript runtime. See the
[public export list](../packages/strongly-typed-events/src/index.ts) for all exports.
