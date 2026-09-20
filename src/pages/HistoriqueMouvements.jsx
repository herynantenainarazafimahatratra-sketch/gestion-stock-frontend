import { useState, useEffect } from "react";
import { getMouvements } from "../services/stockService";

function HistoriqueMouvements({ refreshKey }) {
  const [mouvements, setMouvements] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset volontaire du chargement à chaque refetch
    setChargement(true);
    setErreur(null);
    getMouvements()
      .then((data) => {
        setMouvements(data);
        setChargement(false);
      })
      .catch((err) => {
        console.error(err);
        setErreur("Impossible de charger l'historique des mouvements.");
        setChargement(false);
      });
  }, [refreshKey]);

  return (
    <div className="card">
      <h2 className="card-title">Historique des mouvements</h2>

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

      {!chargement && !erreur && mouvements.length === 0 && (
        <p className="empty-state">Aucun mouvement enregistré.</p>
      )}

      {!chargement && !erreur && mouvements.length > 0 && (
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Produit</th>
                <th>Quantité</th>
              </tr>
            </thead>
            <tbody>
              {mouvements.map((m) => (
                <tr key={m.id}>
                  <td>{new Date(m.dateMouvement).toLocaleString()}</td>
                  <td>
                    <span
                      className={`badge ${
                        m.type === "ENTREE" ? "badge-success" : "badge-warning"
                      }`}
                    >
                      {m.type}
                    </span>
                  </td>
                  <td>{m.produit?.nom ?? "—"}</td>
                  <td>{m.quantite}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default HistoriqueMouvements;
