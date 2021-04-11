import {initialCards} from './initial-cards.js';
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

const allClasses = { 
  formSelector: '.popup__form', 
  inputSelector: '.popup__field', 
  submitButtonSelector: '.popup__addbutton', 
  inactiveButtonClass: 'popup__addbutton_invalid', 
  inputErrorClass: 'popup__field_input_error', 
  errorClass: 'popup__span_visible' 
} 

const templateSelector = '.template__place';

//Константы Изменения данных
const popupEditPersonProfile = document.querySelector('.popup__form_editPersonProfile');
const pagePersonName = document.querySelector('.person__name');
const pagePersonMerits = document.querySelector('.person__merits');
const personName = document.querySelector('.popup__field_input_person');
const personMerits = document.querySelector('.popup__field_input_merits');
const container = document.querySelector('.places');
const placeForm = document.querySelector('.popup__form_addPlaceList');

personName.value = pagePersonName.textContent;
personMerits.value = pagePersonMerits.textContent;

//Открытие попапов
const popupOpenButtonPerson = document.querySelector('.person__edit-logo');
const popupOpenButtonPlace = document.querySelector('.person__add-place-logo');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddPlace = document.querySelector('.popup_add-card');

export function openPopup(pop){
  pop.classList.add('popup_opened');
};

function openPopupPerson(){
  personName.value = pagePersonName.textContent;
  personMerits.value = pagePersonMerits.textContent;
  openPopup(popupEditProfile);
}
popupOpenButtonPerson.addEventListener('click', openPopupPerson);
popupOpenButtonPlace.addEventListener('click', function(){
  openPopup(popupAddPlace);
});

//Закрытие попапов
const popupCloseButton = document.querySelectorAll('.popup__close-icon');
const popupCloseButtonArr = Array.from(popupCloseButton);

function closePopup(item){
  item.classList.remove('popup_opened');
}

function searchClickPopupClose(evt){
  const target = evt.target;
  const popup = target.closest('.popup');
  return closePopup(popup);
}

popupCloseButtonArr.forEach((item)=>{
  item.addEventListener('click',searchClickPopupClose)
});


//Слушатели Esc и Оверлея для всех попапов
const popupList = document.querySelectorAll('.popup');
const popupListArr = Array.from(popupList);

//Закрытие через Esc
function escClose (evt){
  if ((evt.key==='Escape')&& (document.querySelector('.popup_opened')!==null)) {
  const closingPopup = document.querySelector('.popup_opened');
  
  closePopup(closingPopup);
  }
};

//Закрытие через оверлей
function overlayClose(evt){
  const target = evt.target;
  if (target.classList.contains('popup')){
    closePopup(target);
  }
}

popupListArr.forEach((item)=>{
  item.addEventListener('click', overlayClose);
});

document.addEventListener('keydown', escClose);

//Добавление карточек

// создание карточки с изображением
function createCard(item, templateSelector){
  const card = new Card(item, templateSelector)
  return card.generateCard();
};

const inputNameForm = placeForm.querySelector('.popup__field_input_place');
const inputLinkForm = placeForm.querySelector('.popup__field_input_link');

//const inputClear = (element)=>{element.value='';}

function submitAddCardForm(evt){
  evt.preventDefault();
  const inputItem = {
    name: "",
    link: "",
  }
  inputItem.name = inputNameForm.value;
  inputItem.link = inputLinkForm.value;
  const newPlace = createCard(inputItem, templateSelector);
  container.prepend(newPlace);
  const targetForm = evt.target.closest('.popup__form');
  console.log(targetForm);
  /*
  const inputList = Array.from(targetForm.querySelectorAll('.popup__field'));
  inputList.forEach(inputClear);*/
  
  searchClickPopupClose(evt);
  targetForm.reset();
}

placeForm.addEventListener('submit', submitAddCardForm);

function submitEditProfile (evt) {
  evt.preventDefault();
  pagePersonName.textContent = personName.value;
  pagePersonMerits.textContent = personMerits.value;
  searchClickPopupClose(evt);
};

popupEditPersonProfile.addEventListener('submit', submitEditProfile);

initialCards.forEach((item)=>{
  const currentCard = createCard(item, templateSelector);
  container.append(currentCard);
})

//Валидация карточки
const placeValidatorForm = new FormValidator(allClasses, placeForm);
placeValidatorForm.enableValidation();

//Валидация профиля
const personValidatorForm = new FormValidator(allClasses, popupEditPersonProfile);
personValidatorForm.enableValidation();