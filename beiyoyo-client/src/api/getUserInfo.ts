export const getUserInfoURL = '/api/get/userInfo'
export interface GetUserInfoReq {}

export type User = {
  name: string,
  id: string,
  avatar: string,
}
export interface GetUserInfoResp{
  code: number,
  message: string,
  data:{
    user:User
  }
}
