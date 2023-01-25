import AbstractView from "./AbstractView.js";

const BASE_URL = "http://43.201.103.199";
let POSTID = null;

export default class Show extends AbstractView {
  constructor() {
    super();
    this.setTitle("HPNY 2023 - Post");
    this.setBackLink("/");
    POSTID = this.getPostId();
  }

  async alertDelete() {
    const res = await fetch(BASE_URL + "/post/" + POSTID, {
      method: "DELETE",
    });
    const data = await res.json();
  }

  async executeDelete() {
    const AlertMessage = document.getElementById("ShowAlert");
    await this.deletePost();
    AlertMessage.style.display = "none";
  }

  async getPost() {
    const res = await fetch(BASE_URL + "/post/" + POSTID);
    const data = await res.json();
    const postdata = data.data;
    return postdata;
  }

  async deletePost() {
    const res = await fetch(BASE_URL + "/post/" + POSTID, {
      method: "DELETE",
    });
    const data = await res.json();
  }

  async addComment() {
    const content = document
      .getElementById("ShowWrite")
      .getElementsByTagName("input")[0].value;
    const res = await fetch(BASE_URL + "/comment/" + POSTID, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: content,
      }),
    });
    const data = await res.json();

    const newcomment = document.createElement("div");
    newcomment.setAttribute("id", "ShowComment");
    newcomment.setAttribute("class", "comment_list");
    newcomment.innerHTML = `
        <div id="ShowCommentItem" class="comment">
          ${data.data.content}
        </div>
        <button id="ShowCommentDeleteBtn" data-key=${data.data.commentId} data-link="/show/${POSTID}" class="comment_del_btn">삭제</button>
        `;
    const wrapper = document.getElementById("ShowCommentWrapper");
    wrapper.appendChild(newcomment);

    const blank = document.getElementById("ShowWriteContent");
    blank.value = null;
  }

  async deleteComment(COMMENTID) {
    const res = await fetch(BASE_URL + "/comment/" + COMMENTID, {
      method: "DELETE",
    });
    const data = await res.json();

    const remove = document.querySelector(`[data-key="${COMMENTID}"]`);
    remove.parentNode.style.display = "none";
  }

  async getHtml() {
    const postdata = await this.getPost();
    const post = postdata.post;
    const comments = postdata.comments;

    return `
        <section id="Show" class="detail_section">
            <div id="ShowImage" class="random_img">
                <img src="${post.image}" alt="랜덤 이미지">
            </div>
            <div class="title_line">
                <strong id="ShowTitle" class="title">${post.title}</strong>
                <p>작성: ${post.createdAt.substr(
                  0,
                  10
                )} ${post.createdAt.substr(
      11,
      5
    )} | 수정: ${post.updatedAt.substr(0, 10)} ${post.updatedAt.substr(
      11,
      5
    )}<br/><br/>
                </p>
            </div>
            <p class="content">${post.content}</p>
            <div id="ShowBtns" class="btn_wrap">
                <button id="ShowEditBtn" class="edit_btn" data-link="/edit/${POSTID}">수정</button>
                <button id="ShowDeleteBtn" class="del_btn" data-link ="/">삭제</button>
            </div>
            <ul id="ShowCommentWrapper" class="comment_list_area">
            ${comments
              .map(
                (elm) => `
                <li id="ShowComment" class="comment_list">
                    <p id="ShowCommentItem" class="comment">${elm.content}</p>
                    <button id="ShowCommentDeleteBtn" data-key=${elm.commentId} class="comment_del_btn">삭제</button>
                </li>
              `
              )
              .join("")}
            </ul>
            <div id="ShowWrite" class="comment_area">
                <input type="text" id="ShowWriteContent" class="comment_input" placeholder="댓글을 작성해주세요."/>
                <button id="ShowWriteBtn" class="comment_add_btn">게시</button>
            </div>
        </section>
    `;
  }
}
