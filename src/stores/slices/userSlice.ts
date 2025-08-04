import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface User {
  id: string
  username: string
  email: string
  role: string
  status: string
  createTime: string
}

interface UserState {
  users: User[]
  loading: boolean
  error: string | null
  selectedUser: User | null
}

const initialState: UserState = {
  users: [
    {
      id: '1',
      username: 'admin',
      email: 'admin@example.com',
      role: '管理员',
      status: '启用',
      createTime: '2024-01-01',
    },
    {
      id: '2',
      username: 'user1',
      email: 'user1@example.com',
      role: '普通用户',
      status: '启用',
      createTime: '2024-01-02',
    },
  ],
  loading: false,
  error: null,
  selectedUser: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload)
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex(user => user.id === action.payload.id)
      if (index !== -1) {
        state.users[index] = action.payload
      }
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter(user => user.id !== action.payload)
    },
    setSelectedUser: (state, action: PayloadAction<User | null>) => {
      state.selectedUser = action.payload
    },
    clearError: (state) => {
      state.error = null
    },
  },
})

export const {
  setLoading,
  setError,
  addUser,
  updateUser,
  deleteUser,
  setSelectedUser,
  clearError,
} = userSlice.actions

export default userSlice.reducer 
