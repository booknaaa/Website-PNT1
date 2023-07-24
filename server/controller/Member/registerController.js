module.exports = (req, res) => {
  let firstname = "";
  let lastname = "";
  let username = "";
  let email = "";
  let password = "";
  //const datadate = new Date()
  //let datadate = "";
  let data = req.flash("data")[0];

  if (typeof data != "undefined") {
    firstname = data.firstname;
    lastname = data.lastname;
    username = data.username;
    email = data.email;
    password = data.password;
  }
  res.render("register", {errors: req.flash("validationErrors"),
    firstname: firstname,
    lastname: lastname,
    username: username,
    email: email,
    password: password,
  });
};
