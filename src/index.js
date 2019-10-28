import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import store from './redux/redux-store'
import * as serviceWorker from './serviceWorker'
import StoreContext from './StoreContext'

let rerenderEntireTree = () => {
   ReactDOM.render(
      <BrowserRouter>
         <StoreContext.Provider value={store}>
            <App />
         </StoreContext.Provider>
      </BrowserRouter>, document.getElementById('root'))
}
rerenderEntireTree()
store.subscribe(rerenderEntireTree)

serviceWorker.unregister()