import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Dashboard");
  }

  async getHtml() {
    return `
          <div class="dashboard_section">
            <a href="/posts" class="nav_link post_btn" data-link>게시물 작성하기</a>
            <ul class="main_content">
                <li class="post">
                    <div class="post_img">
                        <img src="https://images.unsplash.com/photo-1672588159308-3c2c111884b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzOTU0MDd8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzMwNjY1MzA&ixlib=rb-4.0.3&q=80&w=400" alt="랜덤 이미지">
                    </div>
                    <div>
                        <strong class="title">2023 화이팅</strong>
                        <p class="content">화이팅입니다요</p>
                    </div>
                </li>
            </ul>
          </div>
        `;
  }
}
