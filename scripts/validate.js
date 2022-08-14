function showError (form, input, errorText) {
  const error = form.querySelector(`.${input.id}-error`);
  input.classList.add('popup__input_invalid');
  error.textContent = errorText;
};

function hideError (form, input) {
  const error = form.querySelector(`.${input.id}-error`);
  input.classList.remove('popup__input_invalid');
  error.textContent = '';
};

function checkValidity (form, input) {
  if (!input.validity.valid) {
    showError(form, input, input.validationMessage);
  } else {
    hideError(form, input);
  }
};

function hasInvalidInput (inputList) {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

function deactivateButton (submitButton) {
  submitButton.setAttribute('disabled', 'disabled');
}

function activateButton (submitButton) {
  submitButton.removeAttribute('disabled');
}

function toggleButtonState (inputList, submitButton) {
  if (hasInvalidInput(inputList)) {
    deactivateButton (submitButton);
  } else {
    activateButton (submitButton);
  }
};



function setEventListeners (form) {
  const inputList = Array.from(form.querySelectorAll('.popup__input'));
  const submitButton = form.querySelector('.popup__save-button');

  toggleButtonState(inputList, submitButton);

  inputList.forEach((input) => {
    input.addEventListener('input', function () {
      checkValidity(form, input);
      toggleButtonState(inputList, submitButton);
    });
  });
};

function enableValidation () {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((form) => {
    setEventListeners(form);
  });
};

enableValidation();
