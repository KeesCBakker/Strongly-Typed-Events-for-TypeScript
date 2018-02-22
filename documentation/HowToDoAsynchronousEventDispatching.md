# How to do asynchronous event dispatching?
Normally event dispatching using a `EventDispatcher<TSender, TArgs>` or `SimpleEventDispatcher<TArgs>`
is a synchronous process. This might not be desirable because a long event handler can hold up the rest of the
handlers from being executed. That's why dispatchers can dispatch asynchronously by calling `dispatchAsync`.

### Example
Conside the following example:

```typescript
QUnit.test('Testing simple event async dispatch', (assert) => {

    let dispatcher = new SimpleEventDispatcher<number>();

    let i = 0;

    dispatcher.subscribe((a) => {
        i = a;

        assert.equal(i, 1);
    });

    dispatcher.dispatchAsync(1);

    assert.equal(i, 0);
});
```
Dispatching is now done asynchronously.
