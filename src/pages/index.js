//Импорт

import './index.css';

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";




//Переменные

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const popupImage = document.querySelector('.popup_type_image');
const popupImageCloseButton = popupImage.querySelector('.popup__close-button');
const popupImageContent = popupImage.querySelector('.popup__image');
const popupImageTitle = popupImage.querySelector('.popup__image-title');
const cardsList = document.querySelector('.cards__list');
const popupEdit = document.querySelector('.popup_type_edit');
const profileName = document.querySelector('.profile__name');
const profileInfo = document.querySelector('.profile__description');
const popupEditForm = popupEdit.querySelector('.popup__form');
const popupEditOpenButton = document.querySelector('.profile__edit-button');
const popupEditCloseButton = popupEdit.querySelector('.popup__close-button');
const popupEditInputName = popupEdit.querySelector('.popup__input_type_name');
const popupEditInputInfo = popupEdit.querySelector('.popup__input_type_description');
const popupAdd = document.querySelector('.popup_type_add');
const popupAddForm = popupAdd.querySelector('.popup__form');
const popupAddOpenButton = document.querySelector('.profile__add-button');
const popupAddCloseButton = popupAdd.querySelector('.popup__close-button');
const popupAddInputName = popupAdd.querySelector('.popup__input_type_name');
const popupAddInputInfo = popupAdd.querySelector('.popup__input_type_description');
const forms = [popupEditForm, popupAddForm];
const initialValidForms = [popupEditForm];
const initialInvalidForms = [popupAddForm];
const openButtonsObj = {
  [popupEditForm.id]: popupEditOpenButton,
  [popupAddForm.id]: popupAddOpenButton,
};
const popupsArray = [popupImage, popupEdit, popupAdd];
let popupInstances;
let items;
let popupImageInstance;



//Функции

function createPopups () {
  popupInstances = popupsArray.map(popup => {
    let popupClass = '';
    popup.classList.forEach(selector => {
      if (selector.includes('popup_type')){
        popupClass = selector;
      }
    })
    if (popupClass === 'popup_type_add') {
      const newPopup = new PopupWithForm(`.${popupClass}`, submitPopupAdd);
      popupAddOpenButton.addEventListener('click', newPopup.open.bind(newPopup));
      return newPopup;
    } else if (popupClass === 'popup_type_edit') {
      const newPopup = new PopupWithForm(`.${popupClass}`, submitPopupEdit);
      popupEditOpenButton.addEventListener('click', newPopup.open.bind(newPopup));
      return newPopup;
    } else if (popupClass === 'popup_type_image') {
      return new PopupWithImage(`.${popupClass}`);
    }
  })
  popupInstances.forEach(popup => popup.setEventListeners())
}

function createItems () {
  items = initialCards.map(card => {
    popupImageInstance = popupInstances.find(item => item._popup === popupImage);
    const item = new Card(card.name, card.link, '#card-template', popupImageInstance.open.bind(popupImageInstance), function () {
      this._image.addEventListener('click', () => this._handleOpenPopupImage(this._link, this._name))});
    return item;
  })
  return items;
}

function addCards () {
  const section = new Section({items: createItems(), renderer: (item) => item.generateCard()}, '.cards__list');
  section.renderElements();
}

function submitPopupEdit (evt) {
  evt.preventDefault();
  const b = new UserInfo({
    nameSelector: '.profile__name',
    descriptionSelector: '.profile__description'
  });
  b.setUserInfo(this._titleInput.value, this._descriptionInput.value);
  this._getInputValues(b.getUserInfo());
  this.close();
}

function submitPopupAdd (evt) {
  evt.preventDefault();

  const newCard = new Section({items: [new Card(popupAddInputName.value, popupAddInputInfo.value, '#card-template', popupImageInstance.open.bind(popupImageInstance), function () {
    this._image.addEventListener('click', () => this._handleOpenPopupImage(this._link, this._name))})], renderer: (item) => item.generateCard()}, '.cards__list')
  newCard.renderElements();

  this.close();
}

function popupFormValidation (form) {
  const popupFormValidator = new FormValidator ({
      submitButtonSelector: '.popup__save-button',
      inputErrorClass: 'popup__input_invalid',
      inputSelector: '.popup__input'
    }, form);
  const initialValidity = initialValidForms.includes(form);

  popupFormValidator.enableValidation();

  openButtonsObj[form.id].addEventListener('click', () => popupFormValidator.resetValidation(initialValidity))
}



//Исполнительный код

createPopups();
addCards();

forms.forEach(function (form) {
  popupFormValidation (form);
});


