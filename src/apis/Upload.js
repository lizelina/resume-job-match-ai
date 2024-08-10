// Upload resume related APIs
import { request } from "../utils"

export function UploadResumeAPI (file) {
  return request({
    url: '/upload-resume',
    method: 'POST',
    data: file
  })
}
