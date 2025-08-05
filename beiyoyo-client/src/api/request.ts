import type { AxiosInstance } from "axios";
import instance from './index'
import { 
  registerUserUrl, 
  type RegisterUserReq, 
  type RegisterUserResp 
} from "./registerUser";
import { loginUrl, type LoginReq, type LoginResp } from "./login";
import { getUserInfoURL, type GetUserInfoReq, type GetUserInfoResp } from "./getUserInfo";
import { uploadPicURL, type UploadPicReq, type UploadPicResp } from "./uploadPic";
import { getPhotoListURL, type GetPhotoListReq, type GetPhotoListResp } from "./getPhotoList";
import { updateUserInfoURL, type UpdateUserInfoReq, type UpdateUserInfoResp } from "./updateUserInfo";
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
  uploadPic = (params: UploadPicReq): Promise<UploadPicResp> => {
    const formData = new FormData()
    console.log(params.photo,'params.photo')
    formData.append('subject', params.subject)
    formData.append('description', params.description)
    formData.append('photo',params.photo)
    return this.request({
      url: uploadPicURL,
      method: 'POST',
      data: formData
    })
  }

  getPhotoList = (params?: GetPhotoListReq): Promise<GetPhotoListResp> =>{
    return this.request({
      url: getPhotoListURL,
      method: 'GET',
      params: params
    })
  }

  updateUserInfo = (params: FormData): Promise<UpdateUserInfoResp> => {
    return this.request({
      url: updateUserInfoURL,
      method: 'PUT',
      data: params
    })
  }
}

export default new getApi()