// express 서버 만들기
const express = require("express");
const path = require("path");

const app = express();

// 정적 (static) 구조 세팅 frontend 의 static 폴더
app.use(
  "/static",
  express.static(path.resolve(__dirname, "frontend", "static"))
);

// response > frontend 의 index.html
app.get("/*", (req, res) => {
  res.sendFile(path.resolve("frontend", "index.html"));
});

// 서버 실행
app.listen(process.env.PORT || 3000, () => console.log("Server running ... "));
