// Jobs related APIs
import { request } from "../utils"

export function JobListAPI (id) {
  return request({
    url: '/parse',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify({ id: id })
  })
}

