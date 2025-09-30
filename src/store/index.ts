/**
 * 全局状态管理配置
 * 使用Redux Toolkit进行状态管理
 */
import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authReducer from './slices/authSlice'
import uiReducer from './slices/uiSlice'

// 持久化配置 - auth
const authPersistConfig = {
	key: 'auth',
	storage,
	whitelist: ['token', 'userInfo']
}

// 持久化配置 - ui
const uiPersistConfig = {
	key: 'ui',
	storage,
	whitelist: ['isDark']
}

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer)
const persistedUiReducer = persistReducer(uiPersistConfig, uiReducer)

// 配置store
export const store = configureStore({
	reducer: {
		auth: persistedAuthReducer,
		ui: persistedUiReducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
			}
		})
})

// 创建持久化store
export const persistor = persistStore(store)

// 导出类型
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
