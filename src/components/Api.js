export default class Api {
  constructor(options) {
    this._headers = options.headers;
    this._baseUrl = options.baseUrl;
  }

  _checkResponse (res) {
    if (res.ok){
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getUserInfo () {
    return(fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers
    }))
      .then(this._checkResponse)
  }

  updateUserInfo (editName, editDescription) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: editName,
        about: editDescription
      })
    })
      .then(this._checkResponse);
  }

  updateAvatar (avatarLink) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarLink
      })
    })
      .then(this._checkResponse);
  }

  getInitialCards () {
    return (fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers
    }))
      .then(this._checkResponse)
  }

  addCard (addName, addDescription) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: addName,
        link: addDescription
      })
    })
      .then(this._checkResponse);
  }

  deleteCard (cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  like (cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  removeLike (cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._checkResponse);
  }
}
