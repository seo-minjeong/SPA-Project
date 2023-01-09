import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Dashboard");
  }

  async getHtml() {
    return `
          <section class="post_section">
            <button type="button" class="random_btn">랜덤 이미지 추가하기</button>
            <input type="text" class="title_input" placeholder="글 제목을 작성해주세요."/>
            <textarea class="content_area" placeholder="글 내용을 작성해주세요."></textarea>
            <button type="button" class="add_btn">글 작성하기</button>
          </section>
        `;
  }
}
