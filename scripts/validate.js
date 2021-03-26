const allClasses = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__addbutton',
  inactiveButtonClass: 'popup__addbutton_invalid',
  inputErrorClass: 'popup__field_input_error',
  errorClass: 'popup__span_visible'
}

const hasInvalidInput = (inputList) => {
  return inputList.some(inputElement => !inputElement.validity.valid);
};

const toggleButtonState = (inputList, buttonElement, allClasses) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(`${allClasses.inactiveButtonClass}`);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(`${allClasses.inactiveButtonClass}`);
    buttonElement.removeAttribute('disabled');
  }
};

const showInputError = (formElement, inputElement, allClasses) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(`${allClasses.inputErrorClass}`);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(`${allClasses.errorClass}`);
};

const hideInputError = (formElement, inputElement, allClasses) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(`${allClasses.inputErrorClass}`);
  errorElement.classList.remove(`${allClasses.errorClass}`);
}
const checkInput = (formElement, inputElement)=> {
  if (inputElement.validity.valid){
    hideInputError (formElement, inputElement, allClasses);
  } else {
    showInputError(formElement, inputElement, allClasses);
  }
};

const setInputListeners = (formElement, allClasses)=>{
  const inputList = Array.from(formElement.querySelectorAll(`${allClasses.inputSelector}`));
  const buttonElement = formElement.querySelector(`${allClasses.submitButtonSelector}`);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInput(formElement, inputElement);
      toggleButtonState(inputList, buttonElement, allClasses);
    })
  });
  toggleButtonState(inputList, buttonElement, allClasses);
};

const enableValidation = (allClasses)=> {
  const formList = Array.from(document.querySelectorAll(`${allClasses.formSelector}`));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      setInputListeners(formElement, allClasses);//Нужно, чтобы после сабмита обновлялась активность кнопки
    });
    setInputListeners(formElement, allClasses);
  });
};
enableValidation(allClasses);