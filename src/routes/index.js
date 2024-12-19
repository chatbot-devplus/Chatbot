import Login from "../components/login/LoginComponent";
import NotFound from "../components/notfound/NotFound";
import Main from "../components/main/Main";

export const routes =[
    {
        path:'/login',
        isShowSideBar: false,
        page: Login ,
    },
    {
        path:'/',
        page: Main,
        isShowSideBar: true,
    },
    {
        path:'*',
        isShowSideBar: false,     
        page: NotFound,
    },
    
]