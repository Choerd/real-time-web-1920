# Real-Time Web @cmda-minor-web · 2019-2020

## Table of Contents
* [Concept](#Concept)
* [About the 'Who-gets-what'-app](#About-the-Who-gets-what-app)
    * [Features](#Features)
    * [Real-time Events](#Real-time-Events)
* [Data Life Cycle Diagram](#Data-Life-Cycle-Diagram)
* [External Datasource/API](#External-Datasource/API)
* [Reflection](#Reflection)
    * [Nice-to-haves](#Nice-to-haves)
    * [What could be better?](#What-could-be-better?)
* [Credits](#Credits)

<hr>

## Concept
**Problem**  
Every weekend when me and my friend are planning to have a drink together we always have that problem that someone needs to get the groceries for that evening. Most of the time it are always the same people, but my new app is going to solve that problem!

**'Who gets what'-app**  
With my new app you can go into a chatroom with your friends and put a grocerylist together. You can do this on two seperate ways. Adding groceries to the list by simply adding them or you can select a cocktail on the right hand side and all the ingredients will be added to the grocerylist. This way you can test out some of the cocktails from the api I used and get a overview of all the groceries you and your friends need for the weekend. At the end, when the grocerylist is finished, two people will be randomly picked to go to supermarket and get the groceries needed. There also will be a option to trade your turn to get the groceries if your friends think you have a good excuse.

`Add screenshot here`

<hr>

## About the 'Who gets what'-app

### Features
* Manage a grocerylist that is synchronized with all the other sockets
* Be able to add groceries by using the chat
* Be able to add groceries by selecting a cocktail(s)
* Divide the groceries to two random people in the chat
* Trade the turn to get to the grocerystore

### Real-time Events

* **Join**  
When you enter the chat everyone gets a notification including yourself.
* **Disconnect**  
When you leave the chatroom also everyone gets a notification.
* **Chat**  
Everyone is able to chat with each other to discuss about what groceries to get for that night.
* **Groceries**
    * **Add**  
    By using `:add` in the chat everyone can add groceries to the list. 
    * **Remove**  
    When someone clicks on the 'X' after the grocery you can remove a grocery from the list.
* **Drinks**
    * **Pick**  
    By clicking on a drink in the cocktail list the groceries of that cocktail will be added to the grocerylist.
    * **Filter**  
    You can use the ingredient filter to look for cocktails with a specific ingredient.

<hr>

## Data Life Cycle Diagram
`Add screenshot here`

<hr>

## External Datasource/API
For this project I used `The Cocktail DB API` to get all the data from a lot of different cocktails. This way the users would be able to add groceries from these cocktails to their grocerylist.

It's a very basic api but it contains a lot of data including images of every cocktail which have a nice quality in my opinion. You can get data in 4 different ways:
* Get a list
* Search (searching by name)
* Filter
* Lookup (searching by id)

With all these possibilities it fits perfectly into my app and get the right data when I want.

So far as I know there are no limits to this application. You do need a api key for this api but for my app I've logged in with my Github account which generated a api key for me.

For the documentation you can check out the following link:  
[The Cocktail DB API Documentation](https://rapidapi.com/theapiguy/api/the-cocktail-db)

<hr>

## Reflection

### Nice-to-haves
* **Add the trading system**  
If I had more time I would like to add the trading system to my app. 
* **Adding a Mongo Database**  
I really want to work with a Mongo Database because it sounds amazing and I've never worked with it before. My plan is to work with it during the Meesterproef

### What could be better?
* ...

<hr>

## Credits
* Helping me to complete my concept (**Robin**)
    * In Slack Robin and I were discussing about my concept and he came up with some very cool ideas to boost my concept.