import {
  DispatcherBase,
} from "ste-core";
import { describe, it } from "node:test";
import * as assert from "node:assert/strict";

describe("Features", () => {

  describe("onSubscriptionChange", () =>{

    type signal = () => void;
    class CustomDispatcher extends DispatcherBase<signal> {
      
      public onSubscriptionChangeTriggered = 0;

      constructor(){
        super();
        this.onSubscriptionChange.sub(()=>{
          this.onSubscriptionChangeTriggered++;
        });
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
      assert.deepStrictEqual(d.onSubscriptionChangeTriggered, 2);
    });

    it("Should trigger on sub/unsub and subscribe/unsubscribe", ()=>{
      var s = () => {};
      var d = new CustomDispatcher();
      d.sub(s);
      assert.deepStrictEqual(d.onSubscriptionChangeTriggered, 1);
      
      d.unsub(s);
      assert.deepStrictEqual(d.onSubscriptionChangeTriggered, 2);

      d.subscribe(s);
      assert.deepStrictEqual(d.onSubscriptionChangeTriggered, 3);

      d.unsub(s);
      assert.deepStrictEqual(d.onSubscriptionChangeTriggered, 4);
    });

    it("Should trigger after dispatch of one", ()=>{
      var s = () => {};
      var d = new CustomDispatcher();
      d.one(s);
      assert.deepStrictEqual(d.onSubscriptionChangeTriggered, 1);

      d.dispatch();
      assert.deepStrictEqual(d.onSubscriptionChangeTriggered, 2);
    });

    it("Should not trigger after dispatch of subscribe", ()=>{
      var s = () => {};
      var d = new CustomDispatcher();
      d.subscribe(s);
      assert.deepStrictEqual(d.onSubscriptionChangeTriggered, 1);

      d.dispatch();
      assert.deepStrictEqual(d.onSubscriptionChangeTriggered, 1);
    });


    it("Should tigger after clear when there are subscriptions", ()=>{
      var s = () => {};

      var d = new CustomDispatcher();
      d.clear();
      assert.deepStrictEqual(d.onSubscriptionChangeTriggered, 0);

      d.sub(s);
      assert.deepStrictEqual(d.onSubscriptionChangeTriggered, 1);

      d.clear();
      assert.deepStrictEqual(d.onSubscriptionChangeTriggered, 2);
    });


    it("Counters should match", ()=>{
      var s = () => {};
      var count = 0;
      var d = new CustomDispatcher();
      d.onSubscriptionChange.sub(cnt => count = cnt);
      d.sub(s);
      d.sub(s);

      assert.deepStrictEqual(count, d.count);

    });

  });

});
