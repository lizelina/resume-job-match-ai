// Encapsulation of Axios
import axios from "axios"
import { getToken } from "./token"
import router from "../router"
import { message } from "antd"

// 1. Root domain configuration
// 2. Timeout setting
// 3. Request interceptors / Response interceptors

const request = axios.create({
  baseURL: 'http://localhost:5004',
  timeout: 15000
})

// Adding request interceptor
// Intercept before sending the request 
request.interceptors.request.use((config) => {
  // Inject token data
  // 1. Get the token
  // 2. Concatenate the token according to the backend's format requirements
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
    console.log("headers", config.headers)
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

// Adding response interceptor
// Intercept before the response returns to the client to handle the returned data
request.interceptors.response.use((response) => {
  // return response
  return response.data;
}, (error) => {

  console.log('error', error)
  // This function is triggered for status codes outside the 2xx range.
  // Handle response errors
  if (error.response.status === 400) 
    { message.error('Unauthorized, please log in again') }
  if (error.response.status === 401) 
    { message.error('Unauthorized, please log in again') }
  router.navigate('/login')
  // return Promise.reject(error)
})

export { request }