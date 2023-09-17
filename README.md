``` Notes app in which user can signup with a unique email and can access the API after signing in. Passwords are stored in database in hashed form(using bcrypt). CRUD operations can be performed on the notes by the user with their respective accounts. Tech stack used is- Node.js, Express.js, MongoDB, Mongoose.

 Deployed Build - https://munish-notes-app.onrender.com

SIGNUP-
Signup using at the URL- [Signup](https://munish-notes-app.onrender.com/auth/signup/)
JSON format in which data is to be given in body->
{
"name":"test",
"email":"test@test.com",
"password":"12345678",
"confirmPassword":"12345678"
}
=>Email shoud be unique.
=>Password length shoud be at least 8.


LOGIN-
Login after signing up at the URL - https://munish-notes-app.onrender.com/auth/login
JSON format in which data is to be given in body->
{
"email":"test@test.com",
"password":"12345678",
}


CRUD OPERATIONS-
 ```
