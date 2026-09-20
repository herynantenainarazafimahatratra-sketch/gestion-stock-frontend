import { useState, useEffect } from "react";
import { getProduits, deleteProduit } from "../services/produitService";

function ListeProduits({ refreshKey }) {
  const [produits, setProduits] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);
  const [suppressionId, setSuppressionId] = useState(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset volontaire du chargement à chaque refetch
    setChargement(true);
    setErreur(null);
    getProduits()
      .then((data) => {
        setProduits(data);
        setChargement(false);
      })
      .catch((err) => {
        setErreur(
          "Impossible de charger les produits. Vérifie que le backend tourne.",
        );
        setChargement(false);
        console.error(err);
      });
  }, [refreshKey]);

  const handleSupprimer = async (produit) => {
    if (!window.confirm(`Supprimer le produit "${produit.nom}" ?`)) return;

    setErreur(null);
    setSuppressionId(produit.id);
    try {
      await deleteProduit(produit.id);
      setProduits((prev) => prev.filter((p) => p.id !== produit.id));
    } catch (err) {
      setErreur("Impossible de supprimer ce produit.");
      console.error(err);
    } finally {
      setSuppressionId(null);
    }
  };

  return (
    <div className="card">
      <h2 className="card-title">Liste des produits</h2>

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

      {!chargement && produits.length === 0 && (
        <p className="empty-state">Aucun produit enregistré.</p>
      )}

      {!chargement && produits.length > 0 && (
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Référence</th>
                <th>Nom</th>
                <th>Catégorie</th>
                <th>Prix vente</th>
                <th>Stock</th>
                <th className="col-actions"></th>
              </tr>
            </thead>
            <tbody>
              {produits.map((produit) => {
                const enAlerte = produit.quantiteStock <= produit.seuilAlerte;
                return (
                  <tr key={produit.id}>
                    <td>{produit.reference}</td>
                    <td>{produit.nom}</td>
                    <td>{produit.categorie?.nom ?? "—"}</td>
                    <td>{produit.prixVente}</td>
                    <td>
                      <span
                        className={`badge ${
                          enAlerte ? "badge-danger" : "badge-success"
                        }`}
                      >
                        {produit.quantiteStock}
                        {enAlerte ? " · alerte" : ""}
                      </span>
                    </td>
                    <td className="col-actions">
                      <button
                        type="button"
                        className="btn btn-danger"
                        disabled={suppressionId === produit.id}
                        onClick={() => handleSupprimer(produit)}
                      >
                        {suppressionId === produit.id ? "..." : "Supprimer"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ListeProduits;
