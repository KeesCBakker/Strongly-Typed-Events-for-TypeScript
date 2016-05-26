#IEvent<TSender, TArgs>
Events were introduced in version 0.1 and are modelled after the 
<a href="https://msdn.microsoft.com/en-us/library/edzehd2t(v=vs.110).aspx">event handling in Microsoft .Net</a>.
Events are defined as a generic sender and a generic argument. This gives you full control over the data types
that need to be used. The classes in the project help to add even handling to your objects.

##Using the dispatcher
The `EventDispatcher` is the basis of the system; it will help to add an event to your class. The event can
be exposed as an `IEvent`. Observe the following class:

````
	class MyEventTester {
		private _myEvent: EventDispatcher<MyEventTester, string> = new EventDispatcher<MyEventTester, string>();

		get myEvent(): IEvent<MyEventTester, string> {
			return this._myEvent;
		}

		signal(str: string): void {
			this._myEvent.dispatch(this, str);
		}
	}

	let handler = (sender: MyEventTester, args: string) => {
        r = args;
    };

    s.myEvent.subscribe((sender: MyEventTester, args: string) => {
		alert(args);
	});

    s.signal('Test1');
````
The dispatcher is declared as a private variable and used by the implementation of the event. The dispatcher
implements the `IEvent` interface, that why the entire dispatcher can be returned.

## Events on interfaces
Interfaces don't have properties that only have getters. That's why events should be implemented using a method:

```
interface IClock {
  onTick(): IEvent<IClock, number>;
}
```
Use it:
```
let clock: IClock = new Clock(5000);
clock.onTick().subscribe((sender, ticks) => alert('Tick-tock #' + ticks));
```
Check the <a href="https://github.com/KeesCBakker/Strongly-Typed-Events-for-TypeScript/blob/master/example.clock.ts">Clock example</a> for more details or read: <a href="http://keestalkstech.com/2016/03/using-strongly-typed-events-in-typescript-with-interfaces-part2/">Using strongly typed events in TypeScript with interfaces (Part 2)</a>

## Need something more robust?
Do you need to handle a lot of events? Use an `EventList` as store for the events. Events will be automatically created.
```
class MyClass {

    private _events: EventList<MyClass, EventArgs> = new EventList<MyClass, EventArgs>();

    get onStart(): IEvent<MyClass, EventArgs> {
        return this._events.get('onStart');
    }

    start(): void {
        this._events.get('onStart').dispatch(this, null);
```
More info? Check: <a href="http://keestalkstech.com/2016/03/strongly-typed-events-in-typescript-using-an-event-list-part-3/">Strongly Typed Events in TypeScript using an event list (Part 3)</a>

## Add named events to your class
Need to add named event support to your class? Implement the `IEventHandling` interface or extend from the abstract `EventHandlingBase` class. 
```
class EventTester implements IEventHandling<EventTester, EventTesterArgs>
{
    private _events: EventList<EventTester, EventTesterArgs> = new EventList<EventTester, EventTesterArgs>();

    subscribe(name: string, fn: (sender: EventTester, args: EventTesterArgs) => void): void {
        this._events.get(name).subscribe(fn);
    }

    unsubscribe(name: string, fn: (sender: EventTester, args: EventTesterArgs) => void): void {
        this._events.get(name).unsubscribe(fn);
    }
}

class EventTesterArgs { }
```
More info? Check: <a href="http://keestalkstech.com/2016/03/adding-named-events-to-your-class-part-4/">Adding named events to your TypeScript classes (Part 4)</a>
