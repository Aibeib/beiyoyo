import type { AxiosInstance } from "axios";
import instance from './index'
import { 
  registerUserUrl, 
  type RegisterUserReq, 
  type RegisterUserResp 
} from "./registerUser";
import { loginUrl, type LoginReq, type LoginResp } from "./login";
import { getUserInfoURL, type GetUserInfoReq, type GetUserInfoResp } from "./getUserInfo";
class getApi {
 private request: AxiosInstance
  constructor() {
    this.request = instance
  }

  registerUser = (params: RegisterUserReq): Promise<RegisterUserResp> => {
    return this.request({
      url: registerUserUrl,
      method: 'POST',
      data: params
    })
  }

  login = (params: LoginReq): Promise<LoginResp> => {
    return this.request({
      url: loginUrl,
      method: 'POST',
      data: params
    })
  }

  getUserInfo = (params?: GetUserInfoReq): Promise<GetUserInfoResp> => {
    return this.request({
      url: getUserInfoURL,
      method: 'GET',
      params
    })
  }
}

export default new getApi()