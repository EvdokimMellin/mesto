//Перменные

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
const cardTemplate = document.querySelector('#card-template').content.children[0];
const popupEdit = document.querySelector('.popup_type_edit');
const profileName = document.querySelector('.profile__name');
const profileInfo = document.querySelector('.profile__description');
const popupEditForm = popupEdit.querySelector('.popup__form');
const popupEditOpenButton = document.querySelector('.profile__edit-button');
const popupEditCloseButton = popupEdit.querySelector('.popup__close-button');
const popupEditInputName = popupEdit.querySelector('.popup__input_type_name');
const popupEditInputInfo = popupEdit.querySelector('.popup__input_type_description');
const popupEditSubmitButton = popupEdit.querySelector('.popup__save-button');
const popupAdd = document.querySelector('.popup_type_add');
const popupAddForm = popupAdd.querySelector('.popup__form');
const popupAddOpenButton = document.querySelector('.profile__add-button');
const popupAddCloseButton = popupAdd.querySelector('.popup__close-button');
const popupAddInputName = popupAdd.querySelector('.popup__input_type_name');
const popupAddInputInfo = popupAdd.querySelector('.popup__input_type_description');
const popupAddSubmitButton = popupAdd.querySelector('.popup__save-button');





//Функции

function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEscape);
}


function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEscape);
}


function renderPopupImage (title, link) {
  openPopup(popupImage);
  popupImageTitle.textContent = title;
  popupImageContent.setAttribute('src', link);
  popupImageContent.setAttribute('alt', title);
}


function closePopupImage () {
  closePopup(popupImage);
}


function createCard (text, link) {
  const card = cardTemplate.cloneNode(true);
  const likeButton = card.querySelector('.card__like-button');
  const delButton = card.querySelector('.card__del-button');
  const image = card.querySelector('.card__image')

  card.querySelector('.card__title').textContent = text;
  image.setAttribute('alt', text);
  image.setAttribute('src', link);

  function like () {
    likeButton.classList.toggle('card__like-button_active');
  }

  function del () {
    card.remove();
  }

  function openImage () {
    renderPopupImage(text, link);
  }

  likeButton.addEventListener('click', like);
  delButton.addEventListener('click', del);
  image.addEventListener('click', openImage);
  return card;
}

function renderCard (text, link) {
  cardsList.prepend(createCard(text, link));
}


function renderPopupEdit () {
  popupEditInputName.value = profileName.textContent;
  popupEditInputInfo.value = profileInfo.textContent;
  activateButton(popupEditSubmitButton);
  hideError({inputErrorClass: 'popup__input_invalid'}, popupEditInputName, popupEditForm);
  hideError({inputErrorClass: 'popup__input_invalid'}, popupEditInputInfo, popupEditForm);
  enableValidation({
    formSelector: '#edit-form',
    submitButtonSelector: '#edit-save-button',
    inputErrorClass: 'popup__input_invalid',
    inputSelector: '.popup__input'
    //inactiveButtonClass и errorClass я не использую, потому что стили неактивной кнопки прописаны через псевдокласс "disabled", а errorClass ищется по id поля ввода
  });
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
  hideError({inputErrorClass: 'popup__input_invalid'}, popupAddInputName, popupAddForm);
  hideError({inputErrorClass: 'popup__input_invalid'}, popupAddInputInfo, popupAddForm);
  deactivateButton(popupAddSubmitButton);
  enableValidation({
    formSelector: '#newcard-form',
    submitButtonSelector: '#add-save-button',
    inputErrorClass: 'popup__input_invalid',
    inputSelector: '.popup__input'
  });
  openPopup(popupAdd);
}


function closePopupAdd () {
  closePopup(popupAdd);
}


function submitPopupAdd (evt) {
  evt.preventDefault();

  renderCard(popupAddInputName.value, popupAddInputInfo.value);

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





//Исполнительный код

popupImageCloseButton.addEventListener('click', closePopupImage);
popupImage.addEventListener('click', closePopupByOverlay);

initialCards.forEach(function (initialCard) {
  renderCard(initialCard.name, initialCard.link);
});

popupEditOpenButton.addEventListener('click', renderPopupEdit);
popupEditCloseButton.addEventListener('click', closePopupEdit);
popupEdit.addEventListener('click', closePopupByOverlay);
popupEditForm.addEventListener('submit', submitPopupEdit);

popupAddOpenButton.addEventListener('click', renderPopupAdd);
popupAddCloseButton.addEventListener('click', closePopupAdd);
popupAdd.addEventListener('click', closePopupByOverlay);
popupAddForm.addEventListener('submit', submitPopupAdd);

