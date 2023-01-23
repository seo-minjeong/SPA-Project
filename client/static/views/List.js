import AbstractView from "./AbstractView.js";

const BASE_URL = "http://43.201.103.199";

export default class List extends AbstractView {
  constructor() {
    super();
    this.setTitle("HPNY 2023");
    this.setBackLink();
  }

  async getList() {
    const res = await fetch(BASE_URL + "/posts");
    const data = await res.json();
    const list = data.data.posts;

    list.sort((a, b) => {
      if (a.postId > b.postId) return -1;
      if (a.postId < b.postId) return 1;
      return 0;
    });
    return list;
  }

  async getHtml() {
    const list = await this.getList();
    return `
    <div id="List" class="dashboard_section">
        <button id="ListAddBtn" class="nav_link post_btn" data-link="/edit">새 글 작성하기</button>
        <ul class="main_content">
        ${list
          .map(
            (elm, key) =>
              `
                <li class="post" data-link="/show/${elm.postId}">
                    <div class="post_img">
                        <img src=${elm.image} alt="랜덤 이미지" loading=${
                key > 3 ? "lazy" : "eager"
              }>
                    </div>
                    <div class="text_wrap">
                        <strong class="title">
                            ${elm.title}
                        </strong>
                        <p class="content">
                            ${elm.content}
                        </p>
                    </div>
                </li>
            `
          )
          .join("")}
        </ul>
    </div>`;
  }
}
