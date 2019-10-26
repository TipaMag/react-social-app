import React from 'react';
import { Route } from "react-router-dom";
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Dialogs from './components/Dialogs/Dialogs';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';

const App = (props) => {
  return (
    <div className='app-wrapper'>
      <Header />
      <Navbar sidebar={props.state.sidebar} />
      <div className='app-wrapper-content'>
        <Route path='/profile' render={() => <Profile profilePage={props.state.profilePage} dispatch={props.dispatch} />} />
        <Route path='/dialogs' render={() => <Dialogs dialogsPage={props.state.dialogsPage} dispatch={props.dispatch} />} />
        <Route path='/News' component={News} />
        <Route path='/Music' component={Music} />
        <Route path='/Settings' component={Settings} />
      </div>
    </div>
  );
}

export default App;
