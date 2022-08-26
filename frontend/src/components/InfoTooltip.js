import React from 'react';
import done from '../images/Done.svg';
import error from '../images/Error.svg';

function InfoTooltip({name, isOpen, isUserRegistred, onCloseAndRedirect, onClose}) {

    return (
        <div className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}>
        
        <div className="popup__container">
            <button type="button" 
            className="popup__exit" 
            onClick={isUserRegistred ? onCloseAndRedirect : onClose} />
        
            <div
            className='popup__icon'
            style={{
                backgroundImage: `url(${isUserRegistred ? done : error})`
            }}></div>
            
            <h2 className="popup__message">{isUserRegistred ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</h2>
        </div>
    </div>
    )
}

export default InfoTooltip;