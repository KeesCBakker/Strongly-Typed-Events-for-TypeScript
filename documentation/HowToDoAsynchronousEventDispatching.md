# How to do asynchronous event dispatching?
Normally event dispatching using a `EventDispatcher<TSender, TArgs>` or `SimpleEventDispatcher<TArgs>`
is a synchronous process. Calling `dispatchAsync` schedules the handlers with
timers and returns before they run. Handlers still run on the same JavaScript
thread, so a long-running handler can still block other handlers.

### Example
Conside the following example:

```javascript
const assert = require('node:assert/strict');
const { SimpleEventDispatcher } = require('strongly-typed-events');

async function example() {
    const dispatcher = new SimpleEventDispatcher();
    let value = 0;
    const handled = new Promise(resolve => {
        dispatcher.one(argument => {
            value = argument;
            resolve();
        });
    });

    dispatcher.dispatchAsync(1);
    assert.equal(value, 0);
    await handled;
    assert.equal(value, 1);
}

example().catch(error => {
    console.error(error);
    process.exitCode = 1;
});
```
The example completes without assertion failures. `dispatchAsync` does not
return a Promise to await handler completion and cannot stop propagation between
scheduled handlers. Use a Promise dispatcher when handlers return Promises.
