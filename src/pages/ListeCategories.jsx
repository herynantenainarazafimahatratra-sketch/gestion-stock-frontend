import { useState, useEffect } from "react";
import { getCategories, deleteCategorie } from "../services/categorieService";

function ListeCategories({ refreshKey }) {
  const [categories, setCategories] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);
  const [suppressionId, setSuppressionId] = useState(null);

  useEffect(() => {
    setChargement(true);
    setErreur(null);
    getCategories()
      .then((data) => {
        setCategories(data);
        setChargement(false);
      })
      .catch((err) => {
        console.error(err);
        setErreur("Impossible de charger les catégories.");
        setChargement(false);
      });
  }, [refreshKey]);

  const handleSupprimer = async (cat) => {
    if (!window.confirm(`Supprimer la catégorie "${cat.nom}" ?`)) return;

    setErreur(null);
    setSuppressionId(cat.id);
    try {
      await deleteCategorie(cat.id);
      setCategories((prev) => prev.filter((c) => c.id !== cat.id));
    } catch (err) {
      setErreur(
        "Impossible de supprimer cette catégorie (elle est peut-être utilisée par des produits).",
      );
      console.error(err);
    } finally {
      setSuppressionId(null);
    }
  };

  return (
    <div className="card">
      <h2 className="card-title">Catégories</h2>

      {chargement && (
        <div className="loading-state">
          <span className="spinner" />
          Chargement...
        </div>
      )}

      {!chargement && erreur && (
        <div className="form-error" role="alert">
          {erreur}
        </div>
      )}

      {!chargement && !erreur && categories.length === 0 && (
        <p className="empty-state">Aucune catégorie enregistrée.</p>
      )}

      {!chargement && categories.length > 0 && (
        <ul className="simple-list">
          {categories.map((cat) => (
            <li key={cat.id} className="simple-list-item">
              <div className="simple-list-item-info">
                <span>{cat.nom}</span>
              </div>
              <div className="simple-list-item-actions">
                <button
                  type="button"
                  className="btn btn-danger"
                  disabled={suppressionId === cat.id}
                  onClick={() => handleSupprimer(cat)}
                >
                  {suppressionId === cat.id ? "..." : "Supprimer"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ListeCategories;
