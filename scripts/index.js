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





//Функции

function openPopup (popup) {
  popup.classList.add('popup_opened');
}


function closePopup (popup) {
  popup.classList.remove('popup_opened');
}


function renderPopupImage (title, link) {
  openPopup(popupImage);
  popupImageTitle.textContent = title;
  popupImageContent.setAttribute('src', link);
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
    if (likeButton.classList.contains('card__like-button_active')) {
      likeButton.classList.remove('card__like-button_active');
    }
    else {
      likeButton.classList.add('card__like-button_active')
    }
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
  activateButton(popupEditSubmitButton); //Изначально кнопка неактивна, но после автоматического заполнения валидными значениями необходимо ее активировать
  hideError(popupEditForm, popupEditInputName); // При закрытии попапа поля возвращаются к исходным валидным значениям, поэтому необходимо убрать ошибку
  hideError(popupEditForm, popupEditInputInfo);
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
  popupAddInputName.value = '';
  popupAddInputInfo.value = '';
  hideError(popupAddForm, popupAddInputName);
  hideError(popupAddForm, popupAddInputInfo);
  openPopup(popupAdd);
}


function closePopupAdd () {
  closePopup(popupAdd);
}


function submitPopupAdd (evt) {
  evt.preventDefault();

  renderCard(popupAddInputName.value, popupAddInputInfo.value);
  popupAddInputName.value = '';
  popupAddInputInfo.value = '';

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
    if (popup) {
      closePopup (popup);
    }
  }
}





//Исполнительный код

popupImageCloseButton.addEventListener('click', closePopupImage);
popupImage.addEventListener('click', closePopupByOverlay);

for (let i = 0; i < initialCards.length; i++) {
  renderCard(initialCards[i].name, initialCards[i].link);
}

popupEditOpenButton.addEventListener('click', renderPopupEdit);
popupEditCloseButton.addEventListener('click', closePopupEdit);
popupEdit.addEventListener('click', closePopupByOverlay);
popupEdit.addEventListener('keydown', closePopupByEscape);
popupEditForm.addEventListener('submit', submitPopupEdit);

popupAddOpenButton.addEventListener('click', renderPopupAdd);
popupAddCloseButton.addEventListener('click', closePopupAdd);
popupAdd.addEventListener('click', closePopupByOverlay);
popupAdd.addEventListener('keydown', closePopupByEscape);
popupAddForm.addEventListener('submit', submitPopupAdd);

document.addEventListener('keydown', closePopupByEscape);
