//Импорт

import './index.css';

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from '../components/Api.js';




//Переменные

const popupEdit = document.querySelector('.popup_type_edit');
const popupEditForm = popupEdit.querySelector('.popup__form');
const popupEditOpenButton = document.querySelector('.profile__edit-button');
const popupAdd = document.querySelector('.popup_type_add');
const popupAddForm = popupAdd.querySelector('.popup__form');
const popupAddOpenButton = document.querySelector('.profile__add-button');
const profileAvatar = document.querySelector('.profile__avatar');
const popupAvatar = document.querySelector('.popup_type_avatar');
const popupAvatarOpenButton = document.querySelector('.profile__avatar-hover');
const popupAvatarForm = popupAvatar.querySelector('.popup__form');
const forms = [popupEditForm, popupAddForm, popupAvatarForm];
const initialValidForms = [popupEditForm];
const initialInvalidForms = [popupAddForm, popupAvatarForm];
const popupConfirmSubmitButton = document.querySelector('.popup__confirm-button');

const popupOpenButtonsObj = {
  [popupEditForm.id]: popupEditOpenButton,
  [popupAddForm.id]: popupAddOpenButton,
  [popupAvatarForm.id]: popupAvatarOpenButton
};

const userInfoInstance = new UserInfo({
  nameSelector: '.profile__name',
  descriptionSelector: '.profile__description',
  avatar: profileAvatar
});
let section;
const config = {
  headers: {
    authorization: 'e8e321ed-060f-4966-8b17-7867fd5284ad',
    'Content-Type': 'application/json'
  },
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-52'
};
const api = new Api(config);
let cardToDelete;



//Функции

function createCard (name, link, likes, id, isMine) {
  const newCard = new Card(name, link, likes, id, isMine, '#card-template', popupImageInstance.open.bind(popupImageInstance), function (link, name) {this._handleOpenPopupImage(link, name)}, popupConfirmInstance.open.bind(popupConfirmInstance), popupConfirmSubmitButton, userInfoInstance.getUserInfo().id, api, function() {cardToDelete = this});

  return newCard.generateCard();
}

function renderLoading(isLoading, button, initialButtonText, renderText) {
  if (isLoading) {
    button.textContent = renderText;
  } else {
    button.textContent = initialButtonText;
  }
}


function submitPopupEdit ({editName, editDescription}) {
  renderLoading(true, popupEdit.querySelector('.popup__save-button'), 'Сохранить', 'Сохранение...');

  api.updateUserInfo(editName, editDescription)
  .then(() => {
    console.log('Данные успешно обновлены');
    userInfoInstance.setUserInfo(editName, editDescription, '', '');
    const {name: userName, description: userDescription} = userInfoInstance.getUserInfo();
    this.setInitialData({editName: userName, editDescription: userDescription});
    this.close();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    renderLoading(false, popupEdit.querySelector('.popup__save-button'), 'Сохранить', 'Сохранение...');
  });

}

function submitPopupAdd ({addName, addDescription}) {
  renderLoading(true, popupAdd.querySelector('.popup__save-button'), 'Создать', 'Сохранение...');

  api.addCard(addName, addDescription)
    .then((res) => {
      section.addItem(createCard(addName, addDescription, [], res._id, true));
      this.setInitialData({addName: '', addDescription: ''})
      this.close();
      console.log('Карточка успешно добавлена');
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, popupAdd.querySelector('.popup__save-button'), 'Создать', 'Сохранение...');
    });

}

function submitPopupConfirm () {
  renderLoading(true, popupConfirmSubmitButton, 'Да', 'Удаление...');

  cardToDelete.delete()
    .then(() => {
      this.close();
    })
    .finally(() => {
      renderLoading(false, popupConfirmSubmitButton, 'Да', 'Удаление...');
    })
}

function submitPopupAvatar ({avatarLink}) {
  renderLoading(true, popupAvatar.querySelector('.popup__save-button'), 'Сохранить', 'Сохранение...');

  api.updateAvatar(avatarLink)
    .then(() => {;
      userInfoInstance.setUserInfo('', '', avatarLink, '');
      console.log('Аватар обновлен');
      this.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, popupAvatar.querySelector('.popup__save-button'), 'Сохранить', 'Сохранение...');
    });

}



//Исполнительный код


const popupEditProfileInstance = new PopupWithForm(`.popup_type_edit`, submitPopupEdit);
const popupAddCardInstance = new PopupWithForm(`.popup_type_add`, submitPopupAdd);
const popupImageInstance = new PopupWithImage(`.popup_type_image`);
const popupConfirmInstance = new PopupWithForm (`.popup_type_confirm`, submitPopupConfirm);
const popupAvatarInstance = new PopupWithForm(`.popup_type_avatar`, submitPopupAvatar);

popupEditProfileInstance.setEventListeners();

popupAddCardInstance.setEventListeners();
popupAddCardInstance.setInitialData({addName: '', addDescription: ''})

popupImageInstance.setEventListeners();

popupEditOpenButton.addEventListener('click', () => popupEditProfileInstance.open());
popupAddOpenButton.addEventListener('click', () => popupAddCardInstance.open());
popupAvatarOpenButton.addEventListener('click', () => popupAvatarInstance.open());

popupConfirmInstance.setEventListeners();

popupAvatarInstance.setEventListeners();
popupAvatarInstance.setInitialData({avatarLink: ''});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    popupEditProfileInstance.setInitialData({editName: userData.name, editDescription: userData.about});

    userInfoInstance.setUserInfo(userData.name, userData.about, userData.avatar, userData._id);

    section = new Section({items: cards, renderer: function (item) {
      let isMine;
      if (item.owner._id === userData._id) {
        isMine = true;
      } else {
        isMine = false;
      }
      const cardInstance = createCard(item.name, item.link, item.likes, item._id, isMine);
      section.addItem(cardInstance);
    }}, '.cards__list');

    section.renderElements();
  })
  .catch(err => {
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
