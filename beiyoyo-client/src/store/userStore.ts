import { makeObservable, observable } from "mobx";
import getApi from '@/api/request'
import type { User } from "@/api/getUserInfo";
import type { LoginReq } from "@/api/login";
import type { RegisterUserReq } from "@/api/registerUser";
import type { UploadPicReq } from "@/api/uploadPic";
import type { PhotoInfo } from "@/api/getPhotoList";

class UserStore{
  userInfo: User = {
    userID: '',
    userName: '',
    nickName: '',
    avatar: '',
  }
  photoList: PhotoInfo[] = []
  constructor(){
    makeObservable(this,{
      userInfo: observable,
      photoList: observable
    })
  }

  init = async () => {
    await this.getUserInfo()
    await this.getPhotoList()
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
  
  uploadPic = async (data: UploadPicReq) => {
     await getApi.uploadPic(data)
     await this.getPhotoList()
  }

  getPhotoList = async() => {
    const data = await getApi.getPhotoList()
    const {photoList}  = data.data
    this.photoList = photoList
  }

}

export default  new UserStore()