import { useState } from "react";
import FormulaireVente from "./FormulaireVente";
import HistoriqueVentes from "./HistoriqueVentes";

function VentesPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div>
      <FormulaireVente onVenteCreee={() => setRefreshKey((k) => k + 1)} />
      <hr />
      <HistoriqueVentes refreshKey={refreshKey} />
    </div>
  );
}

export default VentesPage;
