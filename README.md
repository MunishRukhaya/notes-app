Notes app in which user can signup with a unique email and can access the API after signing in. Passwords are stored in the database in hashed form (using bcrypt). CRUD operations can be performed on the notes by the user with their respective accounts. Tech stack used is- Node.js, Express.js, MongoDB, Mongoose.

Deployed Build - [Munish Notes App](https://munish-notes-app.onrender.com)


**SIGNUP:**

Signup using the URL - [Signup](https://munish-notes-app.onrender.com/auth/signup/)

JSON format in which data is to be given in the body with POST request:
```json
{
  "name": "test",
  "email": "test@test.com",
  "password": "12345678",
  "confirmPassword": "12345678"
}
```
- Email shoud be unique.
- Password length shoud be at least 8.

  
**LOGIN**

Login after signing up at the URL - [Login](https://munish-notes-app.onrender.com/auth/login)

JSON format in which data is to be given in the body with POST request:
```json
{
  "email": "test@test.com",
  "password": "12345678"
}
```
- JWT authentication system is used to login the user.
- JWT tokens are stored in browser using cookies to keep the user logged in.

**DELETE USER**

Delete the user at the URL - [Delete](https://munish-notes-app.onrender.com/user/delete)

- User can be deleted from the database with DELETE request.
- All notes of the user will alsobe deleted.


**CRUD OPERATIONS**
   1. GET ALL NOTES-
   - User can access all their notes at the URL /user/notes/ [Notes](https://munish-notes-app.onrender.com/user/notes)
   - User will have to make a GET request at the URL.

   2. ADD A NEW NOTE-
   - User can add a new note at the URL /user/notes/new/ [Add a new Note](https://munish-notes-app.onrender.com/user/notes/new)
   - User will have to make a POST request at the URL.
   ```json
   {
     "title":"SOME RANDOM TITLE",
     "body":"NOTE BODY"
   }
   ```
