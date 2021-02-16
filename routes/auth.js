let express = require("express");
let authRouter = express.Router();

/* GET signup. */
authRouter.get("/signup", function (req, res, next) {
  console.log("===================== get-signuup");
  res.render("auth/signup", { title: "HAbitRocket" });
});

/* GET login. */
authRouter.get("/login", function (req, res, next) {
  console.log("get-login");
  res.render("auth/login", { title: "HAbitRocket" });
});

/* POST login. */
authRouter.post("/login", function (req, res, next) {
  res.send("respond with a resource");
});

/* POST signup. */
authRouter.post("/signup", function (req, res, next) {
  res.send("respond with a resource");
});

module.exports = authRouter;

// // Render signup form
// // GET     /auth/signup
// authRouter.get("/signup", (req, res, next) => {
//   res.render("auth-views/signup-form");
// });

// // Handle signup form data
// // POST     /auth/signup
// authRouter.post("/signup", (req, res, next) => {
//   console.log("req.body", req.body);
//   // Check if the username and password are provided
//   const { password, username } = req.body;

//   if (username === "" || password === "") {
//     // > if username or password are not provided
//     res.render("auth-views/signup-form", {
//       errorMessage: "Please enter username and password",
//     });

//     return;
//   }

//   //   ACTIVATE POST-DEV
//   //   const passwordCheck = zxcvbn(password);
//   //   if (passwordCheck.score < 3) {
//   //     console.log("passwordCheck.feedback", passwordCheck.feedback);

//   //     res.render("auth-views/signup-form", {
//   //       errorMessage: passwordCheck.feedback.warning,
//   //       suggestions: passwordCheck.feedback.suggestions,
//   //     });

//   //     return;
//   //   }

//   //   Check if the username is taken
//   User.findOne({ username })
//     .then((user) => {
//       // > if username is taken, display error message
//       if (user !== null) {
//         res.render("auth-views/signup-form", {
//           errorMessage: "There was an error, try again",
//         });

//         return;
//       }

//       // > if username is available, hash the password
//       const salt = bcrypt.genSaltSync(saltRounds);
//       const hashedPassword = bcrypt.hashSync(password, salt);

//       // > Create new user in DB
//       // User.create( { username: username, password: hashedPassword } )
//       User.create({ username, password: hashedPassword })
//         .then((createdUser) => {
//           res.redirect("/");
//         })
//         .catch((err) => {
//           console.log(err);
//           res.render("auth-views/signup-form", {
//             errorMessage: "There was an error, please try again!",
//           });
//         });

//       // > Redirect the user
//     })
//     .catch((err) => console.log(err));
// });

// // =====================================================
// // =====================================================
// // LOGIN
// // =====================================================
// // =====================================================

// // Render login form
// // GET    /auth/login
// authRouter.get("/login", (req, res, next) => {
//   res.render("auth-views/login-form");
// });

// // Handle login form data
// // POST     /auth/login
// authRouter.post("/login", (req, res, next) => {
//   // Check if the username and password are provided
//   const { username, password } = req.body;

//   if (username === "" || password === "") {
//     // > if username or password are not provided
//     res.render("auth-views/login-form", {
//       errorMessage: "Please enter username and password",
//     });

//     return;
//   }

//   // Check if the username and user exists
//   User.findOne({ username })
//     .then((user) => {
//       // > if user doesn't exist, show an error
//       if (!user) {
//         res.render("auth-views/login-form", {
//           errorMessage: "Indicate username and password",
//         });

//         return;
//       }

//       // > else if user exists Check the password if correct
//       const passwordCorrect = bcrypt.compareSync(password, user.password);

//       // > if password is correct Create the session (successful login)
//       if (passwordCorrect) {
//         console.log("login succeful");
//         console.log(req.session);
//         req.session.currentUser = user;
//         res.redirect("/");
//       } else {
//         // > else if password is incorrect, show an error
//         res.render("auth-views/login-form", {
//           errorMessage: "Indicate username and password",
//         });
//       }
//     })
//     .catch((err) => console.log(err));
// });

// // Destroys the existing session
// // GET     /auth/logout
// authRouter.get("/logout", (req, res, next) => {
//   req.session.destroy(function (err) {
//     if (err) {
//       next(err);
//     } else {
//       console.log("logging out");
//       res.redirect("/");
//     }
//   });
// });
