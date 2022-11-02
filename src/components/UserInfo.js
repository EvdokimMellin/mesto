export default class UserInfo {
  constructor ({nameSelector, descriptionSelector, avatar}) {
    this._name = document.querySelector(nameSelector);
    this._description = document.querySelector(descriptionSelector);
    this._avatar = avatar;
    this._id = '';
  }


  getUserInfo () {
    return {name: this._name.textContent, description: this._description.textContent, avatar: this._avatar.url, id: this._id};
  }

  setUserInfo (newName, newDescription, newAvatar, id) {
    if (newName && newDescription) { //Т.к метод используется при изменении данных приходится проверять, какие данные изменены, чтобы не трогать остальные
      this._name.textContent = newName;
      this._description.textContent = newDescription;
    }
    if (newAvatar) {
      this._avatar.src = newAvatar;
    }
    if (id) {
      this._id = id;
    }
  }
}
