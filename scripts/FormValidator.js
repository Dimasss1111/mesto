export class FormValidator {
  constructor(data, formElement){
    this._formSelector = data.formSelector;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  }


  _hasInvalidInput () {
    return this._inputList.some(inputElement => !inputElement.validity.valid);
  };

  _toggleButtonState () {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(`${this._inactiveButtonClass}`);
      this._buttonElement.setAttribute('disabled', true);
    } else {
      this._buttonElement.classList.remove(`${this._inactiveButtonClass}`);
      this._buttonElement.removeAttribute('disabled');
    }
  };

  _showInputError (inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(`${this._inputErrorClass}`);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(`${this._errorClass}`);
  };

  _hideInputError (inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(`${this._inputErrorClass}`);
    errorElement.classList.remove(`${this._errorClass}`);
  }
  _checkInput (inputElement) {
    if (inputElement.validity.valid){
      this._hideInputError (inputElement);
    } else {
      this._showInputError(inputElement);
    }
  };

  _setInputListeners () {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInput(inputElement);
        this._toggleButtonState();
      })
    });
    this._toggleButtonState();
  };

  enableValidation(){
    this._formElement.addEventListener('submit', (evt) =>{
      evt.preventDefault();
    })
    this._setInputListeners();
  }
};