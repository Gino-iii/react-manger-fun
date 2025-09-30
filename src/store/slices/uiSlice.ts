import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import storage from '@/utils/storage'

interface UiState {
  collapsed: boolean
  isDark: boolean
}

const initialState: UiState = {
  collapsed: false,
  isDark: storage.get('isDark') || false
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    updateCollapsed: (state) => {
      state.collapsed = !state.collapsed
    },
    updateTheme: (state, action: PayloadAction<boolean>) => {
      state.isDark = action.payload
      storage.set('isDark', action.payload)
    }
  }
})

export const { updateCollapsed, updateTheme } = uiSlice.actions
export default uiSlice.reducer
