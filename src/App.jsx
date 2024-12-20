import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <div style={{ backgroundColor: "#ffffff" }}>
        <Router>
          <Routes>
            {routes.map((route) => {
              const Page = route.page;

              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    route.protected ? (
                      <ProtectedRoute>
                        <Page />
                      </ProtectedRoute>
                    ) : (
                      <Page />
                    )
                  }
                />
              );
            })}
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
