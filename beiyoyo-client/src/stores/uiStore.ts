import { makeObservable, observable } from "mobx";
import { Them } from "./type";

class Store{
  them: Them = Them.Dark
  constructor(){
    makeObservable(this,{
      them: observable
    })
  }
  setThem = (them:Them)=>{
    this.them = them
  } 
}

export const UIStore = new Store()