export default class Card {
  constructor (name, link, templateSelector, handleOpenPopupImage, handleCardClick) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleOpenPopupImage = handleOpenPopupImage;
    this._handleCardClick = handleCardClick;
  }


  _createCard () {
    this._cardElement = document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);
    this._likeButton = this._cardElement.querySelector('.card__like-button');
    this._delButton = this._cardElement.querySelector('.card__del-button');
    this._image = this._cardElement.querySelector('.card__image');

    this._cardElement.querySelector('.card__title').textContent = this._name;
    this._image.setAttribute('alt', this._name);
    this._image.setAttribute('src', this._link);
  }

  _like () {
    this.classList.toggle('card__like-button_active');
  }

  _delete () {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _setEventListeners () {
    this._likeButton.addEventListener('click', this._like);
    this._delButton.addEventListener('click', () => this._delete());
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

