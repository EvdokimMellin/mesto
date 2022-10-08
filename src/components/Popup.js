export default class Popup {
  constructor (popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(popupSelector);
  }


  open () {
    this._escCloseCallback = this._handleEscClose.bind(this); //bind создает новую ссылку на функцию, поэтому, чтобы удалить слушатель при закрытии попапа мне пришлось присвоить ссылку переменной
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._escCloseCallback);
  }

  close () {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._escCloseCallback);
  }

  _handleEscClose (evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleOverlayClose (evt) {
    if (evt.target.classList.contains('popup')) {
      this.close();
    }
  }

  setEventListeners () {
    const closeButton = this._popup.querySelector('.popup__close-button');

    this._popup.addEventListener('click', this._handleOverlayClose.bind(this));
    closeButton.addEventListener('click', this.close.bind(this));
  }
}
