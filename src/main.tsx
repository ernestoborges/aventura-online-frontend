import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from "react-redux"
import { store } from './app/store.ts'
import { SkeletonTheme } from 'react-loading-skeleton'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <SkeletonTheme baseColor= "#303030" highlightColor="#444">
      <App />
    </SkeletonTheme>
  </Provider>
)
