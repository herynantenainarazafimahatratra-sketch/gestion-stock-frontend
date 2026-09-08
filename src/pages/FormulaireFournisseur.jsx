import { useState } from "react";
import { createFournisseur } from "../services/fournisseurService";

function FormulaireFournisseur({ onFournisseurCree }) {
  const [formData, setFormData] = useState({
    nom: "",
    contact: "",
    adresse: "",
  });
  const [erreur, setErreur] = useState(null);
  const [enCours, setEnCours] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErreur(null);

    if (!formData.nom.trim()) {
      setErreur("Le nom du fournisseur est requis.");
      return;
    }

    setEnCours(true);
    try {
      await createFournisseur(formData);
      setFormData({ nom: "", contact: "", adresse: "" });
      if (onFournisseurCree) onFournisseurCree();
    } catch (err) {
      setErreur("Erreur lors de la création du fournisseur.");
      console.error(err);
    } finally {
      setEnCours(false);
    }
  };

  return (
    <div className="card">
      <h2 className="card-title">Ajouter un fournisseur</h2>

      {erreur && (
        <div className="form-error" role="alert">
          {erreur}
        </div>
      )}

      <form onSubmit={handleSubmit} className="form-grid">
        <div className="form-field">
          <label htmlFor="fournisseur-nom">Nom</label>
          <input
            id="fournisseur-nom"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            placeholder="Ex. : Hery"
            required
            disabled={enCours}
          />
        </div>

        <div className="form-field">
          <label htmlFor="fournisseur-contact">Contact</label>
          <input
            id="fournisseur-contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="téléphone"
            disabled={enCours}
          />
        </div>

        <div className="form-field span-2">
          <label htmlFor="fournisseur-adresse">Adresse</label>
          <input
            id="fournisseur-adresse"
            name="adresse"
            value={formData.adresse}
            onChange={handleChange}
            placeholder="Adresse"
            disabled={enCours}
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={enCours}>
            {enCours ? "Création..." : "Créer"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormulaireFournisseur;
