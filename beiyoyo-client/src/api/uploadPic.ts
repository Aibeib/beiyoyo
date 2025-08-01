export const uploadPicURL = '/api/upload/photo'
export interface UploadPicReq {
  subject: string,
  description: string,
  photo: File
}
export interface UploadPicResp {
  code: number,
  message: string,
  data: {
    picUrl: string
  }
}
