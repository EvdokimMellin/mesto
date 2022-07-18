let edit = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let form = document.querySelector('.popup__form');
let closeButton = document.querySelector('.popup__close-button');
let saveButton = document.querySelector('.popup__save-button');
let name = document.querySelector('.profile__name');
let description = document.querySelector('.profile__description');
let inputName = document.querySelector('.popup__input_type_name');
let inputDescription = document.querySelector('.popup__input_type_description');


function openPopup() {
  inputName.value = name.textContent;
  inputDescription.value = description.textContent;
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function save(evt) {
  evt.preventDefault();
  name.textContent = inputName.value;
  description.textContent = inputDescription.value;
  closePopup();
}

edit.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
form.addEventListener('submit', save);

