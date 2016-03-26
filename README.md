# Strongly Typed Events for TypeScript
This project will give your classes (and) interfaces a nice & easy way to add events.

## Events are easy!

1. Add a private event dispatcher to your class: <br/>
`private _onPulsate: EventDispatcher<PulseGenerator, number> = new EventDispatcher<PulseGenerator, number>();`<br/>

2. Add a public event getter to your class: <br/>
`get onPulsate(): IEvent<PulseGenerator, number> { return this._onPulsate; ` }<br/>

3. Dispatch an event using `dispatch`: <br/>
`this._onPulsate.dispatch(this, 1337);`<br/>

4. Subscribe to the event<br/>
`x.onPulsate((generator, frequency) => { alert(frequency); }`<br/>

Check the Pulse Generator Example for more details.

## Need something more robust?
What is you need to handle a lot of events? 
