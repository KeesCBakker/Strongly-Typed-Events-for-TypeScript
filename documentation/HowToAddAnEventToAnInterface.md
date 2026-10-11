# How to add an event to an interface?
Interfaces can expose events as readonly properties implemented by getters,
as shown in <a href="HowToAddAnEventToAClass.md">events on classes</a>.
The following example uses a method instead; both approaches are supported.

### Example

````typescript
import { EventDispatcher, IEvent } from "strongly-typed-events";

interface IMyInterface
{
	onMyEvent(): IEvent<IMyInterface, IMyArgument>;
}

class MyClass implements IMyInterface
{
	private _myEvent = new EventDispatcher<IMyInterface, IMyArgument>();
	
	public onMyEvent(): IEvent<IMyInterface, IMyArgument>
	{
		return this._myEvent.asEvent();
	};
}

interface IMyArgument
{
}
````

### Usage
````typescript
let myObject: IMyInterface = new MyClass();
myObject.onMyEvent().subscribe((s: IMyInterface, a: IMyArgument) => {
	alert('Ping!');
});
````
