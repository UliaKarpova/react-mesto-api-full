import React from "react";
import {useEffect, useState} from 'react';
import PopupWithForm from "./PopupWithForm";


function AddPlacePopup({submit, isOpen, onClose, onSubmit, submitStatus}) {
    const [isDisabled, setIsDisabled] = useState(false);
    const [values, setValues] = useState({});
    const [isValid, setIsValid] = useState(true);
    const [validationMessages, setValidationMessages] = useState({});
    

    useEffect(() => {
        setIsDisabled(submitStatus || !isValid);
    }, [submitStatus, isValid])

    useEffect(() => {
        setValues({});
        setIsValid(false);
        setValidationMessages({});
    }, [isOpen])


    function handleChange(event) {
        const {name, value} = event.target;
        setValues({...values, [name]: value});
        setIsValid(event.target.closest('form').checkValidity());
        setValidationMessages({...validationMessages, [name]: event.target.validationMessage});
    }

    function handleSubmit(event) {
        event.preventDefault();
        onSubmit({
            name: values.name,
            link: values.link
        });
    }

    return (
        <PopupWithForm name="add-image" 
        title="Новое место" 
        onSubmit={handleSubmit} 
        submit={submit} 
        isOpen={isOpen} 
        onClose={onClose}
        submitStatus={submitStatus} 
        isDisabled={isDisabled} >
           
            <input className="popup__item" 
            onChange={handleChange}
            value={values.name || ""}
            minLength="2" 
            maxLength="20" 
            id="image-name" 
            name="name" 
            type="text" 
            placeholder="Название" 
            required />
            
            <span className={`popup__item-error image-name-error ${!isValid && "popup__item-error_visible"}`}>
            {validationMessages.name}</span>
            
            <input className="popup__item" 
            onChange={handleChange}
            value={values.link || ""}
            id="image-link" 
            name="link" 
            type="url" 
            placeholder="Ссылка на картинку"
            required />
            
            <span className={`popup__item-error image-link-error ${!isValid && "popup__item-error_visible"}`}>
            {validationMessages.link}</span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;