import { popupEditOpenButton } from "./index.js";
import { popupAddOpenButton } from "./index.js";
import { forms } from "./index.js";

export default class FormValidator {
  constructor (settings, form) {
    this._form = form;
    this._settings = settings;
    this._inputList = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
    this._submitButton = this._form.querySelector(this._settings.submitButtonSelector);
  }


  _showError (input, errorText) {
    const error = this._form.querySelector(`.${input.id}-error`);
    input.classList.add(this._settings.inputErrorClass);
    error.textContent = errorText;
  };

  _hideError (input) {
    const error = this._form.querySelector(`.${input.id}-error`);
    input.classList.remove(this._settings.inputErrorClass);
    error.textContent = '';
  };

  _checkValidity (input) {
    if (!input.validity.valid) {
      this._showError(input, input.validationMessage);
    } else {
      this._hideError(input);
    }
  };

  _hasInvalidInput () {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    });
  };

  _deactivateButton () {
    this._submitButton.setAttribute('disabled', 'disabled');
  }

  _activateButton () {
    this._submitButton.removeAttribute('disabled');
  }

  _toggleButtonState () {
    if (this._hasInvalidInput()) {
      this._deactivateButton ();
    } else {
      this._activateButton ();
    }
  };



  _setEventListeners () {
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkValidity(input);
        this._toggleButtonState();
      });
    });

    if (this._form === forms[0]) {
      popupEditOpenButton.addEventListener('click', () => {
        this._inputList.forEach((input) => this._hideError(input))
        this._activateButton();
      })
    } else if (this._form === forms[1]) {
      popupAddOpenButton.addEventListener('click', () => {
        this._inputList.forEach((input) => this._hideError(input))
        this._deactivateButton();
      })
    }
  };

  enableValidation () {
    this._toggleButtonState();
    this._setEventListeners();
  }
}
