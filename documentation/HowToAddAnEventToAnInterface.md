#How to add an event to an interface?
Interfaces work a little different than <a href="HowToAddAnEventToAClass.md">events on classes<a>, because 
interfaces don't support 'getter' properies. The best way to implement them is with a method.

###Example

````
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

###Usage
````
let myObject: IMyInterface = new MyClass();
myObject.onMyEvent().subscribe((s: IMyInterface, a: IMyArgument) => {
	alert('Ping!');
});
````