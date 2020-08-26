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
| location            | string  | _not required_                      |
| locationGPS         | integer | _not required_                      |
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

#### menuitems

| Field               | Type    | Notes                               |
| --------            | ------- | ----------------------------------- |
| id                  | integer | _primary key_ and _auto increments_ |
| itemName            | string  | _required                           |
| itemDescription     | string  | _not required_                      |
| itemPrice           | integer | _required_                          |
| customerRatingAvg   | integer | _not required_                      |
| truckid             | integer | _required_ and _foreign-key_        |

#### menuitemratings

| Field               | Type    | Notes                               |
| --------            | ------- | ----------------------------------- |
| id                  | integer | _primary key_ and _auto increments_ |
| rating              | integer | _not required_                      |
| username            | string  | _required_ and _foreign-key_        |
| menuitemid          | integer | _required_ and _foreign-key_        |

#### menuitemphotos

| Field               | Type    | Notes                               |
| --------            | ------- | ----------------------------------- |
| id                  | integer | _primary key_ and _auto increments_ |
| photoURL            | string  | _required_ and _unique_             |
| menuitemid          | integer | _required_ and _foreign-key_        |

#### dinerfavouritetrucks

| Field               | Type    | Notes                               |
| --------            | ------- | ----------------------------------- |
| userid              | integer | _required_ and _foreign-key_        |
| truckid             | integer | _required_ and _foreign-key_        |


## API

BASE URL: https://food-truck-lambda.herokuapp.com/


### Table of Contents

| Type                                   | Path                          | Notes                                                           |
| -------------------------------------- | ----------------------------- | --------------------------------------------------------------- |
| [POST](#post-apiauthregister)          | /api/auth/register            | registers a new user                                            |
| [POST](#post-apiauthlogin)             | /api/auth/login               | lets user log in                                                |
| [GET]                                  | /api/users                    | get the list of all the users (id, username, email, role)       |
| [GET]                                  | /api/diners                   | get the list of all the diners (user info above + location and favorite trucks)       |
| [GET]                                  | /api/diners/:id               | get the details of a diner (user info above + location and favorite trucks)       |
| [POST]                                 | /api/diners/addfavtruck       | add a favorite truck for a diner
| [DELETE]                               | /api/diners/removefavtruck    | remove a favorite truck for a diner
| [GET]                                  | /api/operators                | get the list of all the operators (user info above + trucks owned)       |
| [GET]                                  | /api/operators/:id            | get the details of a operator (user info above + trucks owned)       |
| [GET]                                  | /api/trucks/                  | get the list of all the trucks with ratings (in an array)       |
| [GET]                                  | /api/trucks/:id               | get the details of a specific truck with ratings (in an array)  |
| [GET]                                  | /api/trucks/:id/menuitems     | get the menu items for a truck                                  |
| [GET]                                  | /api/trucks/:id/ratings       | get the ratings for a truck                                     |
| [POST](#post-apitrucks)                | /api/trucks                   | create a new truck                                              |
| [POST](#post-apitruckratig)            | /api/trucks/:id/ratings       | adds a new rating for truck (also updates the average rating).  |
| [PUT](#put-apitrucks)                  | /api/trucks/:id               | update a truck                                                  |
| [DELETE](#delete-apitrucks)            | /api/trucks/:id               | delete a truck                                                  |
| [DELETE](#delete-apitruckrating)       | /api/trucks/ratings/:id       | delete a truck rating                                           |
| [GET]                                  | /api/menuitems/               | get the list of all the menu items with ratings and photo URLs (in an array)       |
| [GET]                                  | /api/menuitmes/:id            | get the details of a specific menu item with ratings and photos URLs (in an array)  |
| [GET]                                  | /api/menuitmes/:id/ratings    | get the ratings for a truck                                     |
| [GET]                                  | /api/menuitmes/:id/photos     | get the photos for a truck                                     |
| [POST](#post-apimenuitems)             | /api/menuitems                | create a new menu item                                              |
| [POST](#post-apimenurating)            | /api/menuitems/:id/ratings    | adds a new rating for a menu item (also updates the average rating).  |
| [POST](#put-apimenuphotos)             | /api/menuitems/:id/photos     | adds a new photo for a menu item                                                   |
| [PUT](#put-apimenuitmes)               | /api/menuitems/:id            | update a menu item                                                  |
| [DELETE](#delete-apimenuitems)         | /api/menuitems/:id            | delete a menu item                                                  |
| [DELETE](#delete-apimenurating)        | /api/menuitems/ratings/:id    | delete a menu item rating                                           |
| [DELETE](#delete-apimenuphoto)         | /api/menuitems/photos/:id     | delete a menu item photo                                           |






## Examples

#### POST /api/auth/register

request data:

```
{
  "username": "operator1",
  "email": "operator1@gmail.com",
  "password": "pass",
  "role": 1,
  "location": "location",
  "locationGPS": "location GPS"
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

#### GET /api/users

response data:

```
[
    {
        "id": 1,
        "username": "mj",
        "email": "mukeshj@gmail.com",
        "role": 1 //operator
    },
    {
        "id": 3,
        "username": "diner1",
        "email": "diner1@gmail.com",
        "role": 2 //diner
    }
]
```

#### GET /api/diners

response data:

```
[
    {
        "id": 3,
        "username": "diner1",
        "email": "diner1@gmail.com",
        "password": "$2a$08$.E5rRR6w9PlY8iqgVnvXseVqBUf7M0oAcWP0ZEano6pil.Or.3XlK",
        "location": "location",
        "locationGPS": "location GPS",
        "role": 2,
        "favoritetrucks": "1,2"  //an array of fav trucks
    }
]
```

#### POST /api/diners/addfavtruck 

request data:

```
{
  "userid": 3,
  "truckid": 2
}
````
response data:
```
{
    "created": 2
}
```

#### POST /api/diners/removefavtruck 

request data:

```
{
  "userid": 3,
  "truckid": 2
}
````
response data:
```
{
    "removed": 1
}
```

#### GET /api/operators

response data:

```
[
    {
        "id": 1,
        "username": "mj",
        "email": "mukeshj@gmail.com",
        "password": "$2a$08$9GbHbNbUII8afjCjSo9W8OZX8qwLKwRuF/U0qnqyZk3hQxEvoYsfu",
        "location": null,
        "locationGPS": null,
        "role": 1,
        "trucksowned": "1,2"
    },
    {
        "id": 2,
        "username": "operator1",
        "email": "operator1@gmail.com",
        "password": "$2a$08$9yeM9RuSDtqCSaOhRvJHP.4RCaUfuDWbc6N6AcSrcr0f/LZPWJira",
        "location": "location",
        "locationGPS": "location GPS",
        "role": 1,
        "trucksowned": null
    }
]
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

#### GET /api/trucks/1/menuitems
response data:
```
[
    {
        "id": 2,
        "itemName": "burrito",
        "itemDescription": "the best burrito every created",
        "itemPrice": 9.99,
        "customerRatingAvg": 5,
        "truckid": 1,
        "menuItemRatingsArray": "5,5",
        "menuItemPhotosArray": "photo URL,www.photo.com"
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

#### POST /api/trucks/menuitems

request data:
```
{
    "itemName": "taco",
    "itemDescription": "the best taco every created",
    "itemPrice": 9.99,
    "customerRatingAvg": 5,
    "truckid": 1
}
```

response data:
```
{
    "created": 3
}
```

#### POST /api/menuitems/:id/ratings
request data:
```
{
    "rating": 5,
    "menuitemid": 2,
    "username": "mj"
}
```
response data:
```
{
    "created": 6
}
```

#### POST /api/menuitems/:id/photos
request data:
```
{
    "photoURL": "www.photo.com",
    "menuitemid": 2
}
```
response data:
```
{
    "created": 3
}
```
