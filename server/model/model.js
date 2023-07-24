const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

var UserSchema = new mongoose.Schema({
  role: {
    type: String,
  },
  datadate: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    unique: [true, "The email address is already taken!"],
  },
  firstname: {
    type: String,
    required: [true, "Please provide firstname"],
  },
  lastname: {
    type: String,
    required: [true, "Please provide lastname"],
  },
  username: {
    type: String,
    required: [true, "Please provide username"],
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
  },
  gender: {
    type: String,
    required: [true, "Please select gender"],
  }
});

UserSchema.path("email").validate(async (email) => {
  const emailCount = await mongoose.models.User.countDocuments({ email });
  return !emailCount;
}, "Email already exists");

UserSchema.pre("save", function (next) {
  const user = this;

  bcrypt
    .hash(user.password, 10)
    .then((hash) => {
      user.password = hash;
      next();
    })
    .catch((error) => {
      console.error(error);
    });
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
