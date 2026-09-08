import { useState, useEffect } from "react";
import { createProduit } from "../services/produitService";
import { getCategories } from "../services/categorieService";

function FormulaireProduit({ onProduitCree }) {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    reference: "",
    nom: "",
    prixAchat: "",
    prixVente: "",
    quantiteStock: "",
    seuilAlerte: "",
    categorieId: "",
  });
  const [erreur, setErreur] = useState(null);
  const [succes, setSucces] = useState(false);

  useEffect(() => {
    getCategories().then(setCategories).catch(console.error);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErreur(null);
    setSucces(false);

    try {
      await createProduit({
        reference: formData.reference,
        nom: formData.nom,
        prixAchat: parseFloat(formData.prixAchat),
        prixVente: parseFloat(formData.prixVente),
        quantiteStock: parseInt(formData.quantiteStock, 10),
        seuilAlerte: parseInt(formData.seuilAlerte, 10),
        categorie: { id: parseInt(formData.categorieId, 10) },
      });

      setFormData({
        reference: "",
        nom: "",
        prixAchat: "",
        prixVente: "",
        quantiteStock: "",
        seuilAlerte: "",
        categorieId: "",
      });
      setSucces(true);

      if (onProduitCree) onProduitCree();
    } catch (err) {
      setErreur("Erreur lors de la création du produit.");
      console.error(err);
    }
  };

  return (
    <div className="card">
      <h2 className="card-title">Ajouter un produit</h2>

      <form onSubmit={handleSubmit} className="form-grid">
        {erreur && <p className="form-error">{erreur}</p>}
        {succes && <p className="form-success">Produit créé avec succès.</p>}

        <div className="form-field">
          <label htmlFor="reference">Référence</label>
          <input
            id="reference"
            name="reference"
            value={formData.reference}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="nom">Nom</label>
          <input
            id="nom"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field span-2">
          <label htmlFor="categorieId">Catégorie</label>
          <select
            id="categorieId"
            name="categorieId"
            value={formData.categorieId}
            onChange={handleChange}
            required
          >
            <option value="">-- Choisir --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nom}
              </option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="prixAchat">Prix d'achat</label>
          <input
            id="prixAchat"
            type="number"
            step="0.01"
            name="prixAchat"
            value={formData.prixAchat}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="prixVente">Prix de vente</label>
          <input
            id="prixVente"
            type="number"
            step="0.01"
            name="prixVente"
            value={formData.prixVente}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="quantiteStock">Quantité en stock</label>
          <input
            id="quantiteStock"
            type="number"
            name="quantiteStock"
            value={formData.quantiteStock}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="seuilAlerte">Seuil d'alerte</label>
          <input
            id="seuilAlerte"
            type="number"
            name="seuilAlerte"
            value={formData.seuilAlerte}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Créer le produit
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormulaireProduit;
