export const getPhotoListURL = '/api/getPhotoList'
export type GetPhotoListReq = object
export type PhotoInfo = {
  subject: string,
  description: string,
  picUrl: string,
  createAt: number
}
export interface GetPhotoListResp {
  code: number,
  message: string,
  data: {
    photoList: PhotoInfo[]
  }
}