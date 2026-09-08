import { useState, useEffect } from "react";
import { getProduits } from "../services/produitService";
import { entreeStock, sortieStock } from "../services/stockService";

function FormulaireMouvementStock({ onMouvementCree }) {
  const [produits, setProduits] = useState([]);
  const [produitId, setProduitId] = useState("");
  const [quantite, setQuantite] = useState("");
  const [type, setType] = useState("ENTREE");
  const [erreur, setErreur] = useState(null);
  const [succes, setSucces] = useState(null);
  const [enCours, setEnCours] = useState(false);

  useEffect(() => {
    getProduits().then(setProduits).catch(console.error);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErreur(null);
    setSucces(null);
    setEnCours(true);

    try {
      if (type === "ENTREE") {
        await entreeStock(parseInt(produitId, 10), parseInt(quantite, 10));
      } else {
        await sortieStock(parseInt(produitId, 10), parseInt(quantite, 10));
      }
      setSucces("Mouvement enregistré avec succès.");
      setProduitId("");
      setQuantite("");
      if (onMouvementCree) onMouvementCree();
    } catch (err) {
      // Le backend renvoie un message clair si le stock est insuffisant
      const message =
        err.response?.data?.message ||
        "Erreur lors de l'enregistrement du mouvement.";
      setErreur(message);
      console.error(err);
    } finally {
      setEnCours(false);
    }
  };

  return (
    <div className="card">
      <h2 className="card-title">Enregistrer un mouvement de stock</h2>

      {erreur && (
        <div className="form-error" role="alert">
          {erreur}
        </div>
      )}
      {succes && <div className="form-success">{succes}</div>}

      <form onSubmit={handleSubmit} className="form-grid">
        <div className="form-field">
          <label htmlFor="mvt-type">Type</label>
          <select
            id="mvt-type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            disabled={enCours}
          >
            <option value="ENTREE">Entrée (réception)</option>
            <option value="SORTIE">Sortie (vente manuelle)</option>
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="mvt-quantite">Quantité</label>
          <input
            id="mvt-quantite"
            type="number"
            min="1"
            value={quantite}
            onChange={(e) => setQuantite(e.target.value)}
            required
            disabled={enCours}
          />
        </div>

        <div className="form-field span-2">
          <label htmlFor="mvt-produit">Produit</label>
          <select
            id="mvt-produit"
            value={produitId}
            onChange={(e) => setProduitId(e.target.value)}
            required
            disabled={enCours}
          >
            <option value="">-- Choisir --</option>
            {produits.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nom} (stock actuel : {p.quantiteStock})
              </option>
            ))}
          </select>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={enCours}>
            {enCours ? "Enregistrement..." : "Enregistrer"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormulaireMouvementStock;
