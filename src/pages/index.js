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

const popupEdit = document.querySelector('.popup_type_edit');
const popupEditForm = popupEdit.querySelector('.popup__form');
const popupEditOpenButton = document.querySelector('.profile__edit-button');
const popupEditTitleInput = popupEdit.querySelector('.popup__input_type_name')
const popupEditDescriptionInput = popupEdit.querySelector('.popup__input_type_description')
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
const userInfoIntance = new UserInfo({
  nameSelector: '.profile__name',
  descriptionSelector: '.profile__description'
});
const section = new Section({items: initialCards, renderer: function (item) {
  const cardIntance = createCard(item.name, item.link);
  section.addItem(cardIntance);
}}, '.cards__list');



//Функции

function createCard (name, link) {
  const newCard = new Card(name, link, '#card-template', popupImageInstance.open.bind(popupImageInstance), function (link, name) {this._handleOpenPopupImage(link, name)});

  return newCard.generateCard();
}

function submitPopupEdit ([title, description]) {
  userInfoIntance.setUserInfo(title, description);
  this.close();

  const {name: userName, description: userDescription} = userInfoIntance.getUserInfo();
  popupEditTitleInput.value = userName;
  popupEditDescriptionInput.value = userDescription;
}

function submitPopupAdd ([title, description]) {
  section.addItem(createCard(title, description));
  this.close();
}



//Исполнительный код


const popupEditProfileInstance = new PopupWithForm(`.popup_type_edit`, submitPopupEdit);
const popupAddCardInstance = new PopupWithForm(`.popup_type_add`, submitPopupAdd);
const popupImageInstance = new PopupWithImage(`.popup_type_image`, submitPopupEdit);

popupEditProfileInstance.setEventListeners();
popupAddCardInstance.setEventListeners();
popupImageInstance.setEventListeners();

popupEditOpenButton.addEventListener("click", () => popupEditProfileInstance.open());
popupAddOpenButton.addEventListener("click", () => popupAddCardInstance.open());

section.renderElements();

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


