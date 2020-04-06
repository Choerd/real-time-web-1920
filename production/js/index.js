(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var socket = io();
var messageContainer = document.querySelector('[chat]');

if (messageContainer) {
  var messageForm = document.querySelector('[send-message]');
  var messageInput = messageForm.querySelector('input[type="text"]');
  var messageSubmit = document.querySelector('[send-message] input[type="submit"]'); // const name = prompt('What is your name?')
  // appendMessage('You joined', 'you')
  // socket.emit('new-user', name)

  messageSubmit.addEventListener('click', function (event) {
    event.preventDefault();
    var message = messageInput.value;
    appendMessage("".concat(message), 'you');
    socket.emit('send-chat-message', message);
    messageInput.value = '';
  });
}

socket.on('chat-message', function (data) {
  appendMessage("".concat(data.name, ": ").concat(data.message));
});
socket.on('user-connected', function (name) {
  appendMessage("".concat(name, " joined"), 'joined');
});
socket.on('user-disconnected', function (name) {
  appendMessage("".concat(name, " left"), 'left');
});

function appendMessage(message, user) {
  var messageElement = document.createElement('div');

  if (user === 'you') {
    messageElement.classList = 'you';
  }

  messageElement.innerText = message;
  messageContainer.append(messageElement);
  scrollToBottom();
}

var register = document.querySelector('[registerpage] form a');

if (register) {
  document.querySelector('[registerpage] form a').addEventListener('click', function () {
    var name = document.querySelector('[registerpage] form input[type="text"]').value;
    console.log(name);
    socket.emit('new-user', name);
  });
}

function scrollToBottom() {
  messageContainer.scrollTop = messageContainer.scrollHeight - messageContainer.clientHeight;
}

},{}]},{},[1])

//# sourceMappingURL=index.js.map
