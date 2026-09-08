import { useState, useEffect } from "react";
import {
  getFournisseurs,
  deleteFournisseur,
} from "../services/fournisseurService";

function ListeFournisseurs({ refreshKey }) {
  const [fournisseurs, setFournisseurs] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);
  const [suppressionId, setSuppressionId] = useState(null);

  useEffect(() => {
    setChargement(true);
    setErreur(null);
    getFournisseurs()
      .then((data) => {
        setFournisseurs(data);
        setChargement(false);
      })
      .catch((err) => {
        console.error(err);
        setErreur("Impossible de charger les fournisseurs.");
        setChargement(false);
      });
  }, [refreshKey]);

  const handleSupprimer = async (f) => {
    if (!window.confirm(`Supprimer le fournisseur "${f.nom}" ?`)) return;

    setErreur(null);
    setSuppressionId(f.id);
    try {
      await deleteFournisseur(f.id);
      setFournisseurs((prev) => prev.filter((item) => item.id !== f.id));
    } catch (err) {
      setErreur("Impossible de supprimer ce fournisseur.");
      console.error(err);
    } finally {
      setSuppressionId(null);
    }
  };

  return (
    <div className="card">
      <h2 className="card-title">Fournisseurs</h2>

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

      {!chargement && !erreur && fournisseurs.length === 0 && (
        <p className="empty-state">Aucun fournisseur enregistré.</p>
      )}

      {!chargement && fournisseurs.length > 0 && (
        <ul className="simple-list">
          {fournisseurs.map((f) => (
            <li key={f.id} className="simple-list-item">
              <div className="simple-list-item-info">
                <span className="simple-list-item-title">{f.nom}</span>
                {f.contact && (
                  <span className="simple-list-item-sub">{f.contact}</span>
                )}
              </div>
              <div className="simple-list-item-actions">
                <button
                  type="button"
                  className="btn btn-danger"
                  disabled={suppressionId === f.id}
                  onClick={() => handleSupprimer(f)}
                >
                  {suppressionId === f.id ? "..." : "Supprimer"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ListeFournisseurs;
