(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var run = _interopRequireWildcard(require("./modules/socket-io/socket"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var socket = io();
run.sockets(socket); // drinks.drinks()
// socket.on('pickDrink', (data) => {
//     data.ingredients.forEach(ingredient => {
//         grocery.add(ingredient)
//     })
//     message.server(`All the ingredients of: ${data.name} were added to the grocerylist`)
// })

},{"./modules/socket-io/socket":6}],2:[function(require,module,exports){
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
  messageElement.textContent = data;
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
exports.add = add;
exports.remove = remove;
exports.renderAll = renderAll;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var grocerylist = document.querySelector('[grocery-container] ul'); // Add a single grocery Done
// Remove a single grocery
// Remove all groceries

function add(data) {
  var grocery = document.createElement('li');
  var removeButton = document.createElement('span');
  grocery.textContent = data;
  removeButton.textContent = 'X';
  grocery.append(removeButton); // removeButton.addEventListener('click', (event) => remove(event.target))

  grocerylist.append(grocery);
  return removeButton;
}

function remove(element) {
  console.log('poep');
  var li = element.parentElement;
  var text = element.parentElement.textContent;
  var grocery = text.substring(0, text.length - 1);
  li.remove();
}

function renderAll(groceries) {
  if (groceries.length > 0) {
    groceries.forEach(function (grocery) {
      add(grocery);
    });
  }
}

function removeAll() {
  var groceries = _toConsumableArray(grocerylist.children);

  groceries.forEach(function (grocery) {
    grocery.remove();
  });
} // Remove all groceries


document.querySelector('[grocery-container] button').addEventListener('click', removeAll);

},{}],4:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var message = _interopRequireWildcard(require("../chat/messages"));

var grocery = _interopRequireWildcard(require("../groceries/groceries"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _default = function _default(io) {
  // Joining the chat
  io.on('join', function (data) {
    message.server(data.chat.message);
    grocery.renderAll(data.grocerylist.groceries);
  });
  io.on('joined', function (data) {
    message.server(data.message);
  }); // Leaving the chat

  io.on('leave', function (data) {
    message.server(data.message);
  });
};

exports["default"] = _default;

},{"../chat/messages":2,"../groceries/groceries":3}],5:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var message = _interopRequireWildcard(require("../chat/messages"));

var grocery = _interopRequireWildcard(require("../groceries/groceries"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _default = function _default(io) {
  var chatForm = document.querySelector('[send-message]'),
      chatName = chatForm.querySelector('input[type="text"]:first-of-type'),
      chatString = chatForm.querySelector('div input[type="text"]'),
      chatSubmit = chatForm.querySelector('div input[type="submit"]'); // Chatting

  chatSubmit.addEventListener('click', function (event) {
    event.preventDefault();

    if (chatString.value.includes(':add')) {
      io.emit('grocery', {
        grocery: chatString.value.split(':add')[1].substring(1)
      });
    } else {
      io.emit('chat', {
        name: chatName.value,
        message: chatString.value
      });
    }

    chatString.value = '';
  }); // Basic chatting

  io.on('chat', function (data) {
    message.chat(data);
  });
  io.on('grocery', function (data) {
    var removeButton = grocery.add(data);
    removeButton.addEventListener('click', function (event) {
      return grocery.remove(event.target);
    });
  });
};

exports["default"] = _default;

},{"../chat/messages":2,"../groceries/groceries":3}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sockets = sockets;

var _base = _interopRequireDefault(require("./_base"));

var _chat = _interopRequireDefault(require("./_chat"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function sockets(io) {
  (0, _base["default"])(io);
  (0, _chat["default"])(io);
}

},{"./_base":4,"./_chat":5}]},{},[1])

//# sourceMappingURL=index.js.map
