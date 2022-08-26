import React from 'react';

function ImagePopup({card, onClose}) {
    return (
        <div className={`popup popup_type_larger-image ${card && "popup_opened"}`}>
            <figure className="popup-larger__container">
                <button type="button" 
                className="popup__exit" 
                onClick={onClose} />
            
                <img className="popup-larger__photo" 
                src={card?.link} 
                alt={card?.name} />
            
                <figcaption className="popup-larger__caption">{card?.name}</figcaption>
            </figure>
        </div>
    )
}

export default ImagePopup;