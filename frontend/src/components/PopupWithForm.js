import React from 'react';

function PopupWithForm({name, title, submit="Сохранить", isOpen, onClose, children, onSubmit, isDisabled}) {
    return (
        <div className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}>
        
            <div className="popup__container">
                <button type="button" 
                className="popup__exit" 
                onClick={onClose} />
            
                <h2 className="popup__title">{title}</h2>
            
                <form name={name} 
                className="popup__form popup__edit-button" 
                onSubmit={onSubmit} 
                noValidate>
                
                    {children}
                
                    <button className={`popup__submit ${!isDisabled ? "" : "popup__submit_disabled"}`}
                    disabled={isDisabled}
                    type="submit">{submit}</button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;