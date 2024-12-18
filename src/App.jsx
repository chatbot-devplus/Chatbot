import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { routes } from './routes';
import { Fragment } from 'react';
import SideBarComponent from './components/SideBarComponent';
import DefaultComponent from './components/DefaultComponent';
function App() {
  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route)=>{
            const Page = route.page
            const Layout = route.isShowSideBar?DefaultComponent :Fragment
            return (
              <Route key={route.path} path={route.path} element={
                <Layout>
                  <Page/>
                </Layout>
              }/> 
            )
          })}
          
        </Routes>
      </Router>
    </div>
  )
}

export default App
