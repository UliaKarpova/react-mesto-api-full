import React from 'react';
import logo from '../images/logo.svg';

function Header({children}) {
    return (
        <header className="header">
            <a href={logo} 
            className="header__logo" />
            {children}
        </header>
    )
}

export default Header;