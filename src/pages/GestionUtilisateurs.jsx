import { useState, useEffect } from "react";
import { creerUtilisateur } from "../services/authService";
import { getBeneficeParMois } from "../services/venteService";

function GestionUtilisateurs() {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    motDePasse: "",
    role: "VENDEUR",
  });
  const [erreur, setErreur] = useState(null);
  const [succes, setSucces] = useState(null);
  const [enCours, setEnCours] = useState(false);

  const [benefices, setBenefices] = useState([]);
  const [chargementBenefices, setChargementBenefices] = useState(true);
  const [erreurBenefices, setErreurBenefices] = useState(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset volontaire du chargement à chaque refetch
    setChargementBenefices(true);
    setErreurBenefices(null);
    getBeneficeParMois()
      .then((data) => {
        setBenefices(data);
        setChargementBenefices(false);
      })
      .catch((err) => {
        console.error(err);
        setErreurBenefices("Impossible de charger les bénéfices.");
        setChargementBenefices(false);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErreur(null);
    setSucces(null);
    setEnCours(true);

    try {
      await creerUtilisateur(
        formData.nom,
        formData.email,
        formData.motDePasse,
        formData.role,
      );
      setSucces(`Compte créé pour ${formData.nom} (${formData.role}).`);
      setFormData({ nom: "", email: "", motDePasse: "", role: "VENDEUR" });
    } catch (err) {
      setErreur("Erreur lors de la création du compte (email déjà utilisé ?).");
      console.error(err);
    } finally {
      setEnCours(false);
    }
  };

  return (
    <div>
      <div className="card">
        <h2 className="card-title">Créer un compte employé</h2>

        {erreur && (
          <div className="form-error" role="alert">
            {erreur}
          </div>
        )}
        {succes && <div className="form-success">{succes}</div>}

        <form onSubmit={handleSubmit} className="form-grid">
          <div className="form-field">
            <label htmlFor="user-nom">Nom</label>
            <input
              id="user-nom"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              required
              disabled={enCours}
            />
          </div>

          <div className="form-field">
            <label htmlFor="user-email">Email</label>
            <input
              id="user-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={enCours}
            />
          </div>

          <div className="form-field">
            <label htmlFor="user-password">Mot de passe</label>
            <input
              id="user-password"
              type="password"
              name="motDePasse"
              value={formData.motDePasse}
              onChange={handleChange}
              required
              disabled={enCours}
            />
          </div>

          <div className="form-field">
            <label htmlFor="user-role">Rôle</label>
            <select
              id="user-role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              disabled={enCours}
            >
              <option value="VENDEUR">Vendeur</option>
              <option value="GESTIONNAIRE">Gestionnaire</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={enCours}
            >
              {enCours ? "Création..." : "Créer le compte"}
            </button>
          </div>
        </form>
      </div>

      <div className="card">
        <h2 className="card-title">Bénéfices par mois</h2>

        {chargementBenefices && (
          <div className="loading-state">
            <span className="spinner" />
            Chargement...
          </div>
        )}

        {!chargementBenefices && erreurBenefices && (
          <div className="form-error" role="alert">
            {erreurBenefices}
          </div>
        )}

        {!chargementBenefices && !erreurBenefices && benefices.length === 0 && (
          <p className="empty-state">
            Aucune vente enregistrée pour l'instant.
          </p>
        )}

        {!chargementBenefices && !erreurBenefices && benefices.length > 0 && (
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Mois</th>
                  <th>Chiffre d'affaires</th>
                  <th>Coût</th>
                  <th>Bénéfice</th>
                </tr>
              </thead>
              <tbody>
                {benefices.map((b) => (
                  <tr key={b.mois}>
                    <td>{b.mois}</td>
                    <td>{b.chiffreAffaires} Ar</td>
                    <td>{b.cout} Ar</td>
                    <td>
                      <span
                        className={`badge ${
                          b.benefice >= 0 ? "badge-success" : "badge-danger"
                        }`}
                      >
                        {b.benefice} Ar
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default GestionUtilisateurs;
