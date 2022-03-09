# dbfunts
Simple DB CRUD API + Client

[![Build Status](https://travis-ci.org/ivanmonov85/dbfunts.svg?branch=master)](https://travis-ci.org/ivanmonov85/dbfunts) [![HitCount](https://hits.dwyl.com/ivanmonov85/dbfunts.svg?style=flat&show=unique)](http://hits.dwyl.com/ivanmonov85/dbfunts)

## Goal
_Create simple application that can Add, Update and Remove records from DB storage._

Requirements:
- User needs to be authenticated before he can access and operate with the application.
- User needs to have options from UI to list, create, remove, and update records.
- As UI keep it as simple as it could be, no special UX desired, just functional aspect.
- As backend framework, please use NodeJS.
- As frontend framework, please use AngularJS.
- As storage, please use PostgreSQL.
- Communication must be REST API.
- As language, please use Typescript if possible.
- As programming paradigm desired is OOP, following MVC and SOLID principles.
- Data object that can be used as mock, can be taken from here https://jsonplaceholder.typicode.com/

- Optional: create the app as microservices, by using docker. Backend can be one container, frontend another one.
-- start server in container
-- start fe in container

## Directory Layout
```
README.md              --> Project documentation (this file)

client/                --> AngularJS web application (frontend client)
  app/                 --> application source code
    env.js             --> config file with environment variables. Development team must change it before deploying to different environment.
Dockerfile             --> Docker image creation commands
package.json           --> Node.js specific metadata, including development tools dependencies

database/              --> Database related scripts
src/                   --> Node.js API source code (backend)
.env                   --> config file with environment variables for running the backend API
Dockerfile             --> Docker image creation commands
package.json           --> Node.js specific metadata, including development tools dependencies
package-lock.json      --> Npm specific metadata, including versions of installed development tools dependencies
tsconfig.json          --> TypeScript configuration

docker-compose.yml     --> Containers configuration
Makefile               --> scripts for building images. [make up / make down]

postman/               --> Postman environment and collection for testing
```

## Step 1. API Implementation
- [`Node.js`](https://nodejs.org) v16.14.0 LTS

- [Express](https://expressjs.com/) framework is used to serve web pages and implement an *RESTful* API.

- Authentication Middleware:
Using [**Auth0**](https://auth0.com/) as a flexible, drop-in solution for authentication and authorization services.

Get Auth Token Command:
```
    curl --request POST \
    --url https://dev-dbfunts.eu.auth0.com/oauth/token \
    --header 'content-type: application/json' \
    --data '{"client_id":"SpaW2JroMTSsz926PD0Be1lBA8f7nbT9","client_secret":"wUjU3T-EZ0hb7JoOuHijZ78XcDTrvVXK1zrFwasp4zygVfcSqbTRA37MlHji_j-e","audience":"https://dbfun-api.example.com","grant_type":"client_credentials"}'
```

- Error Middleware and Logging:
'HttpException' class is created that helps to encapsulate errors related to HTTP requests. 
Middleware function using error middleware wraps the error and hides the real message not to expose sensitive information outside. 
The real message is logged in the console for troubleshooting.

- Data object model
1. *User*
```
{
  id:        [bigint]  Unique identifier
  name:      [string]  Name
  username:  [string]  Username (required)
  email:     [string]  Email (required)
  phone:     [string]  Phone
  website:   [string]  Website
}
```
### Database and Infrastructure
- [`PostgreSQL`](https://www.postgresql.org/) '[postgres](https://hub.docker.com/_/postgres)' v13.6 image from DockerHub.
- [Adminer](https://hub.docker.com/_/adminer) UI v4.7.8 image used for DB management.
- [Sequelize](https://sequelize.org/) v6 is used as ORM for Postgres.

**Note:** Database migration scripts are not automated in this release and must be run manually.

### Testing
- [Postman](https://www.postman.com/) v9.14 was used for testing and used collection and environment are exported in v2.1 format to the 'postman' folder.

The Authorization is **automated** in the 'Get Auth Token' action which copies the received token in the {{authorization}} environment variable and is used in the other actions.


## Step 2. Client Implementation
- [`AngularJS`](https://angularjs.org/) v1.8.2, using NPM web server [http-server](https://www.npmjs.com/package/http-server) v14.1.0 .
Also used modules are: [_ngRoute_](https://www.npmjs.com/package/angular-route), [_ngStorage_](https://www.npmjs.com/package/ngstorage), [_ngDialog_](https://github.com/likeastore/ngDialog), [_ngTable_](https://github.com/esvit/ng-table)

Note: ngDialog is used as pre-lodaded script in index.html from external repository (cloudflare)
https://mohistory.org/node_modules/ng-dialog/example/

- Error Handling:
Server error responses are handled globally, instead of per request, with registered 'responseError' interceptor to the $httpProvider.

- Data passing options between controllers declared in the same module
https://stackoverflow.com/questions/20181323/passing-data-between-controllers-in-angular-js
1) using $localStorage
2) using $broadcast-  $scope.$broadcast('SOME_TAG', 'your value'); / $scope.$on('SOME_TAG', function(response) {...}) (publish/subscribe design pattern)
3) using $rootScope - not recommended
4) using sessionStorage - $window.sessionStorage.setItem("Mydata",data); / $scope.data = $window.sessionStorage.getItem("Mydata");
5) via nested service (app.factory) - if the user refreshes the page - the data is lost
6) shared $scope.data
7) via $watch- slow with many watches!
8) Observer pattern

https://www.toptal.com/angular-js/top-18-most-common-angularjs-developer-mistakes


## Step 3. Containerization
- [`Docker`](https://www.docker.com/) v4.4.4 (Docker Engine v20.10.12)

Makefile used for building the images described in the _docker-compose.yml_.
- _make up_ - docker-compose build + docker-compose up -d
- _make down_ - docker-compose down


Backend BaseUrl: http://localhost:7000/api/v1

Frontend Url:    http://localhost:8000


#### Future Improvements (TODO)
- Migrating from AngularJS to [`Angular`](https://angular.io/) CLI 13, if the business case is justified, as the end of life of AngularJS was December 31st, 2021.
- Dockerize the Angular application with a [NGINX](https://hub.docker.com/_/nginx) server.
- Add toaster UI notifications


## Commands - Backend

node --version

mkdir dbfunts
cd dbfunts

npm init -y
npm i -D typescript
npx tsc --init
npm i -D @types/node

npm i express dotenv cors helmet
npm i -D @types/express @types/dotenv @types/cors @types/helmet

npm i -D ts-node-dev

### Install Postgre
npm i pg
npm i -D @types/pg 

### Install ORM
npm install --save sequelize
npm i -D @types/sequelize 

Start with: 
npm run dev

### Docker
docker-compose build
docker-compose up -d
docker-compose down

To use 'MAKE' you must have C:\mingw32\bin\make.exe to your PATH environment variables
make up
make down


## Commands - Frontend

### AngularJS Client App
npm i http-server

npm start
or
npm start-docker


### Angular Client App
npm install -g @angular/cli

ng version

ng new my-app

ng build
ng serve --open

ng generate component <component-name>

If you have a DockerHub account:
docker login -u <username> -p <password>
docker push <username>/sample-angular-app-image:latest
