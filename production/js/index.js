(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var message = _interopRequireWildcard(require("./modules/chatting"));

var grocery = _interopRequireWildcard(require("./modules/groceries"));

var drinks = _interopRequireWildcard(require("./modules/drinks"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var socket = io();
var chatForm = document.querySelector('[send-message]'),
    chatName = chatForm.querySelector('input[type="text"]:first-of-type'),
    chatString = chatForm.querySelector('div input[type="text"]'),
    chatSubmit = chatForm.querySelector('div input[type="submit"]'); // Chatting

chatSubmit.addEventListener('click', function (event) {
  event.preventDefault();
  socket.emit('chat', {
    name: chatName.value,
    message: chatString.value
  });
  chatString.value = '';
});
drinks.drinks(); // Basic chatting

socket.on('chat', function (data) {
  message.chat(data);
});
socket.on('addGrocery', function (data) {
  grocery.add(data);
}); // Joining the chat

socket.on('join', function (data) {
  message.server(data);
}); // Leaving the chat

socket.on('leave', function (data) {
  message.server(data);
});

},{"./modules/chatting":2,"./modules/drinks":3,"./modules/groceries":4}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chat = chat;
exports.server = server;
var chatContainer = document.querySelector('[chat]');

function chat(user) {
  var messageElement = document.createElement('div');
  messageElement.textContent = "".concat(user.name, ": ").concat(user.message);
  messageElement.className = 'user';
  addMessage(messageElement);
}

function server(data) {
  var messageElement = document.createElement('div');
  messageElement.textContent = data.message;
  messageElement.className = 'server';
  addMessage(messageElement);
}

function addMessage(messageElement) {
  chatContainer.append(messageElement);
  scrollToBottom();
}

function scrollToBottom() {
  chatContainer.scrollTop = chatContainer.scrollHeight - chatContainer.clientHeight;
}

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drinks = drinks;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function drinks() {
  var drinksContainer = document.querySelector('[drinks]');

  var drinks = _toConsumableArray(drinksContainer.children);

  drinks.forEach(function (drink) {
    drink.addEventListener('click', function () {
      var data = {
        id: drink.id,
        drink: drink.querySelector('p').textContent
      };
      sendData(data);
    });
  });
}

function sendData(data) {
  var jsonString = JSON.stringify(data);
  var xhr = new XMLHttpRequest();
  xhr.open('post', '/');
  xhr.setRequestHeader('Content-Type', 'application/json');
  console.log(jsonString);
  xhr.send(jsonString);
}

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.add = add;

// Todo: Wanneer een boodschap meer dan 1x voorkomt een counter toevoegen
// Todo: Wanneer een boodschap meer dan 1x voorkomt een - toevoegen om te minderen in hoeveelheid
function add(data) {
  var grocerylist = document.querySelector('[grocery-container] ul');
  grocerylist.append(grocery(data));
}

function grocery(data) {
  var message = data.message.split(':add')[1].substring(1);
  var grocery = document.createElement('li');
  var removeButton = document.createElement('span');
  grocery.textContent = message;
  removeButton.textContent = 'X';
  grocery.append(removeButton);
  removeButton.addEventListener('click', function (e) {
    return remove(e.target);
  });
  return grocery;
}

function remove(element) {
  var grocery = element.parentElement;
  grocery.remove();
}

},{}]},{},[1])

//# sourceMappingURL=index.js.map
