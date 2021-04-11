import {openPopup} from './index.js';
export class Card{
  constructor(data, templateSelector){
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }
  //Открытие большой картинки
  _openBigPicture(_link, _name){
    const popupPhoto = document.querySelector('.popup__big-picture'); //находим большую картинку
    const searchPopupWithBigPhoto = document.querySelector('.popup_big-picture')//находим попап с большой картинкой
    const popupTitle = document.querySelector('.popup__big-picture-title');//находим подпись к большой картинке 
    popupTitle.textContent = this._name;
    popupPhoto.src = this._link; 
    popupPhoto.alt = this._name;
    openPopup(searchPopupWithBigPhoto)
  }
  //Удаление карточки
  _deleteCard(evt){
    const target = evt.target;
    const removingCard = target.closest('.place');
    removingCard.remove();
  }

  //Переключение лайка 
  _switchLike(evt){
    const target = evt.target;
    target.classList.toggle('place__like_active');
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.place')
    .cloneNode(true);
    return cardElement;
  }

  _setEvenetListeners() {
    this._element.querySelector('.place__like').addEventListener('click', (evt) => {
      this._switchLike(evt);
    });
    this._element.querySelector('.place__remove').addEventListener('click', (evt) => {
      this._deleteCard(evt);
      })
    this._element.querySelector('.place__photo').addEventListener('click', (evt)=> {
      this._openBigPicture(this._link, this._name);
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEvenetListeners();
    this._element.querySelector('.place__photo').src = this._link;
    this._element.querySelector('.place__name').alt = this._name;
    this._element.querySelector('.place__name').textContent = this._name;
    return this._element;
  }
}