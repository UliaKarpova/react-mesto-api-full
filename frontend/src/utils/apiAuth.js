export const BASE_URL = 'https://api.learn.more.nomoredomains.sbs';

const getResponseData = (res) => {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`); 
    }
    return res.json();
}

export const register = (data) => {
    return fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: {
            "Origin": 'https://learn.more.nomoredomains.sbs',
            "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify(data)
    }).then(getResponseData);        
}

export const auth = (data) => {
    return fetch(`${BASE_URL}/signin`, {
        method: "POST",
        headers: {
            "Origin": 'https://learn.more.nomoredomains.sbs',
            "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify(data)
    }).then(getResponseData);
}

/* export const isTokenValid = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        credentials: 'include'
    }).then(getResponseData);
} */