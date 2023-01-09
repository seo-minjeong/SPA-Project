const express = require("express");
const axios = require("axios");
const router = express.Router(); // 라우터 메소드 할당
const url = "http://43.201.103.199/posts";
router.use(logger);

async function axiosExample() {
  const response = await axios.get("http://43.201.103.199/posts");
  const { data } = response;
}

router.get("/", async (req, res) => {
  axios({
    method: "get",
    url: url,
  }).then((apiResponse) => {
    const posts = apiResponse.data.data.posts;
    res.render("index", { posts: posts });
  });
});

router.get("/posts/new", (req, res) => {
  res.render("posts/new");
});

// 글보기/삭제/추가
// router
//   .route("/posts/:id")
//   .get(async (req, res) => {
//     const postId = req.params.postId;

//     const apiResponse = await axios.get(url, {
//       params: {
//         postId: postId,
//       },
//     });
//     const product = apiResponse.data.data.posts;
//     response.json(product);
//     // res.render(
//     //   "posts/view",
//     //   {
//     //     title: title,
//     //     content: content,
//     //   },
//     //   console.log(req.body)
//     // );
//   })
//   .put((req, res) => {
//     let id = posts.length - 1;
//     res.render("posts/view");
//   })
//   .delete((req, res) => {
//     console.log(req.user, "얍2");
//     res.render("posts/view");
//   });

// router
//   .route("/posts/:id")
//   .get((req, res) => {
//     let select = req.params.id;
//     let title = posts[select].title;
//     let content = posts[select].content;

//     res.render(
//       "posts/view",
//       {
//         title: title,
//         content: content,
//       },
//       console.log(req.body)
//     );
//   })
//   .put((req, res) => {
//     let id = posts.length - 1;

//     res.render("posts/view");
//   })
//   .delete((req, res) => {
//     console.log(req.user, "얍2");
//     res.render("posts/view");
//   });

const posts = [
  { id: 0, title: "제목1", content: "내용1" },
  { id: 1, title: "제목2", content: "내용2" },
  { id: 2, title: "제목3", content: "내용3" },
  { id: 3, title: "제목4", content: "내용4" },
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

// 결과값 가져오기
// router.post("/posts/add", (req, res) => {
//   let title = req.body.title;
//   let content = req.body.content;
//   res.send(`id : ${title}, pw : ${content}`);
// });

// res.send(`Get 게시글 ID ${select} ${content}`);

// 글보기/삭제/추가 나열
// router.get("/posts/:id", (req, res) => {
//   res.send(`get 게시글${req.params.id}`);
// });
// router.put("/posts/:id", (req, res) => {
//   res.send(`update  게시글${req.params.id}`);
// });
// router.delete("/posts/:id", (req, res) => {
//   res.send(`delete 게시글 삭제 ${req.params.id}`);
// });

module.exports = router;
