import { useState } from "react";
import FormulaireMouvementStock from "./FormulaireMouvementStock";
import HistoriqueMouvements from "./HistoriqueMouvements";

function StockPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div>
      <FormulaireMouvementStock
        onMouvementCree={() => setRefreshKey((k) => k + 1)}
      />
      <HistoriqueMouvements refreshKey={refreshKey} />
    </div>
  );
}

export default StockPage;
