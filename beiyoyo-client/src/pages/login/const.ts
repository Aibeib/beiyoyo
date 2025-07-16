export enum LoginFormType {
  Login = 'login',
  Register = 'register',
  UpdatePassword = 'updatePassword'
}
export const BtnTextMapper = {
  [LoginFormType.Login]:'登录',
  [LoginFormType.Register]:'注册',
  [LoginFormType.UpdatePassword]:'更新密码',
}