import Api from "./Api.js";

export default class Card {
  constructor (name, link, likes, id, isMine, templateSelector, handleOpenPopupImage, handleCardClick, handleOpenPopupConfirm, confirmButton, myId) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._templateSelector = templateSelector;
    this._handleOpenPopupImage = handleOpenPopupImage;
    this._handleCardClick = handleCardClick;
    this._handleOpenPopupConfirm = handleOpenPopupConfirm;
    this._confirmButton = confirmButton;
    this._isMine = isMine;
    this._id = id;
    this._api = new Api();
    this._myId = myId;
  }


  _createCard () {
    this._cardElement = document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);
    this._likesNumber = this._cardElement.querySelector('.card__likes-number');

    if (this._isMine) {
      const binButton = document.createElement('button');
      binButton.classList.add('card__del-button');
      this._cardElement.append(binButton);

      this._delButton = this._cardElement.querySelector('.card__del-button');
    }

    this._likeButton = this._cardElement.querySelector('.card__like-button');
    this._image = this._cardElement.querySelector('.card__image');

    this._cardElement.querySelector('.card__title').textContent = this._name;
    this._image.setAttribute('alt', this._name);
    this._image.setAttribute('src', this._link);
    this._likesNumber.textContent = this._likes.length;
  }

  _like () {
    if (this._likeButton.classList.contains('card__like-button_active')) {
      this._api.removeLike(this._id)
        .then((res) => {
          console.log('Лайк убран');
          this._likesNumber.textContent = res.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this._api.like(this._id)
        .then((res) => {
          console.log('Лайк поставлен');
          this._likesNumber.textContent = res.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    }

    this._likeButton.classList.toggle('card__like-button_active');

  }

  _delete () {
    if (this._cardElement) {
      this._cardElement.remove();
      this._cardElement = null;
      this._api.deleteCard(this._id)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  _setEventListeners () {
    this._likes.forEach(like => {
      if (like._id === this._myId) {
        this._likeButton.classList.add('card__like-button_active');
      }
    });

    this._likeButton.addEventListener('click', () => {this._like()});
    if (this._delButton) {
      this._delButton.addEventListener('click', () => {
        this._handleOpenPopupConfirm();
        this._confirmButton.addEventListener('click', () => this._delete());
      });
    }
    this._image.addEventListener('click', () => {
      this._handleCardClick(this._link, this._name);
    })
  }

  generateCard () {
    this._createCard();
    this._setEventListeners();
    return this._cardElement;
  }
}

