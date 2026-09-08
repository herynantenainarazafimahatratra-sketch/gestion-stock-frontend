import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import RouteProtegee from "./components/RouteProtegee";
import Accueil from "./pages/Accueil";
import Login from "./pages/Login";
import ProduitsPage from "./pages/ProduitsPage";
import CategoriesPage from "./pages/CategoriesPage";
import FournisseursPage from "./pages/FournisseursPage";
import StockPage from "./pages/StockPage";
import VentesPage from "./pages/VentesPage";
import GestionUtilisateurs from "./pages/GestionUtilisateurs";

function NotFound() {
  return (
    <div className="not-found">
      <p className="not-found-code">404</p>
      <h2 className="not-found-title">Page introuvable</h2>
      <p className="not-found-text">
        La page que vous cherchez n'existe pas ou a été déplacée.
      </p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        {/* En-tête */}
        <header className="app-header">
          <div className="app-header-inner">
            <div className="app-logo">📦</div>
            <h1 className="app-header-title">
              Gestion de Stock <span>— Boutique</span>
            </h1>
          </div>
          <Navigation />
        </header>

        {/* Contenu principal */}
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/login" element={<Login />} />

            <Route
              path="/produits"
              element={
                <RouteProtegee>
                  <ProduitsPage />
                </RouteProtegee>
              }
            />
            <Route
              path="/utilisateurs"
              element={
                <RouteProtegee roleRequis="ADMIN">
                  <GestionUtilisateurs />
                </RouteProtegee>
              }
            />
            <Route
              path="/categories"
              element={
                <RouteProtegee>
                  <CategoriesPage />
                </RouteProtegee>
              }
            />
            <Route
              path="/fournisseurs"
              element={
                <RouteProtegee>
                  <FournisseursPage />
                </RouteProtegee>
              }
            />
            <Route
              path="/stock"
              element={
                <RouteProtegee>
                  <StockPage />
                </RouteProtegee>
              }
            />
            <Route
              path="/ventes"
              element={
                <RouteProtegee>
                  <VentesPage />
                </RouteProtegee>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* Pied de page */}
        <footer className="app-footer">
          <p>© {new Date().getFullYear()} Gestion de Stock — Boutique</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
