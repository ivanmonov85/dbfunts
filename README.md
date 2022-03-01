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
  username:  [string]  Usaername (required)
  email:     [string]  Email (required)
  phone:     [string]  Phone
  website:   [string]  Website
}
```
### Database and Infrastructure
- [`PostgreSQL`](https://www.postgresql.org/) '[postgres](https://hub.docker.com/_/postgres)' v13.6 image from DockerHub
- [Adminer](https://hub.docker.com/_/adminer) UI v4.7.8 imagenpm http-server
 used for DB management
- [Sequelize](https://sequelize.org/) v6 is used as ORM for Postgres

**Note:** Database migration scripts are not automated in this release and must be run manually.

### Testing
- [Postman](https://www.postman.com/) v9.14 was used for testing and used collection and environment are exported in v2.1 format to the 'postman' folder.

The Authorization is **automated** in the 'Get Auth Token' action which copies the received token in the {{authorization}} environment variable and is used in the other actions.


## Step 2. Client Implementation
- [`AngularJS`](https://angularjs.org/) v1.8.2, using NPM web server [http-server](https://www.npmjs.com/package/http-server) v14.1.0 .
Also used are: _ngRoute_, _ngStorage_, _ngDialog_, _ngTable_

- Error Handling:
Server error responses are handled globally, instead of per request, with registered 'responseError' interceptor to the $httpProvider.


## Step 3. Containerization
- `Docker` v4.4.4 (Docker Engine v20.10.12)

Makefile used for building the images described in the _docker-compose.yml_.
- make up - docker-compose build + docker-compose up -d
- make down - docker-compose down


Backend BaseUrl: http://localhost:7000/api/v1

Frontend Url:    http://localhost:8000


#### Future Improvements (TODO)
- Migrating from AngularJS to [`Angular`](https://angular.io/) CLI 13, if the business case is justified, as the end of life of AngularJS was December 31st, 2021.
- Dockerize the Angular application with a [NGINX](https://hub.docker.com/_/nginx) server.
