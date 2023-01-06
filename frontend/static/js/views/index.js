const router = async () => {
  const routes = [
    // path는 url 의 끝 주소, view 는 렌더링할 페이지
    // 현재는 페이지가 없으므로 임시로 console.log를 찍어 잘 불러오는 지 확인
    { path: "/", view: () => console.log("Viewing Dashboard") },
  ];

  // location.pathname 은 기본 url 뒤에 붙는 주소
  // 주소와 일치하면 isMatch 를 true 로 바꿔준다.
  const potentialMatches = routes.map((route) => {
    return {
      route,
      isMatch: route.path === location.pathname,
    };
  });
};

// 돔이 로딩될 때 router 함수를 실행
document.addEventListener("DOMContentLoaded", () => {
  router();
});
