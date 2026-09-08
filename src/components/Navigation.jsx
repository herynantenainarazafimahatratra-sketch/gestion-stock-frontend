import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navigation() {
  const linkClass = ({ isActive }) => (isActive ? "active" : undefined);
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <nav className="main-nav">
      <div className="nav-inner">
        {/* Liens de navigation */}
        <div className="nav-links">
          <NavLink to="/" end className={linkClass}>
            Accueil
          </NavLink>
          <NavLink to="/produits" className={linkClass}>
            Produits
          </NavLink>
          <NavLink to="/categories" className={linkClass}>
            Catégories
          </NavLink>
          <NavLink to="/stock" className={linkClass}>
            Stock
          </NavLink>
          <NavLink to="/ventes" className={linkClass}>
            Ventes
          </NavLink>
          <NavLink to="/fournisseurs" className={linkClass}>
            Fournisseurs
          </NavLink>
          {user?.role === "ADMIN" && (
            <NavLink to="/utilisateurs" className={linkClass}>
              Utilisateurs
            </NavLink>
          )}
        </div>

        {/* Zone utilisateur */}
        <div className="nav-user">
          {user ? (
            <div className="nav-user-summary">
              <span>
                Connecté : <span className="nav-user-name">{user.nom}</span>{" "}
                <span className="nav-role-badge">{user.role}</span>
              </span>
              <button onClick={handleLogout} className="btn-logout">
                Déconnexion
              </button>
            </div>
          ) : (
            <NavLink to="/login" className="nav-connexion">
              Connexion
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
