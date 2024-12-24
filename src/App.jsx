import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Sidebar from './components/sidebar/Sidebar'
import { AuthProvider } from './contexts/AuthContext'
import { routes } from './routes'

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page

            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  route.protected ? (
                    <ProtectedRoute>
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        {route.isShowSideBar && <Sidebar />}
                        <Page />
                      </div>
                    </ProtectedRoute>
                  ) : (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      {route.isShowSideBar && <Sidebar />}
                      <Page />
                    </div>
                  )
                }
              />
            )
          })}
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
