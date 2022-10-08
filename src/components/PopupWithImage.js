import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor (popupSelector) {
    super(popupSelector);
  }

  open (link, title) {
    this._escCloseCallback = this._handleEscClose.bind(this);
    document.addEventListener('keydown', this._escCloseCallback);

    const imageTitle = this._popup.querySelector('.popup__image-title');
    const imageContent = this._popup.querySelector('.popup__image');
    imageTitle.textContent = title;
    imageContent.setAttribute('src', link);
    imageContent.setAttribute('alt', title);

    this._popup.classList.add('popup_opened');
  }

  setEventListeners () {
    const closeButton = this._popup.querySelector('.popup__close-button');

    this._popup.addEventListener('click', this._handleOverlayClose.bind(this));
    closeButton.addEventListener('click', this.close.bind(this));
  }
}
