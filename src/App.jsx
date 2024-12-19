import Main from "./components/main/Main"
import Sidebar from "./components/sidebar/Sidebar"
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { routes } from './routes';
const App = () => {
  return (
    <>
      <Router>
        <Routes>
          {routes.map((route)=>{
            const Page = route.page
            
            return (
              <Route key={route.path} path={route.path} element={
                <div style={{display:'flex',justifyContent:'center'}}>
                    {route.isShowSideBar && <Sidebar />}
                    <Page />
                  </div>
                
              }/> 
            )
          })}
          
        </Routes>
      </Router>
      {/* <Sidebar/>
      <Main/> */}
    </>
  )
}

export default App