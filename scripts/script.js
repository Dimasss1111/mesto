// Открытие попапа
let popup = document.querySelector('.popup')
let popupActive = document.querySelector('.person__edit-button');

function popupOpen() {
	popup.classList.add('popup_opened');
	personName.value = pagePersonName.textContent;
	personMerit.value = pagePersonMerit.textContent;
};

popupActive.addEventListener('click', popupOpen);

// Закрытие попапа
function popupClose() {
	popup.classList.remove('popup_opened');
}

let popupDisabled = document.querySelector('.popup__close-icon-button');

popupDisabled.addEventListener('click', popupClose);


// Редактирование профиля
let personName = document.querySelector('.popup__field_input_person');// в попапе
let pagePersonName = document.querySelector('.person__name');
let personMerit = document.querySelector('.popup__field_input_merits');//в попапе
let pagePersonMerit = document.querySelector('.person__merits');



let popupForm = document.querySelector('.popup__form');

function submitEditProfile(evt) {
	evt.preventDefault();
  popupClose();
	pagePersonName.textContent = personName.value;
	pagePersonMerit.textContent = personMerit.value;
};

popupForm.addEventListener('submit', submitEditProfile);