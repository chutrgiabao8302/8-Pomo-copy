const express = require("express");
const dotenv = require("dotenv");
const session = require("express-session");
const handlebars = require("express-handlebars");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const fetch = require('node-fetch');
const flash = require('express-flash');
const PORT = 5000;

const backend_URL = 'http://localhost:3000/'
// Load variables
dotenv.config();

// start server
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser("SUD"));
app.use(session({ cookie: { maxAge: 30000000 } })); // Save data on website on next visits
app.use(flash());

app.use(cors());
app.set("view engine", "hbs");
app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "./layouts/"),
    partialsDir: path.join(__dirname, "./partials/"),
  })
);

app.set("views", path.join(__dirname, "./views"));
app.use(express.static(path.join(__dirname, "./public")));

app.get('/', (req, res, next) => {
  const success = req.flash('success') || '';
  const error = req.flash('error') || '';
  return res.render('index', {
    layout: 'main',
    success: success,
    error: error
  });
})


app.get('/login', (req, res, next) => {
  const success = req.flash('success') || '';
  const error = req.flash('error') || '';
  const username = req.flash('username') || '';
  return res.render('login', {
    layout: 'account',
    success: success,
    error: error,
    username: username
  })
});

app.post('/login', async (req, res, next) => {
  const { username, password } = req.body;

  let body = JSON.stringify({ username, password });

  await fetch(backend_URL + 'account/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: body
  }) // Gui tinh hieu

  .then(async result => {
    result = await result.json(); // Mo goi du lieu

    if(result.success == true){ // Xac nhan dung mat khau
      req.flash('succes', 'Đăng nhập thành công');
      return res.redirect('/');
    }
    else { // Xac nhan khong dung mat khau
      req.flash('error', 'Sai thông tin tài khoản');
      req.flash('username', username);
      return res.redirect('/login');
    }
  })
  .catch(err => {
    req.flash('error', 'Sai thông tin tài khoản');
    return res.json(err);
  })
})


app.get('/register', (req, res, next) => {
  const success = req.flash('success') || '';
  const error = req.flash('error') || '';
  const username = req.flash('username') || '';
  const address = req.flash('address') || '';
  const age = req.flash('age') || '';
  return res.render('register', {
    layout: 'account',
    success: success,
    error: error,
    username: username,
    address: address,
    age: age
  })
});

app.post('/register', async (req, res, next) => {
  const { username, password, address, age } = req.body;

  let body = JSON.stringify({ username, password, address, age })
  // DOng goi du lieu

  await fetch(backend_URL + 'account/register', 
  {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: body, 
  }
  )
  // Gui request len BACkend

  .then(async result => {
    
    result = await result.json();
    // Mo goi du lieu
    if(result.success == true){
      req.flash('succes', 'Tạo tài khoản thành công');
      return res.redirect('/login');
    }else {
      req.flash('error', result.msg);
      req.flash('username', username);
      req.flash('address', address);
      req.flash('age', age);
      return res.redirect('/register');
    }

  }) 
  .catch(err => {
    return res.json(err);
  })

})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// This is Front-end index.js
