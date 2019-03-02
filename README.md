# RESTAPI
## Requirements
Postman (Tested version: 6.7.3)

## How to
Import the Collection (API.postman_collection.json) and Environment (Mysite.postman_environment.js) file for postman. 
The API is hosted at: https://fiskekubben.herokuapp.com/



Name: Joel Carlsson (jc222mw)
Course: The web as an application platform (1DV527)

## Introduction
This is a solution for an API that is meant to be used for a fishing club. The fishing club needs a system to save what fishes they catch and who did the catch. The API will make it possible for this fishing club to create an application that runs against this API that can hold users and their fishes. It will also be possible to get instant updates through webhooks,

## The HATEOAS solution
It was really hard to find a “correct way” of implementing HATEOAS. Internet is very divided in how to do it and even if it should be used at all. 
My HATEOAS implementation is simply an own interpretation of an ocean of opinions with a little bit of my own touches. This HATEOAS version is easy to use an build upon because the links are in a single object with a hierarchy that allows an easy and logic walk through the object. It makes it easy to send the correct links to the correct request. This object also saves the application repetitive link writing. The hosting URL is easy to configure and will follow every link. I don’t have any experience of implementing HATEOAS but this object is easy to build upon and edit. 

## How to implement multiple presentations of the resources
The API is today only represented in JSON. If for example adding the possibility to get XML as response i would probably add the route to choose between XML and JSON. Example “url/json/user” or “url/xml/user”. The object containing HATEOAS links is easy to rewrite for XML. Though it seems like there are very popular npm packages for translating JSON to XML. One could easily use a tool like the npm package “jsontoxml” thanks to the “Payload” object inside this application. The “Payload” object takes care of the data that will be sent back in the response. One could easily create a simple function that returns this payload object in XML. No duplication of routes would be needed.

## Authentication solution
### Other authentication solutions.
HTTP basic authentication where the username and password is concatenated, base64-encoded and sent in the header.  

HTTP digest authentication that works similar to HTTP basic authentication, but instead of using the reversible base64 encoding, it hashes the data.



API keys aren’t really used to authenticate users. They are used to identify the calling project. They aren’t really considered secure and they have no expiration date and can therefore be used by a third actor if stolen. They are great to use if one wants to track where the API traffic comes from or control how many requests one can do.
They can not be used to show a specific user or make sure of a secure authorization.

### The used authentication solution.
Token based authentication doesn’t hold sensitive data as passwords etc. One can get a token from the server and use this token to get access to information on the server. This is often used by sending the user data once and then get the token back from the server and then use the token instead to retrieve data. 

I use JWT token as authentication.

A good thing about using the token based authentication “JWT token” is that once the user is verified in the database no more database queries are needed. This saves a lot of time and data transfers. 

A bad thing is that if the secret key isn’t stored in a secure way it can easily get leaked. In that case all tokens are in danger. The good thing is that as soon as the system decides to change the secret key, all old tokens becomes useless. In this type of scenario the users that have a token will lose access and are required to log in again and in that way get a new token. So if a leak is found in good time, it can be a small loss. Though one has to have in mind what type of data is stored in the token so no sensitive data is leaked. 

It is easy to control the tokens lifecycle. When sending the token one can decide for how long it will be active. Though it is hard to revoke a token (but not impossible) once sent and there isn’t any way to track what users are active at the moment. 

## How the webhook works.
I’ve implemented a very easy but logic webhook. The webhook is in this phase only for a single event but it is easy implemented in more other events in the future. Every time a fish gets saved to the database, a function is called that sends a post request to each of the saved URL addresses in the database containing the recently saved object. If something goes wrong when saving a new fish there will be no request sent and the function will go to catch the error and send the error and the status code back to the one trying to save. 
One can easily extend the webhook simply by adding an object to the webhook object where multiple booleans are stored, telling what type of data the webhook want to receive.  

## What would i do different if rewriting this API?
Getting links for example every user so that when writing out every user, the ones that you can go further on, will have specific links for that. 

Using postman collections from the beginning. Until i started creating tests i only used one tab in postman and tested while coding from that window. If is started over i would do a collection with and then code after that in a more test driven design pattern. That would have saved me time with the tests and also i would always be reminded of what to do next by just go to the next failed test and start to implement.

## Extras except the fundamental requirements.
It is possible to create new users with passwords that are stored as hashed strings. The users are possible list by a get. 

The webhook functionality is full CRUD. The user that holds the correct token can edit and remove the webhooks with a user id that correlates with the token. This user can also list all webhooks that the user has registered. 

Fishes are also listable by user id.

For extra security this API is hosted with HTTPS.


