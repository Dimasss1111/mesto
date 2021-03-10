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
const placeForm = document.querySelector('.popup__form_addPlaceList');
const templatePlace = document.querySelector('.template__place');

//Переключение лайка
function switchLike(evt){
  const target = evt.target;
  if (target.getAttribute('src') == './images/like.svg'){
    target.setAttribute('src','./images/like_active.svg');
  }
  else {
    target.setAttribute('src','./images/like.svg');
  }
}

//Большая картинка
function openBigPicture(evt){
  const target = evt.target;
  const openedPlace = target.closest('.place');
  const placeTitle = openedPlace.querySelector('.place__name');
  const placePhoto = openedPlace.querySelector('.place__photo');
  const popupPhoto = document.querySelector('.popup__big-picture');
  const popupTitle = document.querySelector('.popup__title_big-picture');
  const openPopupPic = popupTitle.closest('.popup');
  popupTitle.textContent = placeTitle.textContent;
  popupPhoto.src = placePhoto.src;
  popupPhoto.alt = placePhoto.alt;
  openPopupPic.classList.add('popup_opened');
  openPopupPic.classList.add('popup_opened_big-picture');
}


//Удаление карточки
function deleteCard(evt){
  const target = evt.target;
  const removingCard = target.closest('.place');
  removingCard.remove();
}


//Слушателu событий карточки
function addCardListeners(card){
  const deleteButton = card.querySelector('.place__remove');
  deleteButton.addEventListener('click', deleteCard);

  const likeButton = card.querySelector('.place__like');
  likeButton.addEventListener('click', switchLike);

  const bigPicture = card.querySelector('.place__photo');
  bigPicture.addEventListener('click', openBigPicture);
}


//Отрисовка карточек
function createPlaceDomNode(name, link){
  const newPlace = templatePlace.content.cloneNode(true);
  const headerPlace = newPlace.querySelector('.place__name');
  const linkPlace = newPlace.querySelector('.place__photo');
  headerPlace.textContent = name;
  linkPlace.src = link;
  linkPlace.alt = name;
  return newPlace;
}

function createPlaceArguments(item){
  const nameArg = item.name;
  const linkArg = item.link;
  const newPlaceElement = createPlaceDomNode(nameArg, linkArg);
  addCardListeners(newPlaceElement);
  return newPlaceElement;
}

function renderPlaces(){
  const result = initialCards.map(createPlaceArguments);
  container.append(...result);
}

renderPlaces();


//Открытие попапов
const openPopupPerson = document.querySelector('.person__edit-logo');
const openPopupPlace = document.querySelector('.person__add-place-logo');
const popupPersonChildren = document.querySelector('.popup__form_editPersonProfile');
const popupPerson = popupPersonChildren.closest('.popup');
const popupPlaceChildren = document.querySelector('.popup__form_addPlaceList');
const popupPlace = popupPlaceChildren.closest('.popup');

openPopupPerson.addEventListener('click', function(){
  popupPerson.classList.add('popup_opened');
  personName.value = pagePersonName.textContent;
  personMerits.value = pagePersonMerits.textContent;
});
openPopupPlace.addEventListener('click', ()=> {popupPlace.classList.add('popup_opened')});

//Закрытие попапов
const popupCloseButton = document.querySelectorAll('.popup__close-icon');
const popupCloseButtonArr = Array.from(popupCloseButton);

function closePopup(element){
  element.classList.remove('popup_opened');
}

function searchElementPopupClose(evt){
  const closingButton = evt.target;
  const closingPopup = closingButton.closest('.popup');
  closePopup(closingPopup);
}

function searchClickPopupClose(item){
  item.addEventListener('click', searchElementPopupClose);
}

popupCloseButtonArr.forEach(searchClickPopupClose);



//Добавление карточек
function addCard(evt){
  evt.preventDefault();
  const inputNameForm = placeForm.querySelector('.popup__field_input_place');
  const inputLinkForm = placeForm.querySelector('.popup__field_input_link');
  const inputName = inputNameForm.value;
  const inputLink = inputLinkForm.value;
  const newPlace = createPlaceDomNode(inputName, inputLink);
  addCardListeners(newPlace);
  container.prepend(newPlace);
  
  searchElementPopupClose(evt);//Использую ранее описанную функцию для закрытия формы по кнопке 'Сохранить'
  inputNameForm.value = '';
  inputLinkForm.value = '';
}


placeForm.addEventListener('submit', addCard);


//Редактирование профиля

//Изменение данных профиля
const popupEditPersonProfile = document.querySelector('.popup__form_editPersonProfile');
const pagePersonName = document.querySelector('.person__name');
const pagePersonMerits = document.querySelector('.person__merits');
const personName = document.querySelector('.popup__field_input_person');
const personMerits = document.querySelector('.popup__field_input_merits');

function submitEditProfile (evt) {
  evt.preventDefault();
  pagePersonName.textContent = personName.value;
  pagePersonMerits.textContent = personMerits.value;
  console.log(pagePersonName.textContent);
  searchElementPopupClose(evt);//Использую ранее описанную функцию для закрытия формы по кнопке 'Сохранить'
};

popupEditPersonProfile.addEventListener('submit', submitEditProfile);