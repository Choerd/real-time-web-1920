(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var message = _interopRequireWildcard(require("./modules/chatting"));

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
  socket.emit('command', {
    name: chatName.value,
    message: chatString.value
  });
  socket.emit('emote', {
    name: chatName.value,
    message: chatString.value
  });
  chatString.value = '';
});
socket.on('chat', function (user) {
  message.chat(user);
});
socket.on('command', function (command) {
  message.command(command);
});
socket.on('emote', function (emote) {
  message.emote(emote);
}); // Joining the chat

socket.on('join', function (data) {
  message.server(data);
}); // Leaving the chat

socket.on('leave', function (data) {
  message.server(data);
});

},{"./modules/chatting":2}],2:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chat = chat;
exports.server = server;
exports.command = command;
exports.emote = emote;

var commands = _interopRequireWildcard(require("./commands"));

var emotes = _interopRequireWildcard(require("./emotes"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var chatContainer = document.querySelector('[chat]'),
    chatForm = document.querySelector('[send-message]'),
    chatName = chatForm.querySelector('input[type="text"]:first-of-type');

function chat(user) {
  var messageElement = document.createElement('div');
  messageElement.textContent = "".concat(user.name, ": ").concat(user.message);
  messageElement.className = 'user';

  if (user.name == "".concat(chatName.value, " ").concat(user.name.split(' ')[1])) {
    messageElement.className = messageElement.className + ' you';
  }

  addMessage(messageElement);
}

function server(data) {
  var messageElement = document.createElement('div');
  messageElement.textContent = data.message;
  messageElement.className = 'server';
  addMessage(messageElement);
}

function command(command) {
  if (commands.check(command.message)) {
    addMessage(commands.run(command.message));
  } else {
    fallbackInput('command');
  }
}

function emote(emote) {
  if (emotes.check(emote.message)) {
    addMessage(emotes.run(emote));
  } else {
    fallbackInput('emote');
  }
} // Functions I re-use


function fallbackInput(input) {
  var messageElement = document.createElement('div');
  messageElement.textContent = "This ".concat(input, " is not available!");
  messageElement.className = input;
  addMessage(messageElement);
}

function addMessage(messageElement) {
  if (messageElement.length === undefined) {
    chatContainer.append(messageElement);
  } else {
    messageElement.forEach(function (element) {
      return chatContainer.append(element);
    });
  }

  scrollToBottom();
}

function scrollToBottom() {
  chatContainer.scrollTop = chatContainer.scrollHeight - chatContainer.clientHeight;
}

},{"./commands":3,"./emotes":4}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.check = check;
exports.run = run;
var commands = ['/commands', '/red', '/yellow', '/green', '/blue'];

function check(command) {
  return commands.find(function (message) {
    return message === command;
  });
}

function run(command) {
  if (command === '/commands') {
    return allCommands();
  }

  if (command === '/red') {
    return color('#E01E5A', 'Red');
  }

  if (command === '/yellow') {
    return color('#EBB22E', 'Yellow');
  }

  if (command === '/green') {
    return color('#2FB67D', 'Green');
  }

  if (command === '/blue') {
    return color('#37C5F0', 'Blue');
  }
}

function allCommands() {
  return commands.map(function (command) {
    return createMessage(command);
  });
}

function color(color, name) {
  document.querySelector('[chatpage]').setAttribute('style', "background-color: ".concat(color));
  return createMessage("Changed color to: ".concat(name));
}

function createMessage(message) {
  var messageElement = document.createElement('div');
  messageElement.textContent = message;
  messageElement.className = 'command';
  return messageElement;
}

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.check = check;
exports.run = run;
var emotes = [':emotes', ':happy', ':angry', ':sad', ':cry', ':laugh', ':kiss'];
var chatForm = document.querySelector('[send-message]'),
    chatName = chatForm.querySelector('input[type="text"]:first-of-type');

function check(emote) {
  return emotes.some(function (string) {
    return emote.includes(string);
  });
}

function run(emote) {
  if (emote.message === ':emotes') {
    return allEmotes();
  }

  var string;
  emotes.forEach(function (emoticon) {
    if (emote.message.includes(emoticon)) {
      var name = emoticon.substring(1);
      var regex = new RegExp(emoticon, 'g');
      string = emote.message.replace(regex, createImg("/images/".concat(name)));
    }
  });
  var message = "".concat(emote.name, ": ").concat(string);
  return createMessage(emote, message, 'user');
}

function allEmotes() {
  return emotes.map(function (emote) {
    return createMessage(emote, 'command');
  });
} // Helper functions


function createImg(emote) {
  return "<img src=\"".concat(emote, ".png\">");
}

function createMessage(user, message, actor) {
  var messageElement = document.createElement('div');
  messageElement.innerHTML = message;
  messageElement.className = actor;

  if (user.name == "".concat(chatName.value, " ").concat(user.name.split(' ')[1])) {
    messageElement.className = messageElement.className + ' you';
  }

  return messageElement;
}

},{}]},{},[1])

//# sourceMappingURL=index.js.map
