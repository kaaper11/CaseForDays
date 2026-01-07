import { useState, useMemo, useEffect } from "react";
import { filterItems, filterCases } from "./filterUtils";
import "../SearchPage.css";
import axios from "axios";

const SearchPage = () => {
  const [mode, setMode] = useState("cases");
  const token = sessionStorage.getItem("token");

  const [items, setItems] = useState([]);
  const [cases, setCases] = useState([]);

  const fetchCases = async () => {
    try {
      const res = await axios.get(
          "http://localhost:5000/cases/all",
          {
            headers: { Authorization: `Bearer ${token}` }
          }
      );
      setCases(res.data);
    } catch (err) {
      console.error(err);
      console.log("Nie udało się pobrać skrzynek");
    }
  };

  const allItems = async () => {
    try {
      if (token) {
        const res = await axios.get(
            "http://localhost:5000/items/allitems",
            {
              headers: { Authorization: `Bearer ${token}` }
            }
        );
        setItems(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    allItems();
    fetchCases();
  }, []);

  const [filters, setFilters] = useState({
    name: "",
    type: "",
    rarity: "",
    series: "",
    stan: "",
    maxPrice: "",
    sort: ""
  });

  const results = useMemo(() => {
    return mode === "items"
        ? filterItems(items, filters)
        : filterCases(cases, filters);
  }, [
    mode,
    items,
    cases,
    filters.name,
    filters.type,
    filters.rarity,
    filters.series,
    filters.stan,
    filters.maxPrice,
    filters.sort
  ]);

  return (
      <div className="page-wrapper">
        <div className="search-container">
          <h1 className="search-title">Wyszukaj</h1>

          <div className="panel">

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
                        value={filters.type}
                        onChange={e =>
                            setFilters(prev => ({ ...prev, type: e.target.value }))
                        }
                    >
                      <option value="">Typ</option>
                      <option value="Nóż">Nóż</option>
                      <option value="Skin">Skin</option>
                      <option value="Naklejka">Naklejka</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <select
                        value={filters.rarity}
                        onChange={e =>
                            setFilters(prev => ({ ...prev, rarity: e.target.value }))
                        }
                    >
                      <option value="">Rzadkość</option>
                      <option value="niebieski">niebieski</option>
                      <option value="fioletowy">fioletowy</option>
                      <option value="różowy">różowy</option>
                      <option value="czerwony">czerwony</option>
                      <option value="złoty">złoty</option>
                    </select>
                  </div>

                  {/*<div className="form-group">*/}
                  {/*  <select*/}
                  {/*      value={filters.stan}*/}
                  {/*      onChange={e =>*/}
                  {/*          setFilters(prev => ({ ...prev, stan: e.target.value }))*/}
                  {/*      }*/}
                  {/*  >*/}
                  {/*    <option value="">Stan broni</option>*/}
                  {/*    <option value="Factory New">Fabrycznie nowy</option>*/}
                  {/*    <option value="Minimal Wear">Minimalne zużycie</option>*/}
                  {/*    <option value="Field-Tested">Po testach</option>*/}
                  {/*    <option value="Well-Worn">Znacznie zużyty</option>*/}
                  {/*    <option value="Battle-Scarred">Zniszczony</option>*/}
                  {/*  </select>*/}
                  {/*</div>*/}
                </>
            )}

            {/*{mode === "cases" && (*/}
            {/*    <div className="form-group">*/}
            {/*      <select*/}
            {/*          onChange={e =>*/}
            {/*              setFilters(prev => ({*/}
            {/*                ...prev, type: e.target.value*/}
            {/*              }))*/}
            {/*          }*/}
            {/*      >*/}
            {/*        <option value="">Typ skrzynki</option>*/}
            {/*        <option value="Standardowa">Standardowa</option>*/}
            {/*        <option value="Premium">Premium</option>*/}
            {/*        <option value="Eventowa">Eventowa</option>*/}
            {/*      </select>*/}
            {/*    </div>*/}
            {/*)}*/}


            <div className="form-group">
              <input
                  type="number"
                  placeholder="Maksymalna cena"
                  value={filters.maxPrice}
                  onChange={e =>
                      setFilters(prev => ({ ...prev, maxPrice: e.target.value }))
                  }
              />
            </div>

            <div className="form-group">
              <select
                  value={filters.sort}
                  onChange={e =>
                      setFilters(prev => ({ ...prev, sort: e.target.value }))
                  }
              >
                <option value="">Sortowanie</option>
                <option value="price-asc">Cena rosnąco</option>
                <option value="price-desc">Cena malejąco</option>
              </select>
            </div>

            <div className="results">
              {results.length === 0 && (
                  <div className="no-results">Brak wyników</div>
              )}

              {results.map(el => (
                  <div key={el.id} className="result-card">
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
