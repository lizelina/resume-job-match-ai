// Login related APIs
import { request } from "../utils"

export function loginAPI (formData) {
  return request({
    url: '/login',
    method: 'POST',
    data: formData
  })
}
