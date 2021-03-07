//Вставка картинок
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

const container = document.querySelector('.places');
//const popupEditPersonProfile = document.querySelector('.popup__editPersonProfile');
const placeForm = document.querySelector('.popup__form_editPlaceList');
const templateElement = document.querySelector('.template');

//Для вставки исходных карточек
function createPlaceDomNode(item){
  const newPlace = templateElement.content.cloneNode(true);
  const headerPlace = newPlace.querySelector('.place__name');
  const linkPlace = newPlace.querySelector('.place__photo');
  headerPlace.textContent = item.name;
  linkPlace.src = item.link;
  linkPlace.alt = item.name;
  return newPlace;
}
//Для вставки пользовательских карточек
function createUserPlaceDomNode(link, name){
  const newPlace = templateElement.content.cloneNode(true);
  const headerPlace = newPlace.querySelector('.place__name');
  const linkPlace = newPlace.querySelector('.place__photo');
  headerPlace.textContent = name;
  linkPlace.src = link;
  linkPlace.alt = name;
  return newPlace;
}


function renderPlaces(){
  const result = initialCards.map(createPlaceDomNode);
  container.append(...result);
}

function addPlaceFormListener(evt) {
  evt.preventDefault();
  const inputNameForm = placeForm.querySelector('.popup__input_place');
  const inputLinkForm = placeForm.querySelector('.popup__input_link');
  const inputName = inputNameForm.value;
  const inputLink = inputLinkForm.value;
  console.log(inputLink);
  const newPlace = createUserPlaceDomNode(inputLink, inputName);
  container.prepend(newPlace);
}

renderPlaces();

placeForm.addEventListener('submit', addPlaceFormListener);




//Попытка(успешная) сделать универсальный слушатель открытия попапов

//Обработка кнопок открытия
const openButtonAll = document.querySelectorAll('.person__button');
const openButton = Array.from(openButtonAll);

function openingPopup(keyword){
  const thisPopup = keyword.closest('.popup');//получаем ближайшего родителя с классом popup
  thisPopup.classList.add('popup_opened');
}

function comparing(text, mainText){
  const mainTextPrepared = mainText.classList.value;//Получаем строку списка классов
  const searchText = text.toLowerCase();
  const searchMainText = mainTextPrepared.toLowerCase();//сравниваем искомый текст со строкой списка классов
  if(searchMainText.includes(searchText)){
    openingPopup(mainText);
  }

}

function searchPopup(inputVar){
  const forms = document.querySelectorAll('.popup__form');
  const formsArr = Array.from(forms);
  const requredText = inputVar.slice(inputVar.length - 9, inputVar.length - 5);//отрезаем искомый текст
  for (let i = 0; i < formsArr.length; i++) { //для полученных элементов сравниваем искомый текст
    comparing(requredText, (formsArr[i]));
  }
  
}

function searchClickedElement(evt){
    const clickedButton = evt.target;
    const clickedButtonClassList = Array.from(clickedButton.classList);
    const exportVar = clickedButtonClassList[clickedButtonClassList.length - 1];//находим последний класс из списка
    searchPopup(exportVar);//отправляем строку с названием класса
};

function searchClick(item){
  item.addEventListener('click', searchClickedElement);
}
openButton.forEach(searchClick);//Отслеживание клика на каждой кнопке открытия попапа














































/*
// Открытие попапа УЧЕНОГО
let popup = document.querySelector('.popup')
let popupPersonActive = document.querySelector('.person__button_edit');

function popupOpen (){
  popup.classList.add('popup_opened');
  personName.value = pagePersonName.textContent;
  personMerit.value = pagePersonMerit.textContent;
};

popupPersonActive.addEventListener('click', popupOpen);


// Закрытие попапа УЧЕНОГО
function popupClose (){
  popup.classList.remove('popup_opened');
}

let popupPersonDisabled = document.querySelector('.popup__close-icon-button');

popupPersonDisabled.addEventListener('click', popupClose);

// Редактирование профиля УЧЕНОГО
let personName = document.querySelector('.popup__input_person');// в попапе
let pagePersonName = document.querySelector('.person__name');
let personMerit = document.querySelector('.popup__input_merits');//в попапе
let pagePersonMerit = document.querySelector('.person__merits');


let saveButton = document.querySelector('.popup__addbutton');

function submitEditProfile (evt) {
  evt.preventDefault();
  pagePersonName.textContent = personName.value;
  pagePersonMerit.textContent = personMerit.value;
};

saveButton.addEventListener('submit', submitEditProfile);



//Открытие попапа ЛОКАЦИИ
let place = document.querySelector('.place');
let openButton = document.querySelectorAll('.person__button');

openButton.addEventListener('click',function(event){
  console.log(event.target);
})
*/