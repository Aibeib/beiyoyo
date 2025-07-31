import { makeObservable, observable } from "mobx";
import getApi from '@/api/request'
import type { User } from "@/api/getUserInfo";
import type { LoginReq } from "@/api/login";
import type { RegisterUserReq } from "@/api/registerUser";

class UserStore{
  userInfo: User = {
    userID: '',
    userName: '',
    nickName: '',
    avatar: '',
  }
  constructor(){
    makeObservable(this,{
      userInfo: observable
    })
  }

  login = async (params: LoginReq) => {
    const { data } =  await getApi.login(params);
    this.userInfo.userID = data.userID
  }

  registerUser = async (params: RegisterUserReq) => {
    await getApi.registerUser(params);
  }

  getUserInfo = async () => {
    const userInfo = await getApi.getUserInfo()
    this.userInfo = userInfo.data.user
  }

}

export default  new UserStore()