import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Dashboard");
  }

  async getHtml() {
    return `
          <section class="detail_section">
            <p>뭐없음</p>
          </section>
        `;
  }
}
