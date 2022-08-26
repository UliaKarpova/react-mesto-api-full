import React from 'react';

function Footer() {
    const year = new Date();
    
    return (
        <footer className="footer">
            <p className="footer__copyright">&copy; {year.getFullYear()} Юлия Карпова</p>
        </footer>
    )
}

export default Footer;