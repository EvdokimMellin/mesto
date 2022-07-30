// Попап Image

const popupImage = document.querySelector('.popup_type_image');
const imageCloseButton = popupImage.querySelector('.popup__close-button');
const image = popupImage.querySelector('.popup__image');
const imageTitle = popupImage.querySelector('.popup__image-title');


function openPopupImage (title, link) {
  popupImage.classList.add('popup_opened');
  imageTitle.textContent = title;
  image.setAttribute('src', link);
}

function closePopupimage () {
  popupImage.classList.remove('popup_opened');
}

imageCloseButton.addEventListener('click', closePopupimage);



// Лайки, добавление и удаление карточек

const elementsList = document.querySelector('.elements__list');
const elementTemplate = document.querySelector('#element-template').content.children[0];
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


function addElement (text, link) {
  const element = elementTemplate.cloneNode(true);
  const likeButton = element.querySelector('.element__like-button');
  const delButton = element.querySelector('.element__del-button');
  const image = element.querySelector('.element__image')

  element.querySelector('.element__title').textContent = text;
  element.querySelector('.element__image').setAttribute('alt', text);
  element.querySelector('.element__image').setAttribute('src', link);
  elementsList.append(element);

  function like () {
    if (likeButton.classList.contains('element__like-button_active')) {
      likeButton.classList.remove('element__like-button_active');
    }
    else {
      likeButton.classList.add('element__like-button_active')
    }
  }

  function del () {
    element.remove();
  }

  function openImage () {
    openPopupImage(text, link);
  }

  likeButton.addEventListener('click', like);
  delButton.addEventListener('click', del);
  image.addEventListener('click', openImage);
}


for (let i = 0; i < initialCards.length; i++) {
  addElement(initialCards[i].name, initialCards[i].link);
}



// Попап Edit

const popupEdit = document.querySelector('.popup_type_edit');
const profileName = document.querySelector('.profile__name');
const profileInfo = document.querySelector('.profile__description');
const editForm = popupEdit.querySelector('.popup__form');
const editOpenButton = document.querySelector('.profile__edit-button');
const editCloseButton = popupEdit.querySelector('.popup__close-button');
const editInputName = popupEdit.querySelector('.popup__input_type_name');
const editInputInfo = popupEdit.querySelector('.popup__input_type_description');


function openPopupEdit () {
  editInputName.value = profileName.textContent;
  editInputInfo.value = profileInfo.textContent;
  popupEdit.classList.add('popup_opened');
}

function closePopupEdit () {
  popupEdit.classList.remove('popup_opened');
}

function submitPopupEdit (evt) {
  evt.preventDefault();
  profileName.textContent = editInputName.value;
  profileInfo.textContent = editInputInfo.value;
  closePopupEdit();
}


editOpenButton.addEventListener('click', openPopupEdit);
editCloseButton.addEventListener('click', closePopupEdit);
editForm.addEventListener('submit', submitPopupEdit);



// Попап Add

const popupAdd = document.querySelector('.popup_type_add');
const addForm = popupAdd.querySelector('.popup__form');
const addOpenButton = document.querySelector('.profile__add-button');
const addCloseButton = popupAdd.querySelector('.popup__close-button');
const addInputName = popupAdd.querySelector('.popup__input_type_name');
const addInputInfo = popupAdd.querySelector('.popup__input_type_description');


function openPopupAdd () {
  popupAdd.classList.add('popup_opened');
}

function closePopupAdd () {
  popupAdd.classList.remove('popup_opened');
  addInputName.value = '';
  addInputInfo.value = '';
}

function submitPopupAdd (evt) {
  evt.preventDefault();
  addElement(addInputName.value, addInputInfo.value);
  addInputName.value = '';
  addInputInfo.value = '';

  closePopupAdd();
}


addOpenButton.addEventListener('click', openPopupAdd);
addCloseButton.addEventListener('click', closePopupAdd);
addForm.addEventListener('submit', submitPopupAdd);
