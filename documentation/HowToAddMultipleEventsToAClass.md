# How to add dynamic named events to a class?
Events can be implemented using <a href="HowToAddAnEventToAClass.md">private event dispatchers</a>. If you need more
events, it might be smart to use a more robust solution: the `EventList` or the `SimpleEventList`. It will create
the dispatchers automatically.

### Stopwatch example
To illustrate the handling of multiple event, I'll use the Stopwatch example. Any stopwatch has the following events:
start, pause, reset. The events will be implemented using an `EventList<Stopwacht, StopwatchEventArgs>`. It has 
a `get` method to get the event dispatcher by name. When it doesn't exists, one will be created an returned. The dispatch is 
done by calling the `dispatch` on the dispatcher.

```typescript
class Stopwatch {

    private _events = new EventList<Stopwatch, StopwatchEventArgs>();
    private _ticks = 0;
    private _timer: number;

    get onStart(): IEvent<Stopwatch, StopwatchEventArgs> {
        return this._events.get('onStart').asEvent();
    }

    get onPause(): IEvent<Stopwatch, StopwatchEventArgs> {
        return this._events.get('onPause').asEvent();
    }

    get onReset(): IEvent<Stopwatch, StopwatchEventArgs> {
        return this._events.get('onReset').asEvent();
    }

    private dispatch(name: string) {
        this._events.get(name).dispatch(
            this,
            new StopwatchEventArgs(this._ticks)
        );
    }

    start() {

        if (this._timer == null) {
            this._timer = Date.now();
            this.dispatch('onStart');
        }
    }

    pause() {

        if (this._timer) {
            this._ticks = this.getTicks();
            this._timer = null;
            this.dispatch('onPause');
        }
    }

    reset() {
        this._ticks = 0;
        this._timer = Date.now();
        this.dispatch('onReset');
    }

    getTicks() {
        if (this._timer) {
            return (Date.now() - this._timer) + this._ticks;
        }

        return this._ticks;
    }
}

class StopwatchEventArgs {
    private _ticks: number;

    get ticks(): number {
        return this._ticks;
    }

    constructor(ticks: number) {
        this._ticks = ticks;
    }
}

```

### EventList methods
The `EventList<TSender, TArgs>` and `SimpleEventList<TArgs>` share the same basic methods:

- `get(name)` - returns a dispatcher for the event with the given name.
- `remove(name)` - removed the dispatcher associated with the given name. This will disconnect all subscriptions.

### Non uniform event lists
Often events are not styled the same way and use different arguments. That's why the `NonUniformEventList` and `NonUniformSimpleEventList` were build. You can supply a type-map to define the name of the event and the type of the argument.

```typescript
type FileHandlesArgMap = {
    "rename": string,
    "openHandlesChange": number
};

class FileHandles
{
    private _myEvents = new NonUniformSimpleEventList<FileHandlesArgMap>();
    private _openHandles = 0;
    private _name: string;
    
    constructor(name){
        this._name = name;
    }

    rename(newName: string){
        this._name = newName;
        this._myEvents.get("rename").dispatchAsync(newName);
    }

    open(){
        this._openHandles++;
        this._myEvents.get("openHandlesChange").dispatch(this._openHandles);
    }

    close(){
        this._openHandles--;
        this._myEvents.get("openHandlesChange").dispatch(this._openHandles);
    }
    
    public get onRename(): ISimpleEvent<string>
    {
        return this._myEvents.get("rename").asEvent();
    }

    public get onOpenHandlesChange(): ISimpleEvent<number>
    {
        return this._myEvents.get("openHandlesChange").asEvent();
    }
}
```