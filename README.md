# BYOB

Build Your Own Backend used Postgres, Knex, Node.js, and vanilla JavaScript.  This repository will serve as a backend allowing you to build your own postgres databases. 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.


### Prerequisites



### Installing

* Clone down this repo.
* Run `npm install`
* Setup Postgres if you do not have it installed. Scroll down for more information.
* Run `npm start`
* Visit localhost:3000

### Setup Postgres

If you already have Postgres on your computer, you will need to uninstall

[Click here for more information.](https://postgresapp.com/documentation/remove.html)

### Installation 

[Get the Postgres app here.](https://postgresapp.com/)

### Create Your Database

* In your terminal enter the following commands
* `psql`
* `CREATE DATABASE <dbname>;`
* Create a new directory in your terminal
* Run `npm init --yes`
* Type `npm install -g knex knex pg --save`
* Type `knex init` to create a knexfile.js with default values
* Identify where to store migrations in development environment in knexfile.js
* Create migration with `knex migrate:make initial` to make a timestamped migrations directory


## Available Endpoints and Example Responses

* GET `/api/v1/states`
* GET `/api/v1/senators`
* GET `/api/v1/states/:id`
* GET `/api/v1/senators/:id`
* GET `/api/v1/party`    example:  `/api/v1/party?party=<query parameter>` - valid query parameter choices: (D,R,I)
* POST `/api/v1/states`
* POST `/api/v1/senators`
* PATCH `/api/v1/states/:id`
* PATCH `/api/v1/senators/:id`
* DELETE `/api/v1/states/:id`
* DELETE `/api/v1/senators/:id`

#### Request state information

* To recieve all state information (name, capital, population), use GET `/api/v1/states`.
* To receive information on a single state, use GET `/api/v1/states/:id`.
* To add a state, use POST `/api/v1/states`. The body should contain a name, a capital, and population.
* To update a piece of state information, use PATCH `/api/v1/states/:id`. The id is immutable.
* To delete a state, use DELETE `/api/v1/states/:id`. 

#### Request senators information

* To recieve all senator information (name, party), use GET `/api/v1/senators`.
* To receive all senators from a certain party, use GET `/api/v1/party`.
* To receive information on a single senator, use GET `/api/v1/senators/:id`.
* To add a senator, use POST `/api/v1/senators`. The body should contain a name, and a party.
* To update a piece of senator information, use PATCH `/api/v1/senators/:id`. The id is immutable.
* To delete a senator, use DELETE `/api/v1/senators/:id`. 

### Sample Responses

##### GET `/api/v1/states`: 
```javascript
[
    {
        "id": 201,
        "state_name": "Alabama",
        "population": 4874747,
        "capital": "Birmingham",
        "created_at": "2018-08-29T23:22:25.347Z",
        "updated_at": "2018-08-29T23:22:25.347Z"
    },
    {
        "id": 202,
        "state_name": "Alaska",
        "population": 739795,
        "capital": "Juneau",
        "created_at": "2018-08-29T23:22:25.354Z",
        "updated_at": "2018-08-29T23:22:25.354Z"
    },
    ...
]
```

##### * GET `/api/v1/senators`
```javascript
[
    {
        "id": 201,
        "senator_name": "Doug Jones",
        "party": "D",
        "state_id": 201,
        "created_at": "2018-08-29T23:22:25.384Z",
        "updated_at": "2018-08-29T23:22:25.384Z"
    },
    {
        "id": 213,
        "senator_name": "Michael F Bennet",
        "party": "D",
        "state_id": 205,
        "created_at": "2018-08-29T23:22:25.392Z",
        "updated_at": "2018-08-29T23:22:25.392Z"
    },
    ...
]
```
##### GET `/api/v1/states/203`
```javascript
[
    {
        "id": 203,
        "state_name": "Arkansas",
        "population": 3004279,
        "capital": "Little Rock",
        "created_at": "2018-08-29T23:22:25.356Z",
        "updated_at": "2018-08-29T23:22:25.356Z"
    }
]
```

##### GET `/api/v1/senators/205`
```javascript
[
    {
        "id": 205,
        "senator_name": "John McCain",
        "party": "R",
        "state_id": 204,
        "created_at": "2018-08-29T23:22:25.387Z",
        "updated_at": "2018-08-29T23:22:25.387Z"
    }
]
```

##### GET `/api/v1/party?party=R`
```javascript
[
    {
        "id": 233,
        "senator_name": "Mitch McConnell",
        "party": "R",
        "state_id": 217,
        "created_at": "2018-08-29T23:22:25.401Z",
        "updated_at": "2018-08-29T23:22:25.401Z"
    },
    {
        "id": 253,
        "senator_name": "Deb Fischer",
        "party": "R",
        "state_id": 227,
        "created_at": "2018-08-29T23:22:25.411Z",
        "updated_at": "2018-08-29T23:22:25.411Z"
    },
    ...
]
```

##### POST `/api/v1/states`
Example body (required):
```javascript
{
  "state_name": "Guam",
  "population": 25000,
  "capital": "Pago Pago"
}
```

Example response:
```javascript
{
    "id": 252
}
```

##### POST `/api/v1/senators`
Example body (required):
```javascript
{
  "senator_name": "Betty Politician",
  "party": "I",
  "state_id": 252
}
```

Example response:
```javascript
{
    "id": 302
}
```

##### PATCH `/api/v1/states/252`
Example body (required):
```javascript
{
  "population": 25001
}
```

Example response:
```javascript
{
  "population": 25001
}
```

##### PATCH `/api/v1/senators/302`
Example body (required):
```javascript
{
  "party": "D"
}
```

Example response:
```javascript
{
  "party": "D"
}
```

##### DELETE `/api/v1/states/252`
```javascript
You deleted a state!!!
```

##### DELETE `/api/v1/senators/302`
```javascript
You deleted a senator!!!
```

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why


## Built With

* [Postgres](https://www.postgresql.org/) - open source object-relational database system
* [Node.js](https://nodejs.org/en/) - asynchronous, event-driven, JavaScript runtime
* [Express](https://expressjs.com/) - web framework for Node.js
* [npm]() - package management


## Authors

* **Marika Ross** - *Initial work* - [Marika on Github](https://github.com/marikaross)

* **Theresa Marquis** - *Initial work* - [Theresa on Github](https://github.com/tmcjunkinmarquis)
