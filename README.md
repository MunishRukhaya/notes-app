Notes app in which user can signup with a unique email and can access the API after signing in. Passwords are stored in the database in hashed form (using bcrypt). CRUD operations can be performed on the notes by the user with their respective accounts. Tech stack used is- Node.js, Express.js, MongoDB, Mongoose.

Deployed Build - [Munish Notes App](https://munish-notes-app.onrender.com)

**SIGNUP:**

Signup using the URL - [Signup](https://munish-notes-app.onrender.com/auth/signup/)

JSON format in which data is to be given in the body:
```json
{
  "name": "test",
  "email": "test@test.com",
  "password": "12345678",
  "confirmPassword": "12345678"
}
```
-Email should be unique.
-Password length should be at least 8.



