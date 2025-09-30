import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '@/types/api'

interface AuthState {
  token: string
  userInfo: User.UserItem
}

const initialState: AuthState = {
  token: '',
  userInfo: {
    _id: '',
    userId: 0,
    userName: '',
    userEmail: '',
    deptId: '',
    state: 0,
    mobile: '',
    job: '',
    role: 0,
    roleList: '',
    createId: 0,
    deptName: '',
    userImg: ''
  }
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    },
    updateUserInfo: (state, action: PayloadAction<User.UserItem>) => {
      state.userInfo = action.payload
    },
    clearAuth: (state) => {
      state.token = ''
      state.userInfo = initialState.userInfo
    }
  }
})

export const { updateToken, updateUserInfo, clearAuth } = authSlice.actions
export default authSlice.reducer
