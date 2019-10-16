import React from 'react';
import './Header.css';
import Clock from './Clock/Clock';

const Header = () => {
   return(
      <header className='header'>
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6hIhoCOwJSxZkDCwwPot9ql1mwwjenBu7z68zKaRUzFvnZ_Hp8Q' alt='headerImg'></img>
        <Clock />
      </header>
   );
}

export default Header;