export const loginUrl = '/login'
export interface LoginReq{
  email: string,
  password: string
}
export interface LoginResp {
  code: number,
  data: object
}