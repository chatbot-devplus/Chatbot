import Login from "../pages/Login";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";

export const routes =[
    {
        path:'/login',
        isShowSideBar: false,
        page: Login ,
    },
    {
        path:'/',
        page: Home,
        isShowSideBar: true,
    },
    {
        path:'*',
        isShowSideBar: false,     
        page: NotFound,
    },
    
]