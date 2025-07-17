export const registerUserUrl = '/register'
export interface RegisterUserReq {
  email: string,
  password: string,
  verificationCode: string
}
export interface RegisterUserResp {
  code: number,
  msg: string,
  data: {
    userID: string
  }
}