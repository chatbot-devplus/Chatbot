import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { routes } from './routes';
function App() {
  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route)=>{
            const Page = route.page
            
            return (
              <Route key={route.path} path={route.path} element={
                // <Layout>
                  <Page/>
                // </Layout>
              }/> 
            )
          })}
          
        </Routes>
      </Router>
    </div>
  )
}

export default App
