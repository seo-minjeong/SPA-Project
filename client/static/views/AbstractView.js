export default class AbstractView {
  constructor() {}
  setTitle(title) {
    document.title = title;
  }

  // 헤더 버튼
  setBackLink(newlink) {
    const backBtn = document.getElementById("HeaderBackBtn");
    if (newlink) {
      backBtn.style.visibility = "";
      backBtn.dataset.link = newlink;
    } else {
      backBtn.style.visibility = "hidden";
    }
  }

  getPostId() {
    return location.pathname.split("/")[2];
  }

  async getHtml() {
    return "";
  }
}
