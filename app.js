//MODULE IMPORTS
const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const JWT_KEY = 'rpo3vmompk2zompc3q983ujf';

//MONGOOSE EXPORTS

const mongoose = require('mongoose');
const uri = "mongodb+srv://munishrukhaya:mongo-munish@cluster0.vxrnulk.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(uri).then(console.log('mongoose connected'));

const User = require('./models/userModel');
const Note = require('./models/noteModel');


const userRouter = express.Router();
const authRouter = express.Router();
const notesRouter = express.Router();

app.use(express.json());
app.use(cookieParser())
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/user/notes', notesRouter)

app.get('/', (req, res)=> {
    res.redirect('/auth/signup');
})

const postSignup = async (req, res) => {
    const existingUser = await User.findOne({ email: req.body.email });
    if (!existingUser) {
        if (req.body.password === req.body.confirmPassword) {
            const hashPass = await bcrypt.hash(req.body.password, 10);
            const data = await User.create({ name: req.body.name, email: req.body.email, password: hashPass });
            res.status(200).json(data);
        }
        else {
            res.status(401).json({ message: "Password and confirm passowords do not match" });
        }
    }
    else {
        res.status(403).json({ message: "User already exists" })
    }
}

const postLogin = async (req, res) => {
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
        if (bcrypt.compareSync(req.body.password, existingUser.password)) {
            const uid = existingUser._id;
            const token = jwt.sign({ uid: uid }, JWT_KEY);
            res.cookie('login', token);
            res.status(200).json({ message: `Hello ${existingUser.name}, Welcome` });
        }
        else {
            res.status(401).json({ message: "Invalid password" });
        }
    }
    else {
        res.status(401).json({ message: "User does not exist" })
    }
}

const newNote = async (req, res) => {
    const token = req.cookies.login.split('.')[1];
    const stringId = Buffer.from(token, 'base64').toString('utf8');
    const uid = JSON.parse(stringId).uid;
    const note = await Note.create({
        title:req.body.title,
        body:req.body.body,
        user_id: uid
    });
    res.status(200).json({ message: `Note with ID: ${note._id} is created` });
}

const getNotes = async (req, res) => {
    const token = req.cookies.login.split('.')[1];
    const stringId = Buffer.from(token, 'base64').toString('utf8');
    const uid = JSON.parse(stringId).uid;
    const userNotes = await Note.find({user_id:uid});
    console.log(userNotes);
    res.status(200).send(userNotes);
}

const getNotebyId = (req, res) => {
    const note = Note.findOne({ "_id": req.params._id })
}


const userProtect = (req, res, next) => {
    if (req.cookies.login) {
        const isVerified = jwt.verify(req.cookies.login, JWT_KEY)
        if (isVerified) {
            next();
        } else {
            res.status(401).json({ message: "User not verified" });
        }
    } else {
        res.status(401).json({ message: "User not logged in" });
    }
}


userRouter.use(userProtect);
notesRouter.use(userProtect);

authRouter
    .route('/signup')
    .post(postSignup)

authRouter
    .route('/login')
    .post(postLogin)

    userRouter.route('/delete').post(async (req, res)=>{
        const token = req.cookies.login.split('.')[1];
    const stringId = Buffer.from(token, 'base64').toString('utf8');
    const uid = JSON.parse(stringId).uid;
    User.deleteOne({_id:uid}).then(res.status(400).send({message:`User with ID:${uid} has been deleted`}))
    })

notesRouter
    .route('/new')
    .post(newNote)

notesRouter
    .route('/')
    .get(getNotes)

notesRouter
    .route('/:_id')
    .get(getNotebyId)

    notesRouter.route('/:_id').put((req, res)=>{
        
    })




app.listen(process.env.PORT ||5000);