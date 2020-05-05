(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var run = _interopRequireWildcard(require("./modules/socket-io/socket"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var socket = io();
run.sockets(socket);

},{"./modules/socket-io/socket":7}],2:[function(require,module,exports){
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
exports.renderAll = renderAll;
var grocerylist = document.querySelector('[grocery-container] ul');

function add(data) {
  var grocery = document.createElement('li');
  var removeButton = document.createElement('span');
  grocery.textContent = data;
  grocery.style.overflow = 'hidden';
  removeButton.textContent = 'X';
  grocery.append(removeButton);
  grocerylist.append(grocery);
  return removeButton;
}

function renderAll(groceries) {
  if (groceries.length > 0) {
    groceries.forEach(function (grocery) {
      add(grocery);
    });
  }
}

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
    var listItems = document.querySelectorAll('[grocery-container] ul li span');
    listItems.forEach(function (li) {
      li.addEventListener('click', function (event) {
        var string = event.target.parentElement.textContent;
        var groceryName = string.substring(0, string.length - 1);
        io.emit('remove', {
          name: groceryName
        });
      });
    });
  });
  io.on('joined', function (data) {
    return message.server(data.message);
  });
  io.on('nicknameChanged', function (data) {
    return message.server(data);
  }); // Leaving the chat

  io.on('leave', function (data) {
    return message.server(data.message);
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

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var _default = function _default(io) {
  var chatForm = document.querySelector('[send-message]'),
      chatName = chatForm.querySelector('input[type="text"]:first-of-type'),
      chatString = chatForm.querySelector('div input[type="text"]'),
      chatSubmit = chatForm.querySelector('div input[type="submit"]'),
      groceriesDone = document.querySelector('[grocery-container] button'),
      selectIngredient = document.querySelector('[drinks] select');
  selectIngredient.addEventListener('change', function (event) {
    io.emit('selectIngredient', {
      ingredient: event.target.value
    });
  });
  io.on('select', function (data) {
    var drinkElements = _toConsumableArray(document.querySelector('[drinks]').children);

    drinkElements.shift();
    drinkElements.forEach(function (element) {
      element.remove();
    });
    data.forEach(function (drink) {
      document.querySelector('[drinks]').appendChild(createDrinkElement(drink, io));
    });

    var newDrinks = _toConsumableArray(document.querySelector('[drinks]').children);

    newDrinks.shift();
    newDrinks.forEach(function (drink) {
      drink.addEventListener('click', function () {
        var data = {
          id: drink.id,
          drink: drink.querySelector('p').textContent
        };
        io.emit('drink', {
          data: data
        });
      });
    });
  });
  groceriesDone.addEventListener('click', function () {
    io.emit('selectPeople');
  });
  io.on('done', function (data) {
    var groceries = _toConsumableArray(document.querySelectorAll('[grocery-container] ul li'));

    data.forEach(function (person) {
      person.groceries.forEach(function (ingredient) {
        groceries.forEach(function (grocery) {
          var name = grocery.textContent.substring(0, grocery.textContent.length - 1);

          if (name == ingredient) {
            grocery.setAttribute('user-id', "".concat(person.nickname, "(").concat(person.id, "):"));
          }
        });
      });
    });
    groceriesDone.remove();
  });
  chatName.addEventListener('change', function (event) {
    io.emit('changeName', {
      nickname: event.target.value
    });
  }); // Chatting

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
    removeElement(removeButton, io);
  });
  io.on('drink', function (ingredients) {
    ingredients.forEach(function (ingredient) {
      removeElement(grocery.add(ingredient), io);
    });
  });
  io.on('remove', function (data) {
    var _iterator = _createForOfIteratorHelper(document.querySelectorAll("li")),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var li = _step.value;

        if (li.textContent.includes(data.name)) {
          li.remove();
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  });
};

exports["default"] = _default;

function createDrinkElement(data, io) {
  var article = document.createElement('article');
  var image = document.createElement('img');
  var paragraph = document.createElement('p');
  article.id = data.idDrink;
  image.setAttribute('src', data.strDrinkThumb);
  paragraph.textContent = data.strDrink;
  article.appendChild(image);
  article.appendChild(paragraph);
  return article;
}

function removeElement(button, io) {
  button.addEventListener('click', function (event) {
    var string = event.target.parentElement.textContent;
    var groceryName = string.substring(0, string.length - 1);
    io.emit('remove', {
      name: groceryName
    });
  });
}

},{"../chat/messages":2,"../groceries/groceries":3}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var _default = function _default(io) {
  var drinksContainer = document.querySelector('[drinks]');

  var drinks = _toConsumableArray(drinksContainer.children);

  drinks.shift();
  drinks.forEach(function (drink) {
    drink.addEventListener('click', function () {
      var data = {
        id: drink.id,
        drink: drink.querySelector('p').textContent
      };
      io.emit('drink', {
        data: data
      });
    });
  });
};

exports["default"] = _default;

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sockets = sockets;

var _base = _interopRequireDefault(require("./_base"));

var _chat = _interopRequireDefault(require("./_chat"));

var _drinks = _interopRequireDefault(require("./_drinks"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function sockets(io) {
  (0, _base["default"])(io);
  (0, _chat["default"])(io);
  (0, _drinks["default"])(io);
}

},{"./_base":4,"./_chat":5,"./_drinks":6}]},{},[1])

//# sourceMappingURL=index.js.map
