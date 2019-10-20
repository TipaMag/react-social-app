// import React from 'react';
// import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import state from './redux/state';
import {addPost} from './redux/state';
import * as serviceWorker from './serviceWorker';
import { rerenderEntireTree } from './render';

rerenderEntireTree(state, addPost);

serviceWorker.unregister();