import React from "react";
import {useRef, useEffect, useState} from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, submitStatus}) {
    const [isDisabled, setIsDisabled] = useState(false);
    const avatarRef = useRef('');
    const [isValid, setIsValid] = useState(true);
    const [validationMessage, setValidationMessage] = useState("");
    
    useEffect(() => {
        setIsDisabled(submitStatus || !isValid);
    }, [submitStatus, isValid])    

    useEffect(() => {
        avatarRef.current.value = "";
        setIsValid(false);
        setValidationMessage("");
    }, [isOpen])

    function handleSubmit(event) {
        event.preventDefault();
        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    function validateForm(event) {
        setIsValid(event.target.validity.valid);
        setValidationMessage(event.target.validationMessage);
    }

    return (
        <PopupWithForm name="change-avatar" 
        title="Обновить аватар" 
        isOpen={isOpen} 
        onClose={onClose} 
        onSubmit={handleSubmit}
        submitStatus={submitStatus} 
        isDisabled={isDisabled} >
            
            <input className="popup__item"
            id="avatar-link" 
            name="link" 
            type="url" 
            onChange={validateForm}
            defaultValue=""
            ref={avatarRef} 
            placeholder="Ссылка на изображение" 
            required />
            
            <span className={`popup__item-error avatar-link-error ${!isValid && "popup__item-error_visible"}`}>
            {validationMessage}</span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;