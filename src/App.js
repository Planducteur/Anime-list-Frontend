import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import Nav from "./components/Navigation/Nav";
import Home from "./pages/Home";
import Login from "./pages/Login";
import FavouriteAnime from "./pages/FavouriteAnime";
import { NextUIProvider } from "@nextui-org/react";

/**
 * Custom route guard that redirects to the login page if the user is not authenticated.
 */
const AuthGuard = ({ children }) => {
  const token = localStorage.getItem("token");
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    // Récupérez le token JWT stocké dans le navigateur (à partir des cookies, du localStorage, etc.)
    const token = localStorage.getItem('token'); // Vous devrez adapter ceci à votre méthode de stockage
    
    // Effectuez une requête vers le serveur Symfony pour vérifier le token
    fetch('https://127.0.0.1:8000/api/check-token', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => {
      if (response.ok) {
          setIsAuthenticated(true);
        } else {
          // Le token n'est pas valide, vous pouvez supprimer le token côté client ici
          localStorage.removeItem('token');
          setIsAuthenticated(false);
          <Navigate to="/" />
        }
      })
      .catch(error => {
        console.error('Erreur lors de la vérification du token :', error);
        setIsAuthenticated(false);
      });
  }, []);
  if (!token && location.pathname == "/home") {
    return <Navigate to="/" />;
  }

  return children;
};

function App() {
  return (
    <NextUIProvider>
      <main className="dark text-foreground bg-content1">
        <Routes>
          {/* Route to login page */}
          <Route path="/" element={<Login />} />

          {/* Protected routes */}
          <Route
            path="/home"
            element={
              <AuthGuard>
                <Nav />
                <Outlet />
              </AuthGuard>
            }
          >
            <Route index element={<Home />} />
            <Route path="/home/favourite-anime" element={<FavouriteAnime />} />
            {/* Add other child routes of "/home" as needed */}
          </Route>

          {/* Catch-all route for non-existent routes */}
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </main>
    </NextUIProvider>
  );
}

export default App;
