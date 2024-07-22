const express = require('express')
// const dotenv = require('dotenv')
const dbConnect = require('./config/db');
var path = require('path')
var cors = require('cors')
var bodyParser = require('body-parser')
const jwt = require("jsonwebtoken");

const app = express();

// Set up Global configuration access
// dotenv.config();
require('dotenv').config()

// require('./config/db')()
dbConnect();

// To access public folder
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

const { register, verifyEmail, login, profileById } = require('./controllers/auth/auth');

app.get('/', (req, res) => {
    res.send('Hello World!')
});

//Auth
app.post('/register', register);
// app.get('/verify/:token', verifyEmail);
app.post('/login', login);
app.get('/profile/:userId', profileById);


//app listening at port no
app.listen((process.env.PORT || 5001), () => {
    console.log(`Server app listening on port ${process.env.PORT}!`);
});
