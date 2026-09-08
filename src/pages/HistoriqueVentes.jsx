import { useState, useEffect } from "react";
import { getVentes } from "../services/venteService";

function HistoriqueVentes({ refreshKey }) {
  const [ventes, setVentes] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    setChargement(true);
    setErreur(null);
    getVentes()
      .then((data) => {
        setVentes(data);
        setChargement(false);
      })
      .catch((err) => {
        console.error(err);
        setErreur("Impossible de charger l'historique des ventes.");
        setChargement(false);
      });
  }, [refreshKey]);

  return (
    <div className="card">
      <h2 className="card-title">Historique des ventes</h2>

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

      {!chargement && !erreur && ventes.length === 0 && (
        <p className="empty-state">Aucune vente enregistrée.</p>
      )}

      {!chargement && !erreur && ventes.length > 0 && (
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Nb. articles</th>
                <th>Montant total</th>
              </tr>
            </thead>
            <tbody>
              {ventes.map((v) => (
                <tr key={v.id}>
                  <td>{new Date(v.dateVente).toLocaleString()}</td>
                  <td>{v.lignes?.length ?? 0}</td>
                  <td>{v.montantTotal} Ar</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default HistoriqueVentes;
