const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs')
const path = require('path');
const port = 3000
const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

mongoose.connect('mongodb+srv://Vansh:1234@cluster0.kyfyq01.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch((err) => {
  console.error('Error connecting to MongoDB Atlas:', err.message);
});

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
});

const User = mongoose.model('User', userSchema);

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const newUser = new User({ username, password });
    await newUser.save();
    res.redirect('/bookflight');
  } catch (err) {
    console.error('Error saving user:', err.message);
    res.redirect('/');
  }
});
app.post('/signup', async (req, res) => {
  try {
    res.redirect('/bookflight');
  } catch (err) {
    console.error('Error saving user:', err.message);
    res.redirect('/');
  }
});
app.post('/mybooking', async (req, res) => {
  try {
    res.redirect('/mybooking');
  } catch (err) {
    console.error('Error saving user:', err.message);
    res.redirect('/');
  }
});


app.get('/', (req,res)=>{
    res.render('bookflight')
})

app.get('/bookflight', (req,res)=>{
  res.render('bookflight')
})
app.get('/index', (req,res)=>{
    res.render('index')
})

app.get('/login', (req,res)=>{
res.render('login')
})


app.get('/mybooking', (req,res)=>{
    res.render('mybooking')
    })

    app.get('/services', (req,res)=>{
      res.render('services')
      })

      
    app.get('/signup', (req,res)=>{
      res.render('signup')
      })
app.listen(port, ()=>{
    console.log('Server at 3000')
})
