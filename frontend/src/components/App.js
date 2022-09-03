import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

import Login from './Login';
import Register from './Register';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import ImageDeletePopup from './ImageDeletePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from '../components/AddPlacePopup';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import api from '../utils/Api';
import * as apiAuth from '../utils/apiAuth.js';

import '../index.css';

function App() {

    const history = useHistory();

    const [currentUser, setCurrentUser] = useState({});

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isImageDeletePopupOpen, setIsImageDeletePopupOpen] = useState(false);
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

    const [selectedCard, setSelectedCard] = useState(null);
    const [cards, setCards] = useState([]);
    const [cardGoingToBeDeleted, setCardGoingToBeDeleted] = useState({});
    const [submitDisabled, setSubmitDisabled] = useState(false);
    const [isUserRegistred, setIsUserRegistred] = useState(false); 
    const [userEmail, setUserEmail] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isImageDeletePopupOpen || isInfoTooltipOpen;

    useEffect(() => {
        function closeByEscape(evt) {
            if(evt.key === 'Escape') {
                closeAllPopups();
            }
        }

        if(isOpen) {
            document.addEventListener('keydown', closeByEscape);
            return () => {
                document.removeEventListener('keydown', closeByEscape);
            }
        }
    }, [isOpen]) 
  
    useEffect(() => {
        if (loggedIn) {
            Promise.all([
            api.getPhotos(),
            api.getInfo()])
            .then(([cards, data]) => {
                setCards(cards.data);
                setCurrentUser(data);
            }).catch((err) => console.log(err));
        }
    }, [loggedIn, history])

    function handleRegisterSubmit(data) {
        apiAuth.register(data)
        .then((res) => {
            if (res) {
                setIsUserRegistred(true);
            } else {
                setIsUserRegistred(false);
            }
        }).finally(handleInfoTooltipOpen)
    }

    function handleInfoTooltipClose() {
        closeAllPopups();
        setIsUserRegistred(false);
    }

    function handleInfoTooltipCloseAndRedirect() {
        handleInfoTooltipClose();
        history.push('/signin');
    }

    function handleInfoTooltipOpen() {
        setIsInfoTooltipOpen(true);
    }

    function handleLogin(data) {
        apiAuth.auth(data)
        .then((res) => {
            setLoggedIn(true);
            setUserEmail(data.email);
            history.push('/');
        }).catch((err) => console.log(err));
    }

    function handleLogout(data) {
        apiAuth.logout(data)
        .then((res) => {
            history.push('/signin');
            setLoggedIn(false);
            setUserEmail('');
            setCurrentUser({});
        }).catch((err) => console.log(err))
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    };

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    };

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    };

    function handleImageDeleteClick(data) {
        setCardGoingToBeDeleted(data);
        setIsImageDeletePopupOpen(true);
    };

    function closeAllPopups() {
            setIsAddPlacePopupOpen(false);
            setIsEditAvatarPopupOpen(false);
            setIsEditProfilePopupOpen(false);
            setIsImageDeletePopupOpen(false);
            setIsInfoTooltipOpen(false);
            setSelectedCard(null);
    }

    function handleUpdateUser(data) {
        setSubmitDisabled(true);

        api.sendNewProfileInfo(data)
        .then((info) => {
            setCurrentUser(info);
            closeAllPopups();
            setSubmitDisabled(false);
        }).catch((err) => console.log(err))
    }

    function handleUpdateAvatar(data) {
        setSubmitDisabled(true);

        api.sendNewAvatar(data)
        .then((info) => {
            setCurrentUser(info);
            closeAllPopups();
            setSubmitDisabled(false);
        }).catch((err) => console.log(err))
    }

    function handleAppPlaceSubmit(data) {
        setSubmitDisabled(true);

        api.addNewCard(data)
        .then((newCard) => {
            setCards([newCard.card, ...cards]);
            closeAllPopups();
            setSubmitDisabled(false)
        }).catch((err) => console.log(err))
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i === currentUser._id);

        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            setCards((cards) => cards.map((c) => c._id === card._id ? newCard.card : c));
        }).catch((err) => console.log(err))
    }

    function handleCardDelete(event) {
        event.preventDefault();

        api.deleteImage(cardGoingToBeDeleted).then(() => {
            setCards((cards) => cards.filter((c) => c._id === cardGoingToBeDeleted._id ? '' : c));
            closeAllPopups();
            setCardGoingToBeDeleted({});
        }).catch((err) => console.log(err))
    }

  return (
    <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
            <Switch>
                <ProtectedRoute exact path="/" loggedIn={loggedIn}>
                    <Header>
                        <div className='header__acc-container'>
                            <p className='header__account'>{userEmail}</p>
                
                            <p className='header__account-exit'
                            onClick={handleLogout}>Выйти</p>
                        </div>
                    </Header>

                    <Main 
                    onImageDeleteClick={handleImageDeleteClick}
                    onEditAvatar={handleEditAvatarClick} 
                    onEditProfile={handleEditProfileClick} 
                    onCardClick={setSelectedCard} 
                    onAddPlace={handleAddPlaceClick} 
                    cards={cards}
                    onCardLike={handleCardLike} />

                    <Footer />

                    <EditProfilePopup isOpen={isEditProfilePopupOpen} 
                    onClose={closeAllPopups} 
                    onUpdateUser={handleUpdateUser} 
                    submitStatus={submitDisabled} />

                    <EditAvatarPopup isOpen={isEditAvatarPopupOpen} 
                    onClose={closeAllPopups} 
                    onUpdateAvatar={handleUpdateAvatar} 
                    submitStatus={submitDisabled} />

                    <AddPlacePopup submit="Создать" 
                    cards={cards}
                    isOpen={isAddPlacePopupOpen} 
                    onClose={closeAllPopups} 
                    onSubmit={handleAppPlaceSubmit}
                    submitStatus={submitDisabled} />
                    
                    <ImageDeletePopup name="delete-image" 
                    title="Вы уверены?" 
                    submit="Да" 
                    onSubmit={handleCardDelete}
                    isOpen={isImageDeletePopupOpen} 
                    onClose={closeAllPopups} />

                    <ImagePopup card={selectedCard} 
                    onClose={closeAllPopups} />    
                </ProtectedRoute>
            
                <Route path="/signup">
                    <Register onSubmit={handleRegisterSubmit} />

                    <InfoTooltip name="tooltip" 
                    isOpen={isInfoTooltipOpen} 
                    isUserRegistred={isUserRegistred} 
                    onCloseAndRedirect={handleInfoTooltipCloseAndRedirect} 
                    onClose={handleInfoTooltipClose} />
                </Route>
                <Route path="/signin">
                    <Login onSubmit={handleLogin} />
                </Route>
            </Switch>
        </CurrentUserContext.Provider>
    </div>
  );
}

export default App;