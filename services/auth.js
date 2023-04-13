const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const sha256 = require("sha256");
// const sgMail = require("@sendgrid/mail");

// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const { User } = require("../model/userModel");
// const { Verification } = require("../db/verificationModel");
const { NotAuthorizedError } = require("../helpers/errors");

const registration = async (email, password) => {
  const user = new User({
    email,
    password,
  });
  await user.save();
  //   const code = sha256(email + process.env.JWT_SECRET);
  //   const verification = new Verification({
  //     code,
  //     userId: user._id,
  //   });
  //   await verification.save();
  //   const msg = {
  //     to: email,
  //     from: "ezhov.kirill98@gmail.com",
  //     subject: "Thank you for registration!",
  //     text: `Please, confirm your email address POST http://localhost:8083/api/auth/registration_confirmation/${code}`,
  //     html: `Please, confirm your email address POST http://localhost:8083/api/auth/registration_confirmation/${code}`,
  //   };
  //   await sgMail.send(msg);
};

// const registrationConfirmation = async (code) => {
//   const verification = await Verification.findOne({
//     code,
//     active: true,
//   });

//   if (!verification) {
//     throw new NotAuthorizedError("Invalid or expired confirmation code");
//   }

//   const user = await User.findById(verification.userId);

//   if (!user) {
//     throw new NotAuthorizedError("No user found");
//   }

//   verification.active = false;
//   await verification.save();

//   user.confirmed = true;
//   await user.save();

//   const msg = {
//     to: user.email,
//     from: "ezhov.kirill98@gmail.com",
//     subject: "Thank you for registration!",
//     text: "and easy to do anywhere, even with Node.js",
//     html: "<h1>and easy to do anywhere, even with Node.js</h1>",
//   };
//   await sgMail.send(msg);
// };

// const forgotPassword = async (email) => {
//   const user = await User.findOne({ email, confirmed: true });

//   if (!user) {
//     throw new NotAuthorizedError(`No user with email '${email}' found`);
//   }

//   const password = sha256(Date.now() + process.env.JWT_SECRET);
//   user.password = password;
//   await user.save();

//   const msg = {
//     to: user.email,
//     from: "ezhov.kirill98@gmail.com",
//     subject: "Forgot password!",
//     text: `Here is your temporary password: ${password}`,
//     html: `Here is your temporary password: ${password}`,
//   };
//   await sgMail.send(msg);
// };

const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotAuthorizedError("Wrong credentials");
  }
  if (!(await bcrypt.compare(password, user.password))) {
    throw new NotAuthorizedError(`Wrong password`);
  }
  const token = jwt.sign(
    {
      _id: user._id,
      createdAt: user.createdAt,
    },
    process.env.JWT_SECRET
  );
  return token;
};

module.exports = {
  registration,
  //   registrationConfirmation,
  //   forgotPassword,
  login,
};
