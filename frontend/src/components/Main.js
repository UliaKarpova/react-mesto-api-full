import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import Card from './Card';

function Main({onImageDeleteClick, onEditAvatar, onEditProfile, onCardClick, onAddPlace, cards, onCardLike}) {
    const currentUser = React.useContext(CurrentUserContext);
    const {name, about, avatar} = currentUser;
    const cardElements = cards.map((card) => {
        return (
            <li key={card._id} className="grid__item">
                <Card card={card} 
                onImageDeleteClick={onImageDeleteClick}
                onCardLike={onCardLike} 
                onCardClick={onCardClick} />
            </li>
        )
    })
        
    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar" 
                style={{
                    backgroundImage: `url(${avatar})`
                }} />
                
                <button type="button" 
                className="profile__edit-avatar" 
                onClick={onEditAvatar} />
                
                <div className="profile__info">
                    <h1 className="profile__name">{name}</h1>
                    
                    <button type="button" 
                    className="profile__edit-button" 
                    onClick={onEditProfile} />
                    
                    <p className="profile__text">{about}</p>
                </div>
                
                <button type="button" 
                className="profile__add-button" 
                onClick={onAddPlace} />
            </section>
            
            <section className="elements">
                <ul className="grid">
                    {cardElements}
                </ul>
            </section>
        </main>
    )
}

export default Main;