import { makeObservable, observable } from "mobx";

class UserStore{
  user: object = {}
  value: object
  constructor(value: Record<string, unknown>){
    makeObservable(this,{
      user:observable
    })
    this.value = value
  }
}

export default UserStore