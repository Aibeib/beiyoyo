export const loginUrl = '/api/login'
export interface LoginReq{
  email: string,
  password: string
}
export interface LoginResp {
  code: number,
  data: {
    userID: string
  }
}