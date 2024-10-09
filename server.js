const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const expresslayout = require('express-ejs-layouts');
const connectDB = require('./server/config/db.js')
const mainRoutes = require('./server/routes/main')
const authRoutes = require("./server/routes/auth.js")
const postRoutes = require("./server/routes/post.js")
const app =express();
const methodOverride = require('method-override');
const session = require('express-session');
const passUserToView = require('./middleware/pass-user-to-view.js');

const PORT = 3000 || process.env.PORT;
connectDB();
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
// app.use(morgan('dev'));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passUserToView);


app.use(expresslayout)
app.set('layout','./layouts/main');
app.set('view engine', 'ejs');

 app.use('/', mainRoutes);
 app.use('/auth', authRoutes);
 app.use('/posts', postRoutes);
 
 app.listen(PORT, ()=>{
    console.log(`app listening pn port ${PORT}`);
 })