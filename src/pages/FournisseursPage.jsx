import { useState } from "react";
import ListeFournisseurs from "./ListeFournisseurs";
import FormulaireFournisseur from "./FormulaireFournisseur";

function FournisseursPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div>
      <FormulaireFournisseur
        onFournisseurCree={() => setRefreshKey((k) => k + 1)}
      />
      <hr />
      <ListeFournisseurs refreshKey={refreshKey} />
    </div>
  );
}

export default FournisseursPage;
