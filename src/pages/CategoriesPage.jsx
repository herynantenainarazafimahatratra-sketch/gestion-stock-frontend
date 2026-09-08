import { useState } from "react";
import ListeCategories from "./ListeCategories";
import FormulaireCategorie from "./FormulaireCategorie";

function CategoriesPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div>
      <FormulaireCategorie
        onCategorieCree={() => setRefreshKey((k) => k + 1)}
      />
      <hr />
      <ListeCategories refreshKey={refreshKey} />
    </div>
  );
}

export default CategoriesPage;
