class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`); 
        }
        return res.json();
    }

    getInfo = () => {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: this._headers,
            credentials: 'include'
        }).then(this._getResponseData);
    }

    getPhotos = () => {
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: this._headers,
            credentials: 'include'
        }).then(this._getResponseData);
    }

    sendNewProfileInfo = (data) => {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            credentials: 'include',
            body: JSON.stringify(data) 
        }).then(this._getResponseData);
    }

    addNewCard = (data) => {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            credentials: 'include',
            body: JSON.stringify(data)
        }).then(this._getResponseData);
    }

    changeLikeCardStatus = (data, isLiked) => {
        return fetch(`${this._url}/cards/${data}/likes`, {
            method: `${isLiked ? 'PUT' : 'DELETE'}`,
            headers: this._headers,
            credentials: 'include'
        }).then(this._getResponseData);
    }

    deleteImage = (data) => {
        return fetch(`${this._url}/cards/${data._id}`, {
            method: 'DELETE',
            headers: this._headers,
            credentials: 'include'
        }).then(this._getResponseData);
    }

    sendNewAvatar = (data) => {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            credentials: 'include',
            body: JSON.stringify(data) 
        }).then(this._getResponseData);
    }
}

const api = new Api({
    url: 'https://api.learn.more.nomoredomains.sbs',
    headers: {
      "Content-Type": "application/json",
    }
});

export default api;
