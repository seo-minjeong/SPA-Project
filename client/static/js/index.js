import List from "../views/List.js";
import Edit from "../views/Edit.js";

// router
const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};

const router = async () => {
  const routes = [
    { path: /^\/$/, view: List },
    { path: /^\/edit\/?[0-9]*$/, view: Edit },
  ];

  const potentialMatches = routes.map((route) => {
    return {
      route: route,
      isMatch: route.path.test(location.pathname),
    };
  });

  let match = potentialMatches.find((potentialMatch) => potentialMatch.isMatch);

  if (!match) {
    match = {
      route: { path: "404-not-found", view: NotFound },
      isMatch: true,
    };
  }

  const view = new match.route.view();
  document.querySelector("#App").innerHTML = await view.getHtml();
};

// Events
window.addEventListener("popstate", router);

const edit = new Edit();

document.addEventListener("DOMContentLoaded", () => {
  router();

  document.body.addEventListener("click", async (e) => {
    if (e.target.id === "EditAddBtn") {
      if (edit.getPostId()) await edit.editPost();
      else await edit.addPost();
    }
    if (e.target.id === "EditImageChange") {
      edit.getImage("clicked");
    }

    if (e.target.id === "ShowDeleteBtn") show.alertDelete(null);
    else if (e.target.id === "ShowCommentDeleteBtn")
      show.deleteComment(e.target.getAttribute("data-key"));
    else if (e.target.id === "ShowAlertDeleteBtn") await show.executeDelete();
    else if (e.target.id === "ShowAlertCancleBtn") show.cancleDelete();
    else if (e.target.id === "ShowWriteBtn") show.addComment();

    if (e.target.matches("[data-link]")) {
      navigateTo(e.target.dataset.link);
    }
  });
});
