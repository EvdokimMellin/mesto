function showError (settings, input, errorText, form) {
  const error = form.querySelector(`.${input.id}-error`);
  input.classList.add(settings.inputErrorClass);
  error.textContent = errorText;
};

function hideError (settings, input, form) {
  const error = form.querySelector(`.${input.id}-error`);
  input.classList.remove(settings.inputErrorClass);
  error.textContent = '';
};

function checkValidity (settings, input, form) {
  if (!input.validity.valid) {
    showError(settings, input, input.validationMessage, form);
  } else {
    hideError(settings, input, form);
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



function setEventListeners (form, settings) {
  const inputList = Array.from(form.querySelectorAll(settings.inputSelector));
  const submitButton = form.querySelector(settings.submitButtonSelector);

  toggleButtonState(inputList, submitButton);

  inputList.forEach((input) => {
    input.addEventListener('input', function () {
      checkValidity(settings, input, form);
      toggleButtonState(inputList, submitButton);
    });
  });
};

function enableValidation (settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((form) => {
    setEventListeners(form, settings);
  });
};

enableValidation({
  formSelector: '.popup__form',
  submitButtonSelector: '.popup__save-button',
  inputErrorClass: 'popup__input_invalid',
  inputSelector: '.popup__input'
});
