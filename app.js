//MODULE IMPORTS
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const dotenv  = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');

//MONGOOSE EXPORTS
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_CLIENT).then(()=>{console.log("mongoose connected")});

// CONTROLLERS
const postSignup = require('./controllers/postSignup');
const postLogin = require('./controllers/postLogin');
const deleteUser = require('./controllers/deleteUser');
const newNote = require('./controllers/newNote');
const getNotes = require('./controllers/getNotes')
const getNotebyId = require('./controllers/getNotebyId')
// const userProtect = require('./controllers/userProtect')

const userProtect = (req, res, next) => {
    if (req.cookies.login) {
        const isVerified = jwt.verify(req.cookies.login, process.env.JWT_KEY);
        if (isVerified) {
            next();
        } else {
            res.status(401).json({ message: "User not verified" });
        }
    } else {
        res.status(401).json({ message: "User not logged in" });
    }
};

const getUid = (req) => {
    const token = req.cookies.login.split(".")[1];
    const stringId = Buffer.from(token, "base64").toString("utf8");
    const uid = JSON.parse(stringId).uid;
    return uid;
}

// ROUTERS
const userRouter = express.Router();
const authRouter = express.Router();
const notesRouter = express.Router();

// MIDDLEWARES
app.use(express.json());
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/user/notes", notesRouter);
userRouter.use(userProtect);
notesRouter.use(userProtect);



authRouter
    .route("/signup")
    .post(postSignup);

authRouter
    .route("/login")
    .post(postLogin);

userRouter.
    route("/delete")
    .post((req, res)=>deleteUser(req, res, getUid(req)));

notesRouter
    .route("/new")
    .post((req, res)=>newNote(req, res, getUid(req)));

notesRouter
    .route("/")
    .get((req, res)=>getNotes(req, res, getUid(req)));

notesRouter
    .route("/:_id")
    .get(getNotebyId);

notesRouter
    .route("/:_id")
    .put((req, res) => { });

app.listen(process.env.PORT);
