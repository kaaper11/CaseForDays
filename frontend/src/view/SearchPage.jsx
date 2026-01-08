import { useState, useMemo } from "react";
import { filterItems, filterCases } from "./filterUtils";
import "./SearchPage.css";
import { useNavigate } from "react-router-dom";

/* ===== DANE TESTOWE ===== */

const items = [
  {
    id: 1,
    name: "AK-47 Redline",
    price: 120,
    rarity: "czerwony",
    type: "Skin",
    condition: "Field-Tested"
  },
  {
    id: 2,
    name: "Karambit Fade",
    price: 12000,
    rarity: "złoty",
    type: "Nóż",
    condition: "Factory New"
  },
  {
    id: 3,
    name: "AK-47 Fire Serpent",
    price: 3200,
    rarity: "czerwony",
    type: "Skin",
    condition: "Factory New"
  }
];

const cases = [
  {
    id: 1,
    name: "Prisma Case",
    price: 15,
    series: "Prisma",
    caseType: "Standardowa",
    image: "/images/prisma.jpg"
  },
  {
    id: 2,
    name: "Danger Zone Case",
    price: 20,
    series: "Danger Zone",
     caseType: "Premium",
    image: "/images/dangerzone.png"
  }
];

/* ===== KOMPONENT ===== */

const SearchPage = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("cases");

  const [filters, setFilters] = useState({
    name: "",
    type: "",
    rarity: "",
    series: "",
    condition: "",
    maxPrice: "",
    sort: ""
  });

  const results = useMemo(() => {
    return mode === "items"
      ? filterItems(items, filters)
      : filterCases(cases, filters);
  },  [
  mode,
  filters.name,
  filters.type,
  filters.rarity,
  filters.series,
  filters.condition,
  filters.maxPrice,
  filters.sort
]);
  return (
    <div className="page-wrapper">
      <div className="search-container">
        <h1 className="search-title">Wyszukaj</h1>

        <div className="panel">
          {/* ===== PRZEŁĄCZNIK ===== */}
          <div className="mode-switch">
            <button
              className={mode === "cases" ? "active" : ""}
              onClick={() => setMode("cases")}
            >
              Skrzynki
            </button>
            <button
              className={mode === "items" ? "active" : ""}
              onClick={() => setMode("items")}
            >
              Przedmioty
            </button>
          </div>

          {/* ===== FILTRY ===== */}
          <div className="form-group">
            <input
              placeholder="Nazwa"
              value={filters.name}
              onChange={e =>
                setFilters({ ...filters, name: e.target.value })
              }
            />
          </div>

          {mode === "items" && (
            <>
              <div className="form-group">
                <select
                  onChange={e =>
                    setFilters(prev => ({
  ...prev, type: e.target.value }))
                  }
                >
                  <option value="">Typ</option>
                  <option>Nóż</option>
                  <option>Skin</option>
                  <option>Naklejka</option>
                </select>
              </div>

              <div className="form-group">
                <select
                  onChange={e =>
                    setFilters(prev => ({
  ...prev, rarity: e.target.value }))
                  }
                >
                  <option value="">Rzadkość</option>
                  <option>niebieski</option>
                  <option>fioletowy</option>
                  <option>różowy</option>
                  <option>czerwony</option>
                  <option>złoty</option>
                </select>
              </div>

              <div className="form-group">
                <select
                  onChange={e =>
                    setFilters(prev => ({
  ...prev,condition: e.target.value }))
                  }
                >
                  <option value="">Stan broni</option>
                  <option value="Factory New">Fabrycznie nowy</option>
                  <option value="Minimal Wear">Minimalne zużycie</option>
                  <option value="Field-Tested">Po testach</option>
                  <option value="Well-Worn">Znacznie zużyty</option>
                  <option value="Battle-Scarred">Zniszczony</option>
                </select>
              </div>
            </>
          )}

          {mode === "cases" && (
            <div className="form-group">
              <select
                onChange={e =>
                  setFilters(prev => ({
  ...prev, series: e.target.value }))
                }
              >
                <option value="">Typ skrzynki</option>
                <option>Prisma</option>
                <option>Danger Zone</option>
              </select>
            </div>
          )}

          <div className="form-group">
            <input
              type="number"
              placeholder="Maksymalna cena"
              onChange={e =>
                setFilters(prev => ({
  ...prev, maxPrice: e.target.value }))
              }
            />
          </div>

          <div className="form-group">
            <select
              onChange={e =>
                setFilters(prev => ({
  ...prev, sort: e.target.value }))
              }
            >
              <option value="">Sortowanie</option>
              <option value="price-asc">Cena rosnąco</option>
              <option value="price-desc">Cena malejąco</option>
            </select>
          </div>

          {/* ===== WYNIKI ===== */}
          <div className="results">
            {results.length === 0 && (
              <div className="no-results">
                Brak wyników
              </div>
            )}

          {results.map(el => (
  <div
    key={el.id}
    className="result-card clickable"
    onClick={() => {
      if ("series" in el) {
        navigate(`/case/${el.id}` , { state: el });
      } else {
        navigate(`/item/${el.id}` , { state: el });
      }
    }}
  >
    <strong>{el.name}</strong>
    <div>Cena: {el.price} zł</div>
    {"rarity" in el && <div>Rzadkość: {el.rarity}</div>}
    {"type" in el && <div>Typ: {el.type}</div>}
    {"condition" in el && <div>Stan: {el.condition}</div>}
    {"series" in el && <div>Typ skrzynki: {el.series}</div>}
  </div>
))}
                
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
