function showInputError (formElement, /*inputElement,*/ errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  //inputElement.classList.add('form__input_type_error');
  errorElement.textContent = errorMessage;
  //errorElement.classList.add('form__input-error_active');
};

function hideInputError (formElement /*, inputElement*/) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  //inputElement.classList.remove('form__input_type_error');
  //errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
};

function checkInputValidity (formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, /*inputElement,*/ inputElement.validationMessage);
  } else {
    hideInputError(formElement /*, inputElement*/);
  }
};

//checkInputValidity (document.querySelector('#edit-form'), document.querySelector('#edit-name'));
