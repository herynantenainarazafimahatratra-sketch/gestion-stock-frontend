import { useState } from "react";
import ListeProduits from "./ListeProduits";
import FormulaireProduit from "./FormulaireProduit";

function ProduitsPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleProduitCree = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div>
      <FormulaireProduit onProduitCree={handleProduitCree} />
      <hr />
      <ListeProduits refreshKey={refreshKey} />
    </div>
  );
}

export default ProduitsPage;
