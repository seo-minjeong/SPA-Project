import AbstractView from "./AbstractView.js";

const UNSPLASH_URL =
  "https://api.unsplash.com/photos/random?client_id=eqYyvjr-ziiTM28CnPklAKC2OGO9z-vYnzOycwr5VaE";
const BASE_URL = "http://43.201.103.199";
let POSTID = null;
let IMAGEURL = "";
let title = "";
let content = "";

export default class Edit extends AbstractView {
  constructor() {
    super();
    this.setTitle("HPNY 2023 - New Post");
    title = "";
    content = "";
    POSTID = this.getPostId();
    if (POSTID) this.setBackLink(`/show/${POSTID}`);
    else this.setBackLink("/");
  }

  // 랜덤 이미지 출력
  async getImage(clicked) {
    const res = await fetch(UNSPLASH_URL);
    const data = await res.json();
    const pic = data.urls.raw;
    IMAGEURL = pic;
    // 이미지 클릭 시 이미지 다시 받아오게 처리
    if (clicked) {
      const imgdiv = document.getElementById("EditImage");
      imgdiv.innerHTML = `<img id="EditImageChange" src=${IMAGEURL}>`;
    }
  }

  // 포스트 데이터 가져오기
  async getPost() {
    const res = await fetch(BASE_URL + "/post/" + POSTID);
    const data = await res.json();
    const postdata = data.data;
    IMAGEURL = postdata.post.image;
    title = postdata.post.title;
    content = postdata.post.content;
  }

  // 포스트 수정하기
  async editPost() {
    const editTitle = document
      .getElementById("EditTitle")
      .getElementsByTagName("input")[0].value;

    const editContent = document
      .getElementById("EditContent")
      .getElementsByTagName("textarea")[0].value;

    const res = await fetch(BASE_URL + "/post/" + POSTID, {
      method: "PATCH",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        title: editTitle,
        content: editContent,
      }),
    });
    const data = await res.json();
  }

  // 포스트 추가하기
  async addPost() {
    const title = document
      .getElementById("EditTitle")
      .getElementsByTagName("input")[0].value;
    const content = document
      .getElementById("EditContent")
      .getElementsByTagName("textarea")[0].value;
    const image = document
      .getElementById("EditImage")
      .getElementsByTagName("img")[0].src;

    const res = await fetch(BASE_URL + "/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        content: content,
        image: image,
      }),
    });

    const data = await res.json();
  }

  async getHtml() {
    if (POSTID) {
      await this.getPost();
    } else {
      await this.getImage();
    }

    return `
        <div class="post_section" id="Edit">
            <div id="EditImage" class="random_img">
                <img id="EditImageChange" src=${IMAGEURL}></img>
            </div>
            <div class="input_wrap" id="EditTitle">
                <label for="title">제목</label>
                <input type="text" class="title_input" value="${title}" minlength="1" maxlength="30" placeholder="글 제목을 입력해주세요"
                    value="" required>
            </div>
            <div class="input_wrap" id="EditContent">
                <label for="content">내용</label>
                <textarea class="content_area" cols="30" rows="10" placeholder="글 내용을 입력해주세요" required>${content}</textarea>
            </div>
            <button type="submit" id="EditAddBtn" class="submit-button add_btn" data-link="/" >등록하기</button>
        </div>
      `;
  }
}
