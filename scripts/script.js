// Открытие попапа
let popup = document.querySelector('.popup')
let popupActive = document.querySelector('.person__edit-button');

function popupOpen (){
  popup.classList.add('popup_opened');
  personName.value = pagePersonName.textContent;
  personMerit.value = pagePersonMerit.textContent;
};

popupActive.addEventListener('click', popupOpen);

// Закрытие попапа
function popupClose (){
  popup.classList.remove('popup_opened');
}

let popupDisabled = document.querySelector('.popup__close-icon-button');

popupDisabled.addEventListener('click', popupClose);


// Редактирование профиля
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