let edit = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close-button');
let saveButton = document.querySelector('.popup__save-button');
let name = document.querySelector('.profile__name');
let description = document.querySelector('.profile__description');
let inputName = document.querySelector('.popup__input_type_name');
let inputDescription = document.querySelector('.popup__input_type_description');

inputName.value = name.textContent;
inputDescription.value = description.textContent;

function openPopup() {
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
  inputName.value = name.textContent;
  inputDescription.value = description.textContent;
}

function save() {
  /*name.innerHTML = `${inputName.value}<img alt="Редактировать" src="./images/edit-button.svg" class="profile__edit-button">`;*/
  /*При изменении текста с помощью textContent из элемента почему-то пропадал код кнопки
  внесения изменений. Я не нащел другого способа сохранить его*/
  name.textContent = `${inputName.value}`;
  description.textContent = inputDescription.value;
  closePopup();
}

edit.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
saveButton.addEventListener('click', save);

