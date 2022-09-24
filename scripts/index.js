//Импорт

import Card from "./Card.js";
import FormValidator from "./FormValidator.js";



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
export const popupEditOpenButton = document.querySelector('.profile__edit-button');
const popupEditCloseButton = popupEdit.querySelector('.popup__close-button');
const popupEditInputName = popupEdit.querySelector('.popup__input_type_name');
const popupEditInputInfo = popupEdit.querySelector('.popup__input_type_description');
const popupAdd = document.querySelector('.popup_type_add');
const popupAddForm = popupAdd.querySelector('.popup__form');
export const popupAddOpenButton = document.querySelector('.profile__add-button');
const popupAddCloseButton = popupAdd.querySelector('.popup__close-button');
const popupAddInputName = popupAdd.querySelector('.popup__input_type_name');
const popupAddInputInfo = popupAdd.querySelector('.popup__input_type_description');
export const forms = [popupEditForm, popupAddForm];



//Функции

function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEscape);
}


function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEscape);
}


export function renderPopupImage (title, link) {
  openPopup(popupImage);
  popupImageTitle.textContent = title;
  popupImageContent.setAttribute('src', link);
  popupImageContent.setAttribute('alt', title);
}


function closePopupImage () {
  closePopup(popupImage);
}

function newCard (name, link, templateSelector) {
  const card = new Card(name, link, templateSelector);
  cardsList.prepend(card.renderCard());
}

function renderPopupEdit () {
  popupEditInputName.value = profileName.textContent;
  popupEditInputInfo.value = profileInfo.textContent;
  openPopup(popupEdit);
}


function closePopupEdit () {
  closePopup(popupEdit);
}


function submitPopupEdit (evt) {
  evt.preventDefault();
  profileName.textContent = popupEditInputName.value;
  profileInfo.textContent = popupEditInputInfo.value;
  closePopup(popupEdit);
}


function renderPopupAdd () {
  popupAddForm.reset();
  openPopup(popupAdd);
}


function closePopupAdd () {
  closePopup(popupAdd);
}


function submitPopupAdd (evt) {
  evt.preventDefault();

  newCard(popupAddInputName.value, popupAddInputInfo.value, '#card-template');

  closePopup(popupAdd);
}

function closePopupByOverlay (evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup (evt.target);
  }
}

function closePopupByEscape (evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened')
    closePopup (popup);
  }
}

function popupFormValidation (form) {
  const popupFormValidator = new FormValidator ({
      submitButtonSelector: '.popup__save-button',
      inputErrorClass: 'popup__input_invalid',
      inputSelector: '.popup__input'
    }, form);
  popupFormValidator.enableValidation();

}



//Исполнительный код

popupImageCloseButton.addEventListener('click', closePopupImage);
popupImage.addEventListener('click', closePopupByOverlay);

initialCards.forEach(function (initialCard) {
  newCard(initialCard.name, initialCard.link, '#card-template');
});
forms.forEach(function (form) {
  popupFormValidation (form);
});

popupEditOpenButton.addEventListener('click', renderPopupEdit);
popupEditCloseButton.addEventListener('click', closePopupEdit);
popupEdit.addEventListener('click', closePopupByOverlay);
popupEditForm.addEventListener('submit', submitPopupEdit);

popupAddOpenButton.addEventListener('click', renderPopupAdd);
popupAddCloseButton.addEventListener('click', closePopupAdd);
popupAdd.addEventListener('click', closePopupByOverlay);
popupAddForm.addEventListener('submit', submitPopupAdd);
