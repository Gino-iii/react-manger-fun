import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store'
import App from './App'

// 使用React 18的新API创建根节点并渲染应用
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // 注意：这里注释掉了StrictMode，在生产环境中建议启用
  // StrictMode会帮助发现潜在问题，但可能会触发重复渲染
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
  // </React.StrictMode>
)
