import { useState, useEffect } from "react";
import { getProduits } from "../services/produitService";
import { createVente } from "../services/venteService";

function FormulaireVente({ onVenteCreee }) {
  const [produits, setProduits] = useState([]);
  const [produitId, setProduitId] = useState("");
  const [quantite, setQuantite] = useState("");
  const [lignes, setLignes] = useState([]); // panier temporaire
  const [erreur, setErreur] = useState(null);
  const [succes, setSucces] = useState(null);
  const [enCours, setEnCours] = useState(false);

  useEffect(() => {
    getProduits().then(setProduits).catch(console.error);
  }, []);

  const ajouterLigne = (e) => {
    e.preventDefault();
    if (!produitId || !quantite) return;

    const produit = produits.find((p) => p.id === parseInt(produitId, 10));
    setLignes([
      ...lignes,
      {
        produitId: produit.id,
        nom: produit.nom,
        quantite: parseInt(quantite, 10),
        prixUnitaire: produit.prixVente,
      },
    ]);
    setProduitId("");
    setQuantite("");
  };

  const supprimerLigne = (index) => {
    setLignes(lignes.filter((_, i) => i !== index));
  };

  const total = lignes.reduce((sum, l) => sum + l.quantite * l.prixUnitaire, 0);

  const validerVente = async () => {
    setErreur(null);
    setSucces(null);

    if (lignes.length === 0) {
      setErreur("Ajoute au moins un produit avant de valider.");
      return;
    }

    setEnCours(true);
    try {
      const payload = lignes.map((l) => ({
        produitId: l.produitId,
        quantite: l.quantite,
      }));
      await createVente(payload);
      setSucces("Vente enregistrée avec succès.");
      setLignes([]);
      if (onVenteCreee) onVenteCreee();
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Erreur lors de la vente (stock insuffisant ?).";
      setErreur(message);
      console.error(err);
    } finally {
      setEnCours(false);
    }
  };

  return (
    <div className="card">
      <h2 className="card-title">Nouvelle vente</h2>

      {erreur && (
        <div className="form-error" role="alert">
          {erreur}
        </div>
      )}
      {succes && <div className="form-success">{succes}</div>}

      <form onSubmit={ajouterLigne} className="inline-form">
        <select
          value={produitId}
          onChange={(e) => setProduitId(e.target.value)}
        >
          <option value="">-- Choisir un produit --</option>
          {produits.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nom} — {p.prixVente} Ar (stock : {p.quantiteStock})
            </option>
          ))}
        </select>

        <input
          type="number"
          min="1"
          placeholder="Quantité"
          value={quantite}
          onChange={(e) => setQuantite(e.target.value)}
        />

        <button type="submit" className="btn btn-secondary">
          + Ajouter au panier
        </button>
      </form>

      <h3 className="section-subtitle">Panier</h3>

      {lignes.length === 0 && <p className="empty-state">Panier vide.</p>}

      {lignes.length > 0 && (
        <>
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Produit</th>
                  <th>Quantité</th>
                  <th>Prix unitaire</th>
                  <th>Sous-total</th>
                  <th className="col-actions"></th>
                </tr>
              </thead>
              <tbody>
                {lignes.map((l, index) => (
                  <tr key={index}>
                    <td>{l.nom}</td>
                    <td>{l.quantite}</td>
                    <td>{l.prixUnitaire} Ar</td>
                    <td>{l.quantite * l.prixUnitaire} Ar</td>
                    <td className="col-actions">
                      <button
                        onClick={() => supprimerLigne(index)}
                        className="btn btn-danger"
                        type="button"
                      >
                        Retirer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="cart-total">
            Total : <strong>{total} Ar</strong>
          </div>
        </>
      )}

      <button
        onClick={validerVente}
        className="btn btn-primary"
        disabled={lignes.length === 0 || enCours}
      >
        {enCours ? "Validation..." : "Valider la vente"}
      </button>
    </div>
  );
}

export default FormulaireVente;
