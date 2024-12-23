import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../utils/supabase";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }) => {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitialSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;

        const sessionUser = data?.session?.user;
        if (sessionUser) {
          setUser(sessionUser);
          localStorage.setItem("access_token", data.session.access_token);
        } else {
          setUser(null);
          localStorage.removeItem("access_token");
        }
      } catch (error) {
        console.error("Error fetching initial session:", error.message);
        setUser(null);
        localStorage.removeItem("access_token");
      }
    };

    let isMounted = true;
    const loadSession = async () => {
      await fetchInitialSession();
      if (isMounted) setLoading(false);
    };

    loadSession();

    return () => {
      isMounted = false;
    };
  }, [setUser]);

   console.log("Current state:", user?.user_metadata);

  if (loading) {
    return <div className="text-black">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
