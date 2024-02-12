import {BrowserRouter} from 'react-router-dom'
import AppRouter from './AppRouter.tsx'
import {Provider} from 'react-redux'
import {store} from '../store/redux-store.ts'
function App() {

  return (
      <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
      </Provider>
  )
}

export default App
