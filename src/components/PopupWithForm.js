import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor (popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._titleInput = this._popup.querySelector('.popup__input_type_name');
    this._descriptionInput = this._popup.querySelector('.popup__input_type_description');
  }


  _getInputValues ({name, description}) {
    this._titleInput.setAttribute('value', name);
    this._descriptionInput.setAttribute('value', description);
  }

  close () {
    this._popup.classList.remove('popup_opened');
    this._popupForm.reset();
    document.removeEventListener('keydown', this._escCloseCallback);
  }

  setEventListeners () {
    const closeButton = this._popup.querySelector('.popup__close-button');
    const submitButton = this._popup.querySelector('.popup__save-button')

    this._popup.addEventListener('click', this._handleOverlayClose.bind(this));
    closeButton.addEventListener('click', this.close.bind(this));
    submitButton.addEventListener('click', this._submitCallback.bind(this));
  }
}
