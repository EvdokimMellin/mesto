//Импорт

import './index.css';

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from '../components/Api.js';




//Переменные

const popupEdit = document.querySelector('.popup_type_edit');
const popupEditForm = popupEdit.querySelector('.popup__form');
const popupEditOpenButton = document.querySelector('.profile__edit-button');
const popupEditTitleInput = popupEdit.querySelector('.popup__input_type_name')
const popupEditDescriptionInput = popupEdit.querySelector('.popup__input_type_description')
const popupAdd = document.querySelector('.popup_type_add');
const popupAddForm = popupAdd.querySelector('.popup__form');
const popupAddOpenButton = document.querySelector('.profile__add-button');
const profileAvatar = document.querySelector('.profile__avatar');
const popupAvatar = document.querySelector('.popup_type_avatar');
const popupAvatarOpenButton = document.querySelector('.profile__avatar-hover');
const popupAvatarForm = popupAvatar.querySelector('.popup__form')
const forms = [popupEditForm, popupAddForm, popupAvatarForm];
const initialValidForms = [popupEditForm];
const initialInvalidForms = [popupAddForm, popupAvatarForm];

const popupOpenButtonsObj = {
  [popupEditForm.id]: popupEditOpenButton,
  [popupAddForm.id]: popupAddOpenButton,
  [popupAvatarForm.id]: popupAvatarOpenButton
};
const popupConfirmSubmitButton = document.querySelector('.popup__confirm-button');
const userInfoIntance = new UserInfo({
  nameSelector: '.profile__name',
  descriptionSelector: '.profile__description'
});
let section
const api = new Api();
const myId = 'a5f8b2d7fe96175afc62b526';



//Функции

function createCard (name, link, likes, id, isMine) {
  const newCard = new Card(name, link, likes, id, isMine, '#card-template', popupImageInstance.open.bind(popupImageInstance), function (link, name) {this._handleOpenPopupImage(link, name)}, popupConfirmInstance.open.bind(popupConfirmInstance), popupConfirmSubmitButton, myId);

  return newCard.generateCard();
}

function renderLoading(isLoading, button, initialButtonText) {
  if (isLoading) {
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = initialButtonText;
  }
}


function submitPopupEdit ({editName, editDescription}) {
  userInfoIntance.setUserInfo(editName, editDescription);

  const {name: userName, description: userDescription} = userInfoIntance.getUserInfo();
  this.setInitialData({editName: userName, editDescription: userDescription});
  popupEditTitleInput.value = userName;
  popupEditDescriptionInput.value = userDescription;

  renderLoading(true, popupEdit.querySelector('.popup__save-button'), 'Сохранить');

  api.updateUserInfo(editName, editDescription)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    renderLoading(false, popupEdit.querySelector('.popup__save-button'), 'Сохранить');
  });

  this.close();
}

function submitPopupAdd ({addName, addDescription}) {
  renderLoading(true, popupAdd.querySelector('.popup__save-button'), 'Создать');

  api.addCard(addName, addDescription)
    .then((res) => {
      section.addItem(createCard(addName, addDescription, [], res._id, true));
      console.log('Карточка успешно добавлена');
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, popupAdd.querySelector('.popup__save-button'), 'Создать');
    });

  this.setInitialData({addName: '', addDescription: ''})
  this.close();
}

function submitPopupConfirm () {
  this.close();
}

function submitPopupAvatar ({avatarLink}) {
  renderLoading(true, popupAvatar.querySelector('.popup__save-button'), 'Сохранить');

  profileAvatar.src = avatarLink;

  api.updateAvatar(avatarLink)
    .then((res) => {;
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, popupAvatar.querySelector('.popup__save-button'), 'Сохранить');
    });

  this.close();
}



//Исполнительный код


const popupEditProfileInstance = new PopupWithForm(`.popup_type_edit`, submitPopupEdit);
const popupAddCardInstance = new PopupWithForm(`.popup_type_add`, submitPopupAdd);
const popupImageInstance = new PopupWithImage(`.popup_type_image`, submitPopupEdit);
const popupConfirmInstance = new PopupWithForm (`.popup_type_confirm`, submitPopupConfirm);
const popupAvatarInstance = new PopupWithForm(`.popup_type_avatar`, submitPopupAvatar);

popupEditProfileInstance.setEventListeners();
popupEditProfileInstance.setInitialData({editName: 'Жак-Ив Кусто', editDescription: 'Исследователь окена'})

popupAddCardInstance.setEventListeners();
popupAddCardInstance.setInitialData({addName: '', addDescription: ''})

popupImageInstance.setEventListeners();

popupEditOpenButton.addEventListener('click', () => popupEditProfileInstance.open());
popupAddOpenButton.addEventListener('click', () => popupAddCardInstance.open());
popupAvatarOpenButton.addEventListener('click', () => popupAvatarInstance.open());

popupConfirmInstance.setEventListeners();

popupAvatarInstance.setEventListeners();
popupAvatarInstance.setInitialData({avatarLink: ''});

api.getUserInfo()
  .then((result) => {
    userInfoIntance.setUserInfo(result.name, result.about);
    popupEditTitleInput.value = result.name;
    popupEditDescriptionInput.value = result.about;
    profileAvatar.src = result.avatar;
  })
  .catch((err) => {
    console.log(err);
  });

api.getInitialCards()
  .then((result) => {
      section = new Section({items: result, renderer: function (item) {
        let isMine;
        if (item.owner._id === 'a5f8b2d7fe96175afc62b526') {
          isMine = true;
        } else {
          isMine = false;
        }
        const cardIntance = createCard(item.name, item.link, item.likes, item._id, isMine);
        section.addItem(cardIntance);
      }}, '.cards__list');
    })
  .then(() => {section.renderElements()})
  .catch((err) => {
    console.log(err);
  });

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
