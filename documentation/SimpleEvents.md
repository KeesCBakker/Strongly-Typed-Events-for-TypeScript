#ISimpleEvent<TArgs>
Simple vents were introduced in version 0.2. They only have a generic argument object, that's why they are simpler than
their IEvent counterpart (that also has a sender). They work the same as their counterpart.

##Using the dispatcher
The `SingleEventDispatcher` will help to implement an `ISimpleEvent`. Observe the following class:

````
	class MyEventTester {
		private _myEvent: SimpleEventDispatcher<string> = new EventDispatcher<string>();

		get myEvent(): ISimpleEvent<string> {
			return this._myEvent.asEvent;
		}

		signal(str: string): void {
			this._myEvent.dispatch(str);
		}
	}

	let handler = (args: string) => {
        r = args;
    };

    s.myEvent.subscribe((args: string) => {
		alert(args);
	});

    s.signal('Test1');
````
The dispatcher is declared as a private variable and used by the implementation of the event. The dispatcher
implements the `ISimpleEvent` interface, that why the entire dispatcher can be returned.

