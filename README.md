# BackEnd

## Schema

#### Users

| Field    | Type    | Notes                               |
| -------- | ------- | ----------------------------------- |
| id       | integer | _primary key_ and _auto increments_ |
| username | string  | _required_                          |
| email    | string  | _required_ and _unique_             |
| password | string  | _required_         
| role     | integer | _required_

## API

BASE URL: https://food-truck-lambda.herokuapp.com/

test accounts:

```
{
  "username": "operator1",
  "email": "operator1@gmail.com",
  "password": "pass",
  "role": 1  //Operator role
}

{
  "username": "diner1",
  "email": "diner1@gmail.com",
  "password": "pass",
  "role": 2  //Diner role
}

```

### Table of Contents

| Type                                   | Path                          | Notes                                                           |
| -------------------------------------- | ----------------------------- | --------------------------------------------------------------- |
| [POST](#post-apiauthregister)          | /api/auth/register            | registers a new user                                            |
| [POST](#post-apiauthlogin)             | /api/auth/login               | lets user log in                                                |

## Examples

#### POST /api/auth/register

request data:

```
{
  username: "operator2"
  "email": "operator2@gmail.com",
  "password": "pass",
  "role": 1
}
```

response data:

```
{
    "data": {
        "id": 4,
        "username": "operator2",
        "email": "operator2@gmail.com",
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

