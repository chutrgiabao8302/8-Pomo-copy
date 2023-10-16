import Account from "./model.js";

async function post_register(req, res) {
  const { username, password, address, age } = req.body;

  let myAccount = await Account.findOne({
    username: username,
  });

  if (myAccount) {
    return res.json({
      success: false,
      status: 300,
      msg: `Account existed`,
    });
  } else {
    let account = {
      username: username,
      password: password,
      address: address,
      age: age,
    };

    await new Account(account).save();
  }

  return res.redirect("/account/login");
}

async function get_login(req, res) {
  return res.json("home");
}

async function post_login(req, res) {
  const { username, password } = req.body;

  let myAccount = await Account.findOne({
    username: username,
  });

  if (myAccount) {
    if (myAccount.password == password) {
      req.session.username = username;
      return res.json("Login success");
    } else {
      return res.json({
        success: false,
        msg: `Incorrect password`,
      });
    }
  } else {
    return res.json({
      success: false,
      msg: `Account doesn't exist`,
    });
  }
}

export { post_register, get_login, post_login };
