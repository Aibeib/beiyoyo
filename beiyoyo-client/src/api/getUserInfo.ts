export const getUserInfoURL = '/api/get/user'

export interface GetUserInfoReq {
  userID: string
}

export type User = {
  nickName: string,
  userID: string,
  avatar: string,
  userName: string,
  backgroundImage: string
}
export interface GetUserInfoResp{
  code: number,
  message: string,
  data:{
    user: User
  }
}
