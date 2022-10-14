import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor (popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._textInputsArray = Array.from(this._popupForm.elements).filter((element) => {
      if (element.value || element.placeholder) { // Дизайн сайта предполагает, что у всех текстовых полей есть либо предустановленное значение, либо плейсхолдер, а значит при добавлении новых форм это условие все еще будет равно true для всех текстовых полей ввода
        return element;
      }
    })
  }


  _getInputValues () {
    return this._textInputsArray.map((input) => {return input.value});
  }

  _setInitialData () {
    this._initialData = this._getInputValues();
  }

  open () {
    super.open();
    this._setInitialData();
  }

  close () {
    super.close();

    for (let i = 0; i < this._textInputsArray.length; i++) {
      this._textInputsArray[i].value = this._initialData[i];
    }
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
