const express = require("express");
const dotenv = require("dotenv");
const session = require("express-session");
const handlebars = require("express-handlebars");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const fetch = require("node-fetch");
const flash = require("express-flash");
const PORT = 5000;

const backend_URL = "http://localhost:3000/";
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
/*
Đây là cách thiết lập môi trường 
cho ngôn ngữ Handlebars

Trong đó:
  - layoutSDir: là địa chỉ của thư mục layout 
  [Coi chú thích layout ở note.txt]

  - partialsDir: là địa chỉ của thư mục partial
  [Coi chú thích partial ở note.txt]

  - extname: tên file extension => .hbs

  - defaultLayout: layout mặc đỉnh được 
  trỏ tới khi chạy npm nodemon
*/
app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "./layouts/"),
    partialsDir: path.join(__dirname, "./partials/"),
  })
);

/*
  - Trỏ đến thư mục 'view' để render phần body của các
  file hbs

*/
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./views"));
app.use(express.static(path.join(__dirname, "./public")));

/* API đến đường dẫn của trang chính
  - Di chuyển đến trang chủ của website

  - Hàm render sẽ xuất file index.hbs

  - layout sẽ xuất file main.hbs
*/
app.get("/", (req, res, next) => {
  const success = req.flash("success") || "";
  const error = req.flash("error") || "";
  return res.render("index", {
    layout: "main",
    success: success,
    error: error,
  });
});

/* API dẫn đến trang chính của website
  - Hàm flash sẽ hiện lên thông báo nếu user 
  đăng nhập không thành công

  - Hàm render sẽ xuất file login.hbs
  ở folder views

  - layout sẽ xuất file account.hbs
*/

app.get("/login", (req, res, next) => {
  const success = req.flash("success") || "";
  const error = req.flash("error") || "";
  const username = req.flash("username") || "";
  return res.render("login", {
    layout: "account",
    success: success,
    error: error,
    username: username,
  });
});

/* API gửi thông tin từ user đến trang login
  - Nhận vào dữ liệu của request gồm:
    + username
    + password
  
  - Hàm stringify đóng gói dữ liệu 
  được nhận vào

  - Hàm fetch sẽ gửi tính hiệu từ đường dẫn 
  gồm: backend_URL (http://localhost:3000) +
  đường dẫn 
    1. Nếu nhận được dữ liệu:
      Mở gói dữ liệu
        result = await result.json()

      Kiểm tra đk và hiện thông báo
        req.flash("succes", "Đăng nhập thành công");

      Nếu không đăng nhập thành công
      -> Ở lại trang login

    2. Nếu không nhận dược dữ liệu
      Catch lỗi và hiện thông báo
        req.flash("error", "Sai thông tin tài khoản");
*/

app.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  let body = JSON.stringify({ username, password });

  await fetch(backend_URL + "account/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body,
  }) // Gui tinh hieu
    .then(async (result) => {
      result = await result.json(); // Mo goi du lieu

      if (result.success == true) {
        // Xac nhan dung mat khau
        req.flash("succes", "Đăng nhập thành công");
        return res.redirect("/");
      } else {
        // Xac nhan khong dung mat khau
        req.flash("error", "Sai thông tin tài khoản");
        req.flash("username", username);
        return res.redirect("/login");
      }
    })
    .catch((err) => {
      req.flash("error", "Sai thông tin tài khoản");
      return res.json(err);
    });
});

/* API dẫn đến trang register
  - Hàm render sẽ xuất file register.hbs

  - layout sẽ xuất file account.hbs

  - các hàm các hàm flash sẽ hiện thông báo
  khi trả về
 */

app.get("/register", (req, res, next) => {
  const success = req.flash("success") || "";
  const error = req.flash("error") || "";
  const username = req.flash("username") || "";
  const address = req.flash("address") || "";
  const age = req.flash("age") || "";
  return res.render("register", {
    layout: "account",
    success: success,
    error: error,
    username: username,
    address: address,
    age: age,
  });
});

/* API gửi dữ  liệu từ user đến trang register
  - Nhận vào dữ liệu từ request.

  - Đóng gói dữ liệu với hàm stringify()

  - Hàm fetch sẽ gửi tính hiệu từ đường dẫn 
  gồm: backend_URL (http://localhost:3000) + đường dẫn 
    1. Nếu nhận được dữ liệu:
      Mở gói dữ liệu
        result = await result.json()

      Kiểm tra đk và hiện thông báo
        req.flash("succes", "Tạo tài khoản thành công");

      Chuyển về trang login sau khi tạo tk thành công

      Nếu không thành công
      -> Ở lại trang register

    2. Nếu không nhận dược dữ liệu
      Catch lỗi và hiện thông báo
  

*/

app.post("/register", async (req, res, next) => {
  const { username, password, address, age } = req.body;

  let body = JSON.stringify({ username, password, address, age });
  // DOng goi du lieu

  await fetch(backend_URL + "account/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body,
  })
    .then(async (result) => {
      result = await result.json();
      // Mo goi du lieu
      if (result.success == true) {
        req.flash("succes", "Tạo tài khoản thành công");
        return res.redirect("/login");
      } else {
        req.flash("error", result.msg);
        req.flash("username", username);
        req.flash("address", address);
        req.flash("age", age);
        return res.redirect("/register");
      }
    })
    .catch((err) => {
      return res.json(err);
    });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// This is Front-end index.js
