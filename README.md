# Co-Make API

Welcome to the Co-Make API!

The server is located at: **URL**

## POST /api/register

- users can register new accounts at this endpoint
- Registration **requires** an `email`, `name`, and `password`
- Don't worry about the returned password—the hashed password is returned; the password you registered with will still work with the login

```js
{
  "data": {
    "id": 4,
    "email": "Joe@gmail.com",
    "name": "Joe",
    "password": "$2a$08$ODBxChFzXBuHVZKOc/Ywu.2D7Mbki09f8SUg2aJMopBBihqhy.PmO"
  }
}
```

## POST /api/login

- users can login with their credentials using this endpoint
- An `email` and `password` are **required** for login
- the token is returned just so you can see that a token exists for use in `localStorage`

```js
{
  "message": "Welcome to the API, Joe",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijo0LCJ1c2VybmFtZSI6IkpvbmF0aGFuIiwiaWF0IjoxNTkyNjk2MDEzLCJleHAiOjE1OTI3ODI0MTN9.EnOFR8i4-D18xdx00ra-pfiPFSjR3l2pUEgD97Tdj_E",
  "userId": 4
}
```

## ALL ENDPOINTS FROM HERE ON ARE RESTRICTED: CREDENTIALS REQUIRED FOR ACCESS

## GET /issues

- users can access this endpoint to get a list of **ALL** issues existing in Co-Make

```js
{
  "data": [
    {
      "id": 1,
      "title": "Leaking Fire Hydrant",
      "description": "On the corner of 5th Ave., gushing out water nonstop",
      "city": "los angeles",
      "hoa": "",
      "image": "",
      "upvotes": 10,
      "created_on": "Jun 20th 20",
      "profile_pic": "",
      "name": "Joe"
    },
  ]
}
```

## GET /issues/:id

- users can retrieve a specific issue by id

```js
{
  "data": [
    {
      "id": 1,
      "title": "Leaking Fire Hydrant",
      "description": "On the corner of 5th Ave., gushing out water nonstop",
      "city": "los angeles",
      "hoa": "",
      "image": "",
      "upvotes": 10,
      "created_on": "Jun 20th 20",
      "name": "Joe"
    }
  ]
}
```

## GET /api/users/:id/issues

- users can get a list of all **their own** created issues

```js
{
  "data": [
    {
      "id": 1,
      "title": "Leaking Fire Hydrant",
      "description": "On the corner of 5th Ave., gushing out water nonstop",
      "city": "los angeles",
      "hoa": "",
      "image": "",
      "upvotes": 10,
      "created_on": "Jun 20th 20",
      "name": "Joe"
    }
  ]
}
```

## GET /issues/search

- users can get a list of issues based on city
- the city query is made through the `url` like so: `/issues/search?city=${ENTER CITY HERE}`
- the city search string can be *upper* **or** *lower case*, and **can** include spaces

```js
{
  "data": [
    {
      "id": 1,
      "title": "Leaking Fire Hydrant",
      "description": "On the corner of 5th Ave., gushing out water nonstop",
      "city": "los angeles",
      "hoa": "",
      "image": "",
      "upvotes": 10,
      "created_on": "Jun 20th 20",
      "name": "Joe"
    }
  ]
}
```

- I suggest giving users a city search input in a react component that will fill in the template literal of the axios request :)

```js
// for ex:
axios.get(`localhost:5000/issues/search?city=${city input goes here}`)

// and then a form input allowing users to enter a city...
```

## POST /issues

- users can post new issues to this endpoint
- at the minimum, an issue **requires** a `title`, `description`, and `city`
- the city search string can be *upper* **or** *lower case*, and **can** include spaces

```js
// req.body
{
  "title": "Clogged Toilet",
  "description": "In the mens restroom at the park",
  "city": "los angeles"
}
```

## PUT /issues/:id

- users can edit issues using this endpoint
- NOTE: if the `user.id` **does not** match the `issue.user_id`, the user **cannot** update the issue, the server will reject the request

```js
// req.body
{
  "title": "Clogged Toilet",
  "description": "In the mens restroom at the park",
  "city": "los angeles"
}
```

## DELETE '/issues/:id

- users can delete issues using this endpoint
- NOTE: if the `user.id` **does not** match the `issue.user_id`, the user **cannot** delete the issue, the server will reject the request

```js
// JSON message displayed upon a successful delete
{
    "deleted": "The issue was deleted"
}
```
