const express = require("express");
const router = express.Router(); // 라우터 메소드 할당
router.use(logger);

router.get("/", (req, res) => {
  res.render("index");
});

var axios = require("axios");

var config = {
  method: "get",
  url: "http://43.201.103.199/posts",
  headers: {},
};

axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });

router
  .route("/posts")
  .get((req, res) => {
    res.render("posts/index", {
      title: "제몱",
      content: "Express",
    });
  })
  .post((req, res) => {
    const title = req.body.title;
    const content = req.body.content;

    posts.push({ title: title, content: content });
    res.redirect(`/posts/${posts.length - 1}`);
    console.log("post");
  });

router.get("/posts/new", (req, res) => {
  res.render("posts/new");
});

// 글보기/삭제/추가
router
  .route("/posts/:id")
  .get((req, res) => {
    const select = req.params.id;
    const title = posts[select].title;
    const content = posts[select].content;

    // res.send(`Get 게시글 ID ${select} ${content}`);
    res.render("posts/view", {
      title: title,
      content: content,
    });
  })
  .put((req, res) => {
    const id = posts.length - 1;

    res.render("posts/view");
  })
  .delete((req, res) => {
    console.log(req.user, "얍2");
    res.render("posts/view");
  });

const posts = [
  { id: 0, title: "안녕", content: "내용1" },
  { id: 1, title: "하이", content: "내용2" },
  { id: 2, title: "헬로우", content: "내용3" },
  { id: 3, title: "헬로우", content: "내용4" },
];

router.param("id", (req, res, next, id) => {
  req.posts = posts[id];
  next();
});

function logger(req, res, next) {
  console.log(req.originalUrl);

  console.log(req.baseUrl, "베이스");
  next();
}

// 글 수정
router.get("/edit/:id", (req, res) => {
  // DB에서 게시글 불러오기
  req.params.id = parseInt(req.params.id);
  db.collection("post").findOne({ _id: req.params.id }, (err, result) => {
    res.render("edit.ejs", { edit: result });
  });
});

module.exports = router;
