// Открытие попапа
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
let places = document.querySelector('.places');
initialCards.forEach(function(item){
  places.insertAdjacentHTML('beforeend',
    `<div class="place">
      <img src=${item.link} class="place__photo" alt=${item.name}>
      <div class="place__info">
        <h2 class="place__name">${item.name}</h2>
        <img src="./images/like.svg" class="place__like" alt="лайк">
      </div>
    </div>`)
})



// Открытие попапа УЧЕНОГО
let popup = document.querySelector('.popup')
let popupActive = document.querySelector('.person__edit-button');

function popupOpen (){
  popup.classList.add('popup_opened');
  personName.value = pagePersonName.textContent;
  personMerit.value = pagePersonMerit.textContent;
};

popupActive.addEventListener('click', popupOpen);


// Закрытие попапа УЧЕНОГО
function popupClose (){
  popup.classList.remove('popup_opened');
}

let popupDisabled = document.querySelector('.popup__close-icon-button');

popupDisabled.addEventListener('click', popupClose);

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