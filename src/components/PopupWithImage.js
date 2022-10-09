import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor (popupSelector) {
    super(popupSelector);

    this._imageTitle = this._popup.querySelector('.popup__image-title');
    this._imageContent = this._popup.querySelector('.popup__image');
  }

  open (link, title) {
    super.open();

    this._escCloseCallback = this._handleEscClose.bind(this);
    this._imageTitle.textContent = title;
    this._imageContent.setAttribute('src', link);
    this._imageContent.setAttribute('alt', title);
  }
}
