import { Link } from "react-router-dom";

const raccourcis = [
  {
    to: "/produits",
    icon: "🛒",
    titre: "Produits",
    description: "Consultez et gérez votre catalogue de produits.",
  },
  {
    to: "/categories",
    icon: "🏷️",
    titre: "Catégories",
    description: "Organisez vos produits par famille.",
  },
  {
    to: "/fournisseurs",
    icon: "🚚",
    titre: "Fournisseurs",
    description: "Centralisez les coordonnées de vos fournisseurs.",
  },
  {
    to: "/stock",
    icon: "📦",
    titre: "Stock",
    description: "Suivez les quantités disponibles et les ruptures.",
  },
  {
    to: "/ventes",
    icon: "💰",
    titre: "Ventes",
    description: "Consultez l'historique et les performances de vente.",
  },
];

function Accueil() {
  return (
    <div className="app-container">
      <section className="hero">
        <p className="hero-eyebrow">Gestion de stock</p>
        <h1 className="hero-title">Tout votre inventaire, en un coup d'œil</h1>
        <p className="hero-subtitle">
          Suivez vos produits, catégories, fournisseurs, stock et ventes depuis
          un seul endroit.
        </p>
        <div className="hero-actions">
          <Link to="/produits" className="btn btn-primary">
            Voir les produits
          </Link>
          <Link to="/stock" className="btn btn-ghost">
            Consulter le stock
          </Link>
        </div>
      </section>

      <div className="quick-links">
        {raccourcis.map((item) => (
          <Link key={item.to} to={item.to} className="quick-link-card">
            <span className="quick-link-icon">{item.icon}</span>
            <h3 className="quick-link-title">{item.titre}</h3>
            <p className="quick-link-desc">{item.description}</p>
            <span className="quick-link-arrow">Ouvrir →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Accueil;
