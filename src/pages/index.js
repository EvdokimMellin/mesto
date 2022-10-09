//Импорт

import './index.css';

import { initialCards } from '../utils/initialCards.js';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";




//Переменные

const popupImage = document.querySelector('.popup_type_image');
const popupEdit = document.querySelector('.popup_type_edit');
const popupEditForm = popupEdit.querySelector('.popup__form');
const popupEditOpenButton = document.querySelector('.profile__edit-button');
const popupAdd = document.querySelector('.popup_type_add');
const popupAddForm = popupAdd.querySelector('.popup__form');
const popupAddOpenButton = document.querySelector('.profile__add-button');
const forms = [popupEditForm, popupAddForm];
const initialValidForms = [popupEditForm];
const initialInvalidForms = [popupAddForm];
const popupOpenButtonsObj = {
  [popupEditForm.id]: popupEditOpenButton,
  [popupAddForm.id]: popupAddOpenButton,
};
const popupsArray = [popupImage, popupEdit, popupAdd];
const userInfoIntance = new UserInfo({
  nameSelector: '.profile__name',
  descriptionSelector: '.profile__description'
});
let popupInstances;
let popupImageInstance;
let section;



//Функции

function createCard (name, link) {
  return new Card(name, link, '#card-template', popupImageInstance.open.bind(popupImageInstance), function () {this._handleOpenPopupImage(this._link, this._name)});
}

function addCards () {
  section = new Section({items: initialCards, renderer: function (item) {
    const cardIntance = createCard(item.name, item.link);
    section.addItem(cardIntance.generateCard());
  }}, '.cards__list');
  section.renderElements();
}

function submitPopupEdit ({title, description}) {
  userInfoIntance.setUserInfo(title, description);
  this.close();
  this._titleInput.value = userInfoIntance.getUserInfo().name;
  this._descriptionInput.value = userInfoIntance.getUserInfo().description;
}

function submitPopupAdd ({title, description}) {
  section.addItem(createCard(title, description).generateCard());
  this.close();
}



//Исполнительный код


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
    popupImageInstance = new PopupWithImage(`.${popupClass}`);
    return popupImageInstance;
  }
})
popupInstances.forEach(popup => popup.setEventListeners())

addCards();

forms.forEach(function (form) {
  const popupFormValidator = new FormValidator ({
    submitButtonSelector: '.popup__save-button',
    inputErrorClass: 'popup__input_invalid',
    inputSelector: '.popup__input'
  }, form);
  const initialValidity = initialValidForms.includes(form);

  popupFormValidator.enableValidation();

  popupOpenButtonsObj[form.id].addEventListener('click', () => popupFormValidator.resetValidation(initialValidity));
});


