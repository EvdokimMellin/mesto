export default class Api {
  constructor(options) {
    this._options = options;
  }

  getUserInfo () {
    return(fetch('https://mesto.nomoreparties.co/v1/cohort-52/users/me', {
      method: 'GET',
      headers: {
        authorization: 'e8e321ed-060f-4966-8b17-7867fd5284ad'
      }
    }))
      .then(res => {
        if (res.ok){
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }})
  }

  updateUserInfo (editName, editDescription) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-52/users/me', {
      method: 'PATCH',
      headers: {
        authorization: 'e8e321ed-060f-4966-8b17-7867fd5284ad',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: editName,
        about: editDescription
      })
    })
      .then(res => {
        if (res.ok){
          return Promise.resolve('Данные успешно обновлены');
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }});
  }

  updateAvatar (avatarLink) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-52/users/me/avatar', {
      method: 'PATCH',
      headers: {
        authorization: 'e8e321ed-060f-4966-8b17-7867fd5284ad',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatarLink
      })
    })
      .then(res => {
        if (res.ok){
          return Promise.resolve('Аватар успешно обновлен');
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }});
  }

  getInitialCards () {
    return (fetch('https://mesto.nomoreparties.co/v1/cohort-52/cards', {
      method: 'GET',
      headers: {
        authorization: 'e8e321ed-060f-4966-8b17-7867fd5284ad'
      }
    }))
      .then(res => {
        if (res.ok){
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }})
  }

  addCard (addName, addDescription) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-52/cards', {
      method: 'POST',
      headers: {
        authorization: 'e8e321ed-060f-4966-8b17-7867fd5284ad',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: addName,
        link: addDescription
      })
    })
      .then(res => {
        if (res.ok){
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }});
  }

  deleteCard (cardId) {
    console.log(`https://mesto.nomoreparties.co/v1/cohort-52/cards/${cardId}`);
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-52/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: 'e8e321ed-060f-4966-8b17-7867fd5284ad'
      }
    })
      .then(res => {
        if (res.ok){
          return Promise.resolve('Карточка успешно удалена');
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }});
  }

  like (cardId) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-52/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: 'e8e321ed-060f-4966-8b17-7867fd5284ad'
      }
    })
      .then(res => {
        if (res.ok){
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }});
  }

  removeLike (cardId) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-52/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: 'e8e321ed-060f-4966-8b17-7867fd5284ad'
      }
    })
      .then(res => {
        if (res.ok){
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }});
  }
}
