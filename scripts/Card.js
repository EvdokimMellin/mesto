import {renderPopupImage} from './index.js';

export default class Card {
  constructor (name, link, templateSelector) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector; //Убрать?
    this._cardElement = document.querySelector(templateSelector).content.children[0].cloneNode(true);
    this._likeButton = this._cardElement.querySelector('.card__like-button');
    this._delButton = this._cardElement.querySelector('.card__del-button');
    this._image = this._cardElement.querySelector('.card__image');
  }


  _createCard () {
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

  _openImage (evt) {
    renderPopupImage(evt.target.alt, evt.target.src);
  }

  _setEventListeners () {
    this._likeButton.addEventListener('click', this._like);
    this._delButton.addEventListener('click', this._del);
    this._image.addEventListener('click', this._openImage);
  }

  renderCard () {
    this._createCard();
    this._setEventListeners();
    return this._cardElement;
  }
}

