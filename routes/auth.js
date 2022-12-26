const express = require("express");
const passport = require("passport");

const { isLoggedIn, isNotLoggedIn } = require("../middlewares/index");
const { join, login, logout } = require("../controllers/auth");

const router = express.Router();

// POST /auth/join
router.post("/join", isNotLoggedIn, join);
// POST /auth/join
router.post("/login", isNotLoggedIn, login);
// POST /auth/logout
router.get("/logout", isLoggedIn, logout);

router.get("/kakao", passport.authenticate("kakao"));
router.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    failureRedirect: "/?loginError=카카오로그인 실패",
  }),
  (req, res) => {
    // 성공
    res.redirect("/");
  }
);

module.exports = router;
