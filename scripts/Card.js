export default class Card {
  constructor (name, link, templateSelector, handleOpenPopupImage) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleOpenPopupImage = handleOpenPopupImage;
  }


  _createCard () {
    this._cardElement = document.querySelector(this._templateSelector).content.children[0].cloneNode(true);
    this._likeButton = this._cardElement.querySelector('.card__like-button');
    this._delButton = this._cardElement.querySelector('.card__del-button');
    this._image = this._cardElement.querySelector('.card__image');

    this._cardElement.querySelector('.card__title').textContent = this._name;
    this._image.setAttribute('alt', this._name);
    this._image.setAttribute('src', this._link);
  }

  _like (evt) {
    evt.target.classList.toggle('card__like-button_active');
  }

  _del (evt) {
    evt.target.parentElement.remove();
  }

  _setEventListeners () {
    this._likeButton.addEventListener('click', this._like);
    this._delButton.addEventListener('click', this._del);
    this._image.addEventListener('click', () => this._handleOpenPopupImage(this._name, this._link));
  }

  generateCard () {
    this._createCard();
    this._setEventListeners();
    return this._cardElement;
  }
}

