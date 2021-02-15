// Открытие попапа
let popup = document.querySelector('.popup')
let popupActive = document.querySelector('.person__edit');

function popupOpen (){
  popup.classList.add('popup_opened');
  personName.value = pagePersonName.textContent;
  personMerit.value = pagePersonMerit.textContent;
};

popupActive.addEventListener('click', popupOpen);

// Закрытие попапа
let popupDisabled = document.querySelector('.popup__close-icon');

popupDisabled.addEventListener('click',function () {
  popup.classList.remove('popup_opened');
});


// Редактирование профиля
let personName = document.querySelector('.popup__text_person');// в попапе
let pagePersonName = document.querySelector('.person__name');
let personMerit = document.querySelector('.popup__text_merits');//в попапе
let pagePersonMerit = document.querySelector('.person__merits');



personName.addEventListener('focus', function(){personName.value = ''});
personMerit.addEventListener('focus', function(){personMerit.value = ''});

let saveButton = document.querySelector('.popup__addbutton');

function editProfile() {
  pagePersonName.textContent = personName.value;
  pagePersonMerit.textContent = personMerit.value;
  personName.value = pagePersonName.textContent;
  personMerit.value = pagePersonMerit.textContent;
};

saveButton.addEventListener('click', editProfile);