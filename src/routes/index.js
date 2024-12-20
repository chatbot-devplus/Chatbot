import Login from "../pages/Login";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";

export const routes = [
  {
    path: "/login",
    isShowSideBar: false,
    page: Login,
    protected: false,
  },
  {
    path: "/",
    page: Home,
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