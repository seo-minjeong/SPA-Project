import AbstractView from "./AbstractView.js";

export default class NotFound extends AbstractView {
  constructor() {
    super();
    this.setTitle("404 NOT FOUND");
    this.setBackLink();
  }

  async getHtml() {
    return `<h1>404 NOT FOUND 😢</h1>
            <p>요청하신 페이지를 찾을 수 없습니다.</p>
            <button id="NotFoundBtn" data-link="/">메인 페이지로 돌아가기</button>`;
  }
}
