const express = require("express");
const axios = require("axios");
const router = express.Router(); // 라우터 메소드 할당
const url = "http://43.201.103.199/posts";
router.use(logger);
// https://any-ting.tistory.com/14
// https://thoughtful-arch-8c2.notion.site/VanillaJS-SPA-826e63925d7c4e2e8d27d7f03fef4371
// https://velog.io/@nick2866/node.js%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C-%EA%B2%8C%EC%8B%9C%ED%8C%90-%EC%83%9D%EC%84%B1
// https://reflectoring.io/tutorial-guide-axios/
router
  .route("/")
  .get(async (req, res) => {
    axios({
      method: "get",
      url: url,
    }).then((apiResponse) => {
      const posts = apiResponse.data.data.posts;
      // res.json(posts);
      res.render("index", { posts: posts });
    });
  })
  .post(async (req, res) => {
    let req_data = {
      image: req.body.image,
      title: req.body.title,
      content: req.body.content,
      // createdAt:
      // updatedAt
    };

    axios({
      method: "post",
      url: url,
      data: req_data,
    }).then((apiResponse) => {
      const posts = apiResponse.data.data.posts;
      res.json(posts);
      // res.render("posts/index", {posts: posts});
    });

    // res.redirect(`/posts/${posts.length - 1}`);
    // posts.push(req_data);
  });

router.get("/posts/new", (req, res) => {
  res.render("posts/new");
});

// 글보기/삭제/추가
// router.get("/posts/:postId", (req, res) => {
//   res.send("안농");
// });

// 글 상세페이지 조회
router.get("/posts/:postId", (req, res) => {
  const postId = req.params.postId;

  axios.get(`http://43.201.103.199/post/${postId}`).then((apiResponse) => {
    const selectedData = apiResponse.data.data;
    // res.json(selectedData);
    res.render("posts/view", { item: selectedData });
  });
});


// 댓글 작성하기
// router.post("/comment/:postId", (req, res) => {
//   const postId = req.params.postId;

//   axios.get(`http://43.201.103.199/comment/${postId}`).then((apiResponse) => {
//     const selectedData = apiResponse.data.data;
//     // res.json(selectedData);
//     res.render("posts/view", { item: selectedData });
//   });
// });

// const delBtn = document.querySelector(".comment_del_btn");

// delBtn.addEventListener("click", () => {
//   post("/delete", (req, res) => {
//     if (CheckAuth(req, res)) {
//       req.database.query(
//         `DELETE FROM post WHERE id = ${req.params.commentId};`,
//         (err) => {
//           if (err) throw err;
//           res.status(200).redirect("/");
//         }
//       );
//     }
//   });
// });

// 새롭게 추가한 삭제 버튼 이벤트 핸들러
// $(".del_btn").click(function (e) {
//   delete ("/posts/:id",
//   (req, res) => {
//     res.send(`delete 게시글 삭제 ${req.params.id}`);
//   });
// });

// router
//   .route("/posts/:postId")
//   .get(async (req, res) => {
//     const postId = req.params.postId;

//     const apiResponse = await axios.get(`http://43.201.103.199/post/`, {
//       params: {
//         postId: postId,
//       },
//     });
//     const product = apiResponse.data.data.post;
//     res.send("안농");
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

//
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

// const posts = [
//   {id: 0, title: "제목1", content: "내용1"},
//   {id: 1, title: "제목2", content: "내용2"},
//   {id: 2, title: "제목3", content: "내용3"},
//   {id: 3, title: "제목4", content: "내용4"},
// ];

router.param("posts", (req, res, next, posts) => {
  req.posts = posts[posts];
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
