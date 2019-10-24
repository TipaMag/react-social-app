import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './redux/state';
import * as serviceWorker from './serviceWorker';

export let rerenderEntireTree = () => {
   
   for (let key in store) { // BindAll - привязка контекста ко всем методам объекта
      if (typeof store[key] == 'function') {
        store[key] = store[key].bind(store);
      }
    }
   ReactDOM.render(<App 
      state={store.getState()}
      addPost={store.addPost}
      updateNewPostText={store.updateNewPostText}
      addMessage={store.addMessage}
      updateNewMessageText={store.updateNewMessageText}
      />, document.getElementById('root'));
}
rerenderEntireTree()
store.subscribe(rerenderEntireTree)

serviceWorker.unregister();