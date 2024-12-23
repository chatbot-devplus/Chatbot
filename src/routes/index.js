import Login from "../components/login/LoginComponent";
import NotFound from "../components/notfound/NotFound";
import Main from "../components/main/Main";

export const routes = [
  {
    path: "/login",
    isShowSideBar: false,
    page: Login,
    protected: false,
  },
  {
    path: "/",
    page: Main,
    isShowSideBar: true,
    // chỉ định route này cần login mới vào được
    protected: true,
  },
  {
    path: "*",
    isShowSideBar: false,
    page: NotFound,
  },
];