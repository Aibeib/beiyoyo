import type { AxiosInstance } from "axios";
import instance from './index'
import { 
  registerUserUrl, 
  type RegisterUserReq, 
  type RegisterUserResp 
} from "./registerUser";
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
}

export default new getApi()