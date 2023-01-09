const express = require("express");
const app = express();
const PORT = 3000;
const Router = require("./router");

app.use(express.static("public")); // 미들웨어 내장모듈기능. 지정된 디렉토리(public)에서 이미지, CSS 파일 및 JavaScript 파일을 제공.
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // 전송받은 데이터를 json으로 받겠다는 설정

app.set("view engine", "ejs"); // ejs 선언

app.use("/", Router);
// Router.get("/", (req, res) => {
//   res.locals.title = "Node Chat";
//   res.render("index");
// });

app.all("*", (req, res) => {
  res.status(404).send("PAGE NOT FOUND");
});

app.listen(PORT);
