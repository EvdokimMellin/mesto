import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor (popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._titleInput = this._popup.querySelector('.popup__input_type_name');
    this._descriptionInput = this._popup.querySelector('.popup__input_type_description');
  }


  _getInputValues () {
    return {title: this._titleInput.value, description: this._descriptionInput.value};
  }

  open () {
    super.open();

    this._initialTitleInputValue = this._titleInput.value;
    this._initialDescriptionInputValue = this._descriptionInput.value;
  }

  close () {
    super.close();

    this._titleInput.value = this._initialTitleInputValue;
    this._descriptionInput.value = this._initialDescriptionInputValue;
  }

  setEventListeners () {
    super.setEventListeners();

    const submitButton = this._popup.querySelector('.popup__save-button');

    submitButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._submitCallback(this._getInputValues());
    });
  }
}
