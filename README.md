# dbfunts
Simple DB Storage Sample Application

Goal:
Create simple application that can Add, Update and Remove records from DB storage.

Requirements:
User needs to be authenticated before he can access and operate with the application.
User needs to have options from UI to list, create, remove, and update records.
As UI keep it as simple as it could be, no special UX desired, just functional aspect.
As backend framework, please use NodeJS.
As frontend framework, please use AngularJS.
As storage, please use PostgreSQL.
Communication must be REST API.
As language, please use Typescript if possible.
As programming paradigm desired is OOP, following MVC and SOLID principles.
Data object that can be used as mock, can be taken from here https://jsonplaceholder.typicode.com/
Optional: create the app as microservices, by using docker. Backend can be one container, frontend another one.
- start server in container
- start fe in container

Implementation:
- Authentication Middleware:
Auth0 is a flexible, drop-in solution to add authentication and authorization services to your applications.
    curl --request POST \
    --url https://dev-dbfunts.eu.auth0.com/oauth/token \
    --header 'content-type: application/json' \
    --data '{"client_id":"SpaW2JroMTSsz926PD0Be1lBA8f7nbT9","client_secret":"wUjU3T-EZ0hb7JoOuHijZ78XcDTrvVXK1zrFwasp4zygVfcSqbTRA37MlHji_j-e","audience":"https://dbfun-api.example.com","grant_type":"client_credentials"}'

- Express is used to serve web pages and implement an API. Fast, unopinionated, minimalist web framework for Node.js
https://expressjs.com/

- Error Middleware
HttpException class is created that helps to encapsulate errors related to HTTP requests and a middleware function using error middleware wraps the error and hides the real message not to reveal sensitive information outside.

- Data object
Mock object selected: 'users'

