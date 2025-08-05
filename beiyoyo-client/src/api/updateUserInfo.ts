export const updateUserInfoURL = '/api/update/info'
export interface UpdateUserInfoReq {
  nickName: string,
  backgroundImage: File
  avatar: File
}
export interface UpdateUserInfoResp {
  code: number,
  data: {},
  message: string
}