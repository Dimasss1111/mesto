
const container = document.querySelector('.places');
const placeForm = document.querySelector('.popup__form_addPlaceList');
const templatePlace = document.querySelector('.template__place');

//Константы Изменения данных профиля
const popupEditPersonProfile = document.querySelector('.popup__form_editPersonProfile');
const pagePersonName = document.querySelector('.person__name');
const pagePersonMerits = document.querySelector('.person__merits');
const personName = document.querySelector('.popup__field_input_person');
const personMerits = document.querySelector('.popup__field_input_merits');

//Переключение лайка 

function switchLike(evt){
  const target = evt.target;
  target.classList.toggle('place__like_active');
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
  addCardListeners(newPlace);
  return newPlace;
}

function renderPlaces(){
  const result = initialCards.map(function(item){
    const nameArg = item.name;
    const linkArg = item.link;
    const newPlaceElement = createPlaceDomNode(nameArg, linkArg);
    return newPlaceElement;
  });
  container.append(...result);
}

renderPlaces();


//Открытие попапов

const popupOpenButtonPerson = document.querySelector('.person__edit-logo');
const popupOpenButtonPlace = document.querySelector('.person__add-place-logo');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddPlace = document.querySelector('.popup_add-card');

function openPopup(pop){
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

//Большая картинка
const popupPhoto = document.querySelector('.popup__big-picture'); 
const popupTitle = document.querySelector('.popup__big-picture-title'); 

function openBigPicture(evt){
  const target = evt.target;
  const openedPlace = target.closest('.place'); 
  const placeTitle = openedPlace.querySelector('.place__name'); 
  const placePhoto = openedPlace.querySelector('.place__photo'); 
  const searchPopupBigPhoto= popupPhoto.closest('.popup');
  popupTitle.textContent = placeTitle.textContent; 
  popupPhoto.src = placePhoto.src; 
  popupPhoto.alt = placePhoto.alt;
  openPopup(searchPopupBigPhoto)
} 


//Закрытие попапов
const popupCloseButton = document.querySelectorAll('.popup__close-icon');
const popupCloseButtonArr = Array.from(popupCloseButton);


function closePopup(evt){
  const closingButton = evt.target;
  const closingPopup = closingButton.closest('.popup');
  closingPopup.classList.remove('popup_opened');
}

function searchClickPopupClose(item){
  item.addEventListener('click', closePopup);
}

popupCloseButtonArr.forEach(searchClickPopupClose);



//Добавление карточек
const inputNameForm = placeForm.querySelector('.popup__field_input_place');
const inputLinkForm = placeForm.querySelector('.popup__field_input_link');

function submitAddCardForm(evt){
  evt.preventDefault();
  const inputName = inputNameForm.value;
  const inputLink = inputLinkForm.value;
  const newPlace = createPlaceDomNode(inputName, inputLink);
  container.prepend(newPlace);
  
  closePopup(evt);//Использую ранее описанную функцию для закрытия формы по кнопке 'Сохранить'
  inputNameForm.value = '';
  inputLinkForm.value = '';
}


placeForm.addEventListener('submit', submitAddCardForm);


//Редактирование профиля

//Изменение данных профиля



function submitEditProfile (evt) {
  evt.preventDefault();
  pagePersonName.textContent = personName.value;
  pagePersonMerits.textContent = personMerits.value;
  personName.value = pagePersonName.textContent;
  personMerits.value = pagePersonMerits.textContent;
  closePopup(evt);//Использую ранее описанную функцию для закрытия формы по кнопке 'Сохранить'
};

popupEditPersonProfile.addEventListener('submit', submitEditProfile);
