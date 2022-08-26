import React from 'react';
import PopupWithForm from "./PopupWithForm";

function ImageDeletePopup({name, title, isOpen, submit, onClose, onSubmit}) {
    const isDisabled = false;
    return (
        <PopupWithForm name={name} 
        title={title} 
        isOpen={isOpen} 
        onClose={onClose} 
        onSubmit={onSubmit}
        submit={submit}
        isDisabled={isDisabled} />
    )
}

export default ImageDeletePopup;