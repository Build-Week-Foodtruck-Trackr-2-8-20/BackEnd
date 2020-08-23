# BackEnd

## Schema

#### users

| Field       | Type    | Notes                               |
| --------    | ------- | ----------------------------------- |
| id          | integer | _primary key_ and _auto increments_ |
| username    | string  | _required_ and _unique_             |
| email       | string  | _required_ and _unique_             |
| password    | string  | _required_                          |
| role        | integer | _required_ (1-Operator & 2-Diner)   |
| location    | string  | _not required_                      |
| locationGPS | string  | _not required_                      |


#### trucks

| Field               | Type    | Notes                               |
| --------            | ------- | ----------------------------------- |
| id                  | integer | _primary key_ and _auto increments_ |
| imageURL            | string  | _required_ and _unique_             |
| cuisineType         | string  | _required_                          |
| location            | string  | _required_                          |
| locationGPS         | integer | _required_                          |
| departureTime       | datetime| _not required_                      |
| customerRatingAvg   | integer | _not required_                      |
| username            | string  | _required_ and _foreign-key_        |

#### truckratings

| Field               | Type    | Notes                               |
| --------            | ------- | ----------------------------------- |
| id                  | integer | _primary key_ and _auto increments_ |
| rating              | integer | _not required_                      |
| username            | string  | _required_ and _foreign-key_        |
| truckid             | integer | _required_ and _foreign-key_        |

## API

BASE URL: https://food-truck-lambda.herokuapp.com/


### Table of Contents

| Type                                   | Path                          | Notes                                                           |
| -------------------------------------- | ----------------------------- | --------------------------------------------------------------- |
| [POST](#post-apiauthregister)          | /api/auth/register            | registers a new user                                            |
| [POST](#post-apiauthlogin)             | /api/auth/login               | lets user log in                                                |
| [GET]                                  | /api/trucks/                  | get the list of all the trucks with ratings                     |
| [GET]                                  | /api/trucks/:id               | get the details of a specific truck with ratings                |
| [GET]                                  | /api/trucks/:id/ratings       | get the array of ratings for a truck                            |
| [POST](#post-apitrucks)                | /api/trucks                   | create a new truck                                              |
| [POST](#post-apitruckratig)            | /api/trucks/:id/ratings       | adds a new rating for the truck and updates the average rating  |
| [PUT](#put-apitrucks)                  | /api/trucks/:id               | update a truck                                                  |
| [DELETE](#delete-apitrucks)            | /api/trucks/:id               | delete a truck                                                  |
| [DELETE](#delete-apitruckrating)       | /api/trucks/:id               | delete a truck                                                  |

## Examples

#### POST /api/auth/register

request data:

```
{
  username: "operator1"
  "email": "operator1@gmail.com",
  "password": "pass",
  "role": 1
}
```

response data:

```
{
    "data": {
        "id": 1,
        "username": "operator1",
        "email": "operator1@gmail.com",
        "password": "$2a$08$9q0yGueSIFBaBerc8cZdpueLlnn2TVYXAcm/JJn/A.RoCpSi8RGVa",
        "role": 1
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijo0LCJ1c2VybmFtZSI6Im9wZXJhdG9yMSIsImlhdCI6MTU5Nzk3ODQxOCwiZXhwIjoxNTk3OTg1NjE4fQ.KxMilcbdwevLChixzPel69qKSpJdCfTgRGR0dJVlHZ4"
}
```

#### POST /api/auth/login

request data:

```
{
  "username": "operator1",
  "password": "pass"
}
```

response data:

```
{
    "message": "Welcome to our API",
    "role": 1,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijo0LCJ1c2VybmFtZSI6Im9wZXJhdG9yMSIsImlhdCI6MTU5Nzk3ODUwNCwiZXhwIjoxNTk3OTg1NzA0fQ.IMfYVV1H8HwbwldaEpTxd7cp7kzr3OK2kpVv4P1ulzs"
}
```

#### GET /api/trucks
response data:

```
[
    {
        "id": 1,
        "imageURL": "www.amazon.com",
        "cuisineType": "Indian",
        "location": "San Francisco",
        "locationGPS": "San Francisco",
        "departureTime": "2017-01-30 16:49:19",
        "customerRatingAvg": 4,
        "username": "mj",
        "dinerRatingsArray": "2,5"
    },
    {
        "id": 2,
        "imageURL": "www.gogole.com",
        "cuisineType": "Italian",
        "location": "San Francisco",
        "locationGPS": "San Francisco",
        "departureTime": "2017-01-30 16:49:19",
        "customerRatingAvg": 5,
        "username": "mj",
        "dinerRatingsArray": null
    }
]
```
#### GET /api/trucks/1/ratings
response data:

```
[
{
"id": 1,
"rating": 5,
"truckid": 1,
"username": "mj"
},
{
"id": 2,
"rating": 2,
"truckid": 1,
"username": "mj"
}
]
```

#### POST /api/trucks

request data:

```
{
"imageURL": "www.apple.com",
"cuisineType": "Mexican",
"location": "San Francisco",
"locationGPS": "San Francisco",
"departureTime": "2017-01-30 16:49:19",
"customerRatingAvg": 5,
"username": "mj"
}
```

response data:

```
{
    "created": 3
}
```

#### POST /api/trucks/1/ratings

request data:

```
{
"rating": 5,
"truckid": 1,
"username": "mj"
}
```

response data:

```
{
    "created": 7
}
```
