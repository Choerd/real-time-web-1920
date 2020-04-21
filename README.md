# Real-Time Web @cmda-minor-web · 2019-2020

## Table of Contents
* [Concept](#Concept)
* [About the app](#About-the-app)
    * [Features](Features)
    * [Events](Events)
* [What could be better?](#What-could-be-better?)
* [Credits](#Credits)

![First attempt Data Life Cycle Diagram](https://user-images.githubusercontent.com/45365598/79846368-a72d2500-83be-11ea-9e6d-0f2275b56522.png)

<hr>

## Concept
...

<hr>

## About the Chat app
...

### Events
* ...

<hr>

## What could be better?
* ...

<hr>

## Credits
...

<!-- 
* [Concept](#Concept)
* [About the Chat app](#About-the-chat-app)
    * [Features](Features)
    * [Events](Events)
* [What could be better?](#What-could-be-better?)
* [Credits](#Credits)

<hr>

## Concept
For the main project it is very handy to know the basics of `socket.io` so I made a chat app to explore the different features. With my app the users can **change the look of the chat** and **send messages with emotes.**

<hr>

## About the Chat app
As described above my chat app has two smaller features. Changing the look of the chat and send messages that can include emotes.

### Features
`Changing the look of the chat`  
To change the look of the chat I've implemented some commands which you can acces by using a `/` and then the command name. To check all the commands the user can type `/commands` to view all the working commands. If the user uses a command which is not known, the user get's a message.

`Send messages that includes emotes`  
To send a message that includes a emote I've also implemented a command which the user can acces by using `:` and then the emote name. The same as the commands the user can type `:emotes` to check all the available emotes. 

### Events
* **Join**  
When you enter the chat everyone get's a notification including yourself.
* **Disconnect**  
When you leave the chatroom also everyone get's a notification.
* **Chat**  
When the user sends a message the server checks which kind of message it is.
    * **Regular message**  
        * When it's just a regular message, if it doesn't contain a `:` or `/` the message get's send to all the users.
    * **Command**  
        * When the message contains a `/` it has to be a message from the `server actor` and only be send to the one who typed the command, which is not right now. This should be fixed!
    * **Regular message with a emote**  
        * When the message contains a `:` it has to act like a normal message but the emote command has to be replaced with a image.

<hr>

## What could be better?
* At first I didn't really understand how broadcasting a emit worked. This is the reason why every user sees all the commands when someone us using `/commands`. Now I know how it works and could be prevented in the future.
* ...

<hr>

## Credits
* Fixing a issue where I could not use template literals inside a Regex. (**Guido**)
    * Guido explained me how to approach this and after a few minuts it worked fine! -->