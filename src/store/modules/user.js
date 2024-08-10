import { createSlice } from '@reduxjs/toolkit'
import { setToken as _setToken, getToken, removeToken } from '../../utils'
import { loginAPI } from '../../apis/Login'

const userStore = createSlice({
  name: "user",
  // initial state
  initialState: {
    token: getToken() || '',
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload
      _setToken(action.payload)
    },
    clearToken(state) {
      state.token = ''
      removeToken()
    }
  }
})


// Get actions from userStore

const { setToken} = userStore.actions

// Get reducer 

const userReducer = userStore.reducer

// Login to fetch token
const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    const res = await loginAPI(loginForm)
    console.log('Login Response:', res) 
    if (res && res.token) {
      dispatch(setToken(res.token))
    } else {
      console.error('Token not found in response')
    }
  }
}


export { fetchLogin }

export default userReducer