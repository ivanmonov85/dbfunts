# dbfunts
Simple DB Storage Sample Application

Goal:
Create simple application that can Add, Update and Remove records from DB storage.

Requirements:
User needs to be authenticated before he can access and operate with the application.
- using helmet
Auth0 is a flexible, drop-in solution to add authentication and authorization services to your applications.

User needs to have options from UI to list, create, remove, and update records.

As UI keep it as simple as it could be, no special UX desired, just functional aspect.

 

As backend framework, please use NodeJS.

As frontend framework, please use AngularJS.

As storage, please use PostgreSQL.

Communication must be REST API.
- Express is used to serve web pages and implement an API. Fast, unopinionated, minimalist web framework for Node.js

 

As language, please use Typescript if possible.

As programming paradigm desired is OOP, following MVC and SOLID principles.

 

Data object that can be used as mock, can be taken from here https://jsonplaceholder.typicode.com/
- using users model
  

Optional: create the app as microservices, by using docker. Backend can be one container, frontend another one.
- start server in container
- start fe in container


create an HttpException class that helps you encapsulate errors related to HTTP requests and a middleware function 
using error middleware wraps the weero and hides the real message not to reveal sensitive information outside

Start with: 
npm run dev



BaseItem = User
Item = UserItem