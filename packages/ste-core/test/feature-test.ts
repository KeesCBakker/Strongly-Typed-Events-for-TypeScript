import {
  DispatcherBase,
} from "../src";
import { expect } from "chai";

describe("Features", () => {

  describe("onSubscriptionChange", () =>{

    type signal = () => void;
    class CustomDispatcher extends DispatcherBase<signal> {
      
      public onSubscriptionChangeTriggered = 0;
    
      protected onSubscriptionChange(){
        this.onSubscriptionChangeTriggered++;
      }

      public dispatch(){
        return this._dispatch(false, this, arguments);
      }
    }

    it("Should increase on subscribe/sub", ()=>{
      var s = () => {};
      var d = new CustomDispatcher();
      d.sub(s);
      d.subscribe(s);
      expect(d.onSubscriptionChangeTriggered).eql(2);
    });

    it("Should trigger on sub/unsub and subscribe/unsubscribe", ()=>{
      var s = () => {};
      var d = new CustomDispatcher();
      d.sub(s);
      expect(d.onSubscriptionChangeTriggered).eql(1);
      
      d.unsub(s);
      expect(d.onSubscriptionChangeTriggered).eql(2);

      d.subscribe(s);
      expect(d.onSubscriptionChangeTriggered).eql(3);

      d.unsub(s);
      expect(d.onSubscriptionChangeTriggered).eql(4);
    });

    it("Should trigger after dispatch of one", ()=>{
      var s = () => {};
      var d = new CustomDispatcher();
      d.one(s);
      expect(d.onSubscriptionChangeTriggered).eql(1);

      d.dispatch();
      expect(d.onSubscriptionChangeTriggered).eql(2);
    });

    it("Should not trigger after dispatch of subscribe", ()=>{
      var s = () => {};
      var d = new CustomDispatcher();
      d.subscribe(s);
      expect(d.onSubscriptionChangeTriggered).eql(1);

      d.dispatch();
      expect(d.onSubscriptionChangeTriggered).eql(1);
    });


    it("Should tigger after clear when there are subscriptions", ()=>{
      var s = () => {};

      var d = new CustomDispatcher();
      d.clear();
      expect(d.onSubscriptionChangeTriggered).eql(0);

      d.sub(s);
      expect(d.onSubscriptionChangeTriggered).eql(1);

      d.clear();
      expect(d.onSubscriptionChangeTriggered).eql(2);
    });


  });

});
