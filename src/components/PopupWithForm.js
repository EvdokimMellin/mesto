import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor (popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._textInputsArray = Array.from(this._popupForm.querySelectorAll('.popup__input'));
  }

  _getInputValues() {
    const formValues = {};
    this._textInputsArray.forEach(({name, value}) => {
      formValues[name] = value;
    })
    return formValues;
  }

  setInitialData (data) {
    this._initialData = data;
  }

  close () {
    super.close();

    this._textInputsArray.forEach((input) => {
      input.value = this._initialData[input.name];
    })
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
