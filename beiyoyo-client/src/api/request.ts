import type { AxiosInstance } from "axios";
import instance from './index'
import { 
  registerUserUrl, 
  type RegisterUserReq, 
  type RegisterUserResp 
} from "./registerUser";
import { loginUrl, type LoginReq, type LoginResp } from "./login";
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
}

export default new getApi()