(()=>{"use strict";function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var t=function(){function t(e,n,r,o,i,a,c,s,u,l,p,f,h){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this._name=e,this._link=n,this._likes=r,this._templateSelector=a,this._handleOpenPopupImage=c,this._handleCardClick=s,this._handleOpenPopupConfirm=u,this._confirmButton=l,this._isMine=i,this._id=o,this._api=f,this._myId=p,this._giveCardInstance=h}var n,r;return n=t,(r=[{key:"_createCard",value:function(){if(this._cardElement=document.querySelector(this._templateSelector).content.querySelector(".card").cloneNode(!0),this._likesNumber=this._cardElement.querySelector(".card__likes-number"),this._isMine){var e=document.createElement("button");e.classList.add("card__del-button"),this._cardElement.append(e),this._delButton=this._cardElement.querySelector(".card__del-button")}this._likeButton=this._cardElement.querySelector(".card__like-button"),this._image=this._cardElement.querySelector(".card__image"),this._cardElement.querySelector(".card__title").textContent=this._name,this._image.setAttribute("alt",this._name),this._image.setAttribute("src",this._link),this._likesNumber.textContent=this._likes.length}},{key:"_like",value:function(){var e=this;this._likeButton.classList.contains("card__like-button_active")?this._api.removeLike(this._id).then((function(t){e._likesNumber.textContent=t.likes.length,e._likeButton.classList.remove("card__like-button_active"),console.log("Лайк убран")})).catch((function(e){console.log(e)})):this._api.like(this._id).then((function(t){e._likesNumber.textContent=t.likes.length,e._likeButton.classList.add("card__like-button_active"),console.log("Лайк поставлен")})).catch((function(e){console.log(e)}))}},{key:"delete",value:function(){var e=this;this._api.deleteCard(this._id).then((function(){e._cardElement.remove(),e._cardElement=null,console.log("Карточка удалена")})).catch((function(e){console.log(e)}))}},{key:"_setEventListeners",value:function(){var e=this;this._likes.forEach((function(t){t._id===e._myId&&e._likeButton.classList.add("card__like-button_active")})),this._likeButton.addEventListener("click",(function(){e._like()})),this._delButton&&this._delButton.addEventListener("click",(function(){e._handleOpenPopupConfirm(),e._giveCardInstance()})),this._image.addEventListener("click",(function(){e._handleCardClick(e._link,e._name)}))}},{key:"generateCard",value:function(){return this._createCard(),this._setEventListeners(),this._cardElement}}])&&e(n.prototype,r),Object.defineProperty(n,"prototype",{writable:!1}),t}();function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var r=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._form=n,this._settings=t,this._inputList=Array.from(this._form.querySelectorAll(this._settings.inputSelector)),this._submitButton=this._form.querySelector(this._settings.submitButtonSelector)}var t,r;return t=e,(r=[{key:"_showError",value:function(e,t){var n=this._form.querySelector(".".concat(e.id,"-error"));e.classList.add(this._settings.inputErrorClass),n.textContent=t}},{key:"_hideError",value:function(e){var t=this._form.querySelector(".".concat(e.id,"-error"));e.classList.remove(this._settings.inputErrorClass),t.textContent=""}},{key:"_toggleInputErrorState",value:function(e){e.validity.valid?this._hideError(e):this._showError(e,e.validationMessage)}},{key:"_hasInvalidInput",value:function(){return this._inputList.some((function(e){return!e.validity.valid}))}},{key:"_deactivateButton",value:function(){this._submitButton.setAttribute("disabled","disabled")}},{key:"_activateButton",value:function(){this._submitButton.removeAttribute("disabled")}},{key:"_toggleButtonState",value:function(){this._hasInvalidInput()?this._deactivateButton():this._activateButton()}},{key:"_setEventListeners",value:function(){var e=this;this._inputList.forEach((function(t){t.addEventListener("input",(function(){e._toggleInputErrorState(t),e._toggleButtonState()}))}))}},{key:"resetValidation",value:function(e){var t=this;this._inputList.forEach((function(e){return t._hideError(e)})),e?this._activateButton():this._deactivateButton()}},{key:"enableValidation",value:function(){this._toggleButtonState(),this._setEventListeners()}}])&&n(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),e}();function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var i=function(){function e(t,n){var r=t.items,o=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._items=r,this._renderer=o,this._container=document.querySelector(n)}var t,n;return t=e,(n=[{key:"addItem",value:function(e){this._container.prepend(e)}},{key:"renderElements",value:function(){var e=this;this._items.forEach((function(t){e._renderer(t)}))}}])&&o(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function a(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var c=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popupSelector=t,this._popup=document.querySelector(t),this._escCloseCallback=this._handleEscClose.bind(this)}var t,n;return t=e,(n=[{key:"open",value:function(){this._popup.classList.add("popup_opened"),document.addEventListener("keydown",this._escCloseCallback)}},{key:"close",value:function(){this._popup.classList.remove("popup_opened"),document.removeEventListener("keydown",this._escCloseCallback)}},{key:"_handleEscClose",value:function(e){"Escape"===e.key&&this.close()}},{key:"_handleOverlayClose",value:function(e){e.target.classList.contains("popup")&&this.close()}},{key:"setEventListeners",value:function(){var e=this._popup.querySelector(".popup__close-button");this._popup.addEventListener("click",this._handleOverlayClose.bind(this)),e.addEventListener("click",this.close.bind(this))}}])&&a(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function s(e){return s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},s(e)}function u(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function l(){return l="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=p(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},l.apply(this,arguments)}function p(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=d(e)););return e}function f(e,t){return f=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},f(e,t)}function h(e,t){if(t&&("object"===s(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function d(e){return d=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},d(e)}var _=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&f(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=d(r);if(o){var n=d(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return h(this,e)});function a(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=i.call(this,e))._imageTitle=t._popup.querySelector(".popup__image-title"),t._imageContent=t._popup.querySelector(".popup__image"),t}return t=a,(n=[{key:"open",value:function(e,t){l(d(a.prototype),"open",this).call(this),this._escCloseCallback=this._handleEscClose.bind(this),this._imageTitle.textContent=t,this._imageContent.setAttribute("src",e),this._imageContent.setAttribute("alt",t)}}])&&u(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(c);function y(e){return y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},y(e)}function v(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function b(){return b="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=m(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},b.apply(this,arguments)}function m(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=E(e)););return e}function k(e,t){return k=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},k(e,t)}function g(e,t){if(t&&("object"===y(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function E(e){return E=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},E(e)}var S=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&k(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=E(r);if(o){var n=E(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return g(this,e)});function a(e,t){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(n=i.call(this,e))._submitCallback=t,n._popupForm=n._popup.querySelector(".popup__form"),n._textInputsArray=Array.from(n._popupForm.querySelectorAll(".popup__input")),n}return t=a,(n=[{key:"_getInputValues",value:function(){var e={};return this._textInputsArray.forEach((function(t){var n=t.name,r=t.value;e[n]=r})),e}},{key:"setInitialData",value:function(e){this._initialData=e}},{key:"_setInputValues",value:function(e){this._textInputsArray.forEach((function(t){t.value=e[t.name]}))}},{key:"open",value:function(){b(E(a.prototype),"open",this).call(this),this._setInputValues(this._initialData)}},{key:"close",value:function(){b(E(a.prototype),"close",this).call(this),this._popupForm.reset()}},{key:"setEventListeners",value:function(){var e=this;b(E(a.prototype),"setEventListeners",this).call(this),this._popupForm.addEventListener("submit",(function(t){t.preventDefault(),e._submitCallback(e._getInputValues())}))}}])&&v(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(c);function w(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var C=function(){function e(t){var n=t.nameSelector,r=t.descriptionSelector,o=t.avatar;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._name=document.querySelector(n),this._description=document.querySelector(r),this._avatar=o,this._id=""}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return{name:this._name.textContent,description:this._description.textContent,avatar:this._avatar.url,id:this._id}}},{key:"setUserInfo",value:function(e,t,n,r){e&&t&&(this._name.textContent=e,this._description.textContent=t),n&&(this._avatar.src=n),r&&(this._id=r)}}])&&w(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function O(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var j,L=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._headers=t.headers,this._baseUrl=t.baseUrl}var t,n;return t=e,(n=[{key:"_checkResponse",value:function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}},{key:"getUserInfo",value:function(){return fetch("".concat(this._baseUrl,"/users/me"),{method:"GET",headers:this._headers}).then(this._checkResponse)}},{key:"updateUserInfo",value:function(e,t){return fetch("".concat(this._baseUrl,"/users/me"),{method:"PATCH",headers:this._headers,body:JSON.stringify({name:e,about:t})}).then(this._checkResponse)}},{key:"updateAvatar",value:function(e){return fetch("".concat(this._baseUrl,"/users/me/avatar"),{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:e})}).then(this._checkResponse)}},{key:"getInitialCards",value:function(){return fetch("".concat(this._baseUrl,"/cards"),{method:"GET",headers:this._headers}).then(this._checkResponse)}},{key:"addCard",value:function(e,t){return fetch("".concat(this._baseUrl,"/cards"),{method:"POST",headers:this._headers,body:JSON.stringify({name:e,link:t})}).then(this._checkResponse)}},{key:"deleteCard",value:function(e){return fetch("".concat(this._baseUrl,"/cards/").concat(e),{method:"DELETE",headers:this._headers}).then(this._checkResponse)}},{key:"like",value:function(e){return fetch("".concat(this._baseUrl,"/cards/").concat(e,"/likes"),{method:"PUT",headers:this._headers}).then(this._checkResponse)}},{key:"removeLike",value:function(e){return fetch("".concat(this._baseUrl,"/cards/").concat(e,"/likes"),{method:"DELETE",headers:this._headers}).then(this._checkResponse)}}])&&O(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function P(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function I(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var q,B,R=document.querySelector(".popup_type_edit"),T=R.querySelector(".popup__form"),U=document.querySelector(".profile__edit-button"),A=document.querySelector(".popup_type_add"),D=A.querySelector(".popup__form"),x=document.querySelector(".profile__add-button"),N=document.querySelector(".profile__avatar"),V=document.querySelector(".popup_type_avatar"),F=document.querySelector(".profile__avatar-hover"),M=V.querySelector(".popup__form"),J=[T,D,M],G=[T],H=document.querySelector(".popup__confirm-button"),z=(I(j={},T.id,U),I(j,D.id,x),I(j,M.id,F),j),$=new C({nameSelector:".profile__name",descriptionSelector:".profile__description",avatar:N}),K=new L({headers:{authorization:"e8e321ed-060f-4966-8b17-7867fd5284ad","Content-Type":"application/json"},baseUrl:"https://mesto.nomoreparties.co/v1/cohort-52"});function Q(e,n,r,o,i){var a=new t(e,n,r,o,i,"#card-template",Z.open.bind(Z),(function(e,t){this._handleOpenPopupImage(e,t)}),ee.open.bind(ee),H,$.getUserInfo().id,K,(function(){B=this}));return a.generateCard()}function W(e,t,n){t.textContent=e?"Сохранение...":n}var X=new S(".popup_type_edit",(function(e){var t=this,n=e.editName,r=e.editDescription;W(!0,R.querySelector(".popup__save-button"),"Сохранить"),K.updateUserInfo(n,r).then((function(){console.log("Данные успешно обновлены")})).catch((function(e){console.log(e)})).finally((function(){$.setUserInfo(n,r,"","");var e=$.getUserInfo(),o=e.name,i=e.description;t.setInitialData({editName:o,editDescription:i}),t.close(),W(!1,R.querySelector(".popup__save-button"),"Сохранить")}))})),Y=new S(".popup_type_add",(function(e){var t=this,n=e.addName,r=e.addDescription;W(!0,A.querySelector(".popup__save-button"),"Создать"),K.addCard(n,r).then((function(e){q.addItem(Q(n,r,[],e._id,!0)),console.log("Карточка успешно добавлена")})).catch((function(e){console.log(e)})).finally((function(){W(!1,A.querySelector(".popup__save-button"),"Создать"),t.setInitialData({addName:"",addDescription:""}),t.close()}))})),Z=new _(".popup_type_image"),ee=new S(".popup_type_confirm",(function(){B.delete(),this.close()})),te=new S(".popup_type_avatar",(function(e){var t=this,n=e.avatarLink;W(!0,V.querySelector(".popup__save-button"),"Сохранить"),K.updateAvatar(n).then((function(){console.log("Аватар обновлен")})).catch((function(e){console.log(e)})).finally((function(){W(!1,V.querySelector(".popup__save-button"),"Сохранить"),$.setUserInfo("","",n,""),t.close()}))}));X.setEventListeners(),Y.setEventListeners(),Y.setInitialData({addName:"",addDescription:""}),Z.setEventListeners(),U.addEventListener("click",(function(){return X.open()})),x.addEventListener("click",(function(){return Y.open()})),F.addEventListener("click",(function(){return te.open()})),ee.setEventListeners(),te.setEventListeners(),te.setInitialData({avatarLink:""}),Promise.all([K.getUserInfo(),K.getInitialCards()]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,i=[],a=!0,c=!1;try{for(n=n.call(e);!(a=(r=n.next()).done)&&(i.push(r.value),!t||i.length!==t);a=!0);}catch(e){c=!0,o=e}finally{try{a||null==n.return||n.return()}finally{if(c)throw o}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return P(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?P(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],a=r[1];X.setInitialData({editName:o.name,editDescription:o.about}),$.setUserInfo(o.name,o.about,o.avatar,o._id),(q=new i({items:a,renderer:function(e){var t;t=e.owner._id===o._id;var n=Q(e.name,e.link,e.likes,e._id,t);q.addItem(n)}},".cards__list")).renderElements()})).catch((function(e){console.log(e)})),J.forEach((function(e){var t=new r({submitButtonSelector:".popup__save-button",inputErrorClass:"popup__input_invalid",inputSelector:".popup__input"},e),n=G.includes(e);t.enableValidation(),z[e.id].addEventListener("click",(function(){return t.resetValidation(n)}))}))})();