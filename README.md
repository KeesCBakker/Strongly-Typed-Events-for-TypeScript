# Strongly Typed Events for TypeScript
This project will give your classes (and interfaces) a nice & easy way to add events.

## Events are easy!
Events can be added as a gettable property to the class.

1. Add a private event dispatcher to your class: <br/>
`private _onPulsate: EventDispatcher<PulseGenerator, number> = new EventDispatcher<PulseGenerator, number>();`<br/>

2. Add a public event getter to your class: <br/>
`get onPulsate(): IEvent<PulseGenerator, number> { return this._onPulsate; ` }<br/>

3. Dispatch an event using `dispatch`: <br/>
`this._onPulsate.dispatch(this, 1337);`<br/>

4. Subscribe to the event<br/>
`x.onPulsate((generator, frequency) => { alert(frequency); }`<br/>

Check the <a href="https://github.com/KeesCBakker/Strongly-Typed-Events-for-TypeScript/blob/master/example.pulse-generator.ts">Pulse Generator example</a> for more details or read: <br/> http://keestalkstech.com/2016/03/strongly-typed-event-handlers-in-typescript-part-1/

## Events on interfaces
Interfaces don't have properties that only have getters. That's why events should be implemented using a method:

```
interface IClock {
  onTick(): IEvent<IClock, number>;
}
```

Use it like:

```
let clock: IClock = new Clock(5000);
clock.onTick().subscribe((sender, ticks) => alert('Tick-tock #' + ticks));
```

Check the Clock example for more details or read: <br/>
http://keestalkstech.com/2016/03/using-strongly-typed-events-in-typescript-with-interfaces-part2/


## Need something more robust?
What is you need to handle a lot of events? 
