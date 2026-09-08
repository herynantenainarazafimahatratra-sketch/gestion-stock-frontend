import { useState } from "react";
import { createCategorie } from "../services/categorieService";

function FormulaireCategorie({ onCategorieCree }) {
  const [nom, setNom] = useState("");
  const [erreur, setErreur] = useState(null);
  const [enCours, setEnCours] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErreur(null);

    if (!nom.trim()) {
      setErreur("Le nom de la catégorie est requis.");
      return;
    }

    setEnCours(true);
    try {
      await createCategorie({ nom: nom.trim() });
      setNom("");
      if (onCategorieCree) onCategorieCree();
    } catch (err) {
      setErreur("Erreur lors de la création de la catégorie.");
      console.error(err);
    } finally {
      setEnCours(false);
    }
  };

  return (
    <div className="card">
      <h2 className="card-title">Ajouter une catégorie</h2>

      {erreur && (
        <div className="form-error" role="alert">
          {erreur}
        </div>
      )}

      <form onSubmit={handleSubmit} className="form-grid">
        <div className="form-field span-2">
          <label htmlFor="nom-categorie">Nom de la catégorie</label>
          <input
            id="nom-categorie"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            placeholder="Ex. : Électronique"
            required
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

export default FormulaireCategorie;
