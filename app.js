const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");
const session = require("express-session");
const nunjucks = require("nunjucks");
const dotenv = require("dotenv").config();
const passport = require("passport");

const authRouter = require("./routes/auth");
const indexRouter = require("./routes");
const v1Router = require("./routes/v1");
const v2Router = require("./routes/v2");

const { sequelize } = require("./models");
const passportConfig = require("./passport");

const app = express();
passportConfig(); //패스포트 설정
app.set("port", process.env.PORT || 8002);
app.set("view engine", "html");
nunjucks.configure("views", { express: app, watch: true });
sequelize
  .sync({ force: false }) // force : true면 node시작 시 전체 테이블 삭제 후 재생성ㅎ마
  .then(() => {})
  .catch((err) => {
    console.error(err);
  });

// 로그 모듈
app.use(morgan("dev"));
// 파일 경로 모듈 /test/img.png 로 요청 시 /public/test/img.png 경로로 추적
app.use(express.static(path.join(__dirname, "public")));
// json 형식 해석
app.use(express.json());
// x-www-form-urlencoded 형식 해석
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRouter);
app.use("/", indexRouter);
app.use("/v1", v1Router);
app.use("/v2", v2Router);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

app.listen(app.get("port"), () => {});
