import { useLocation } from "react-router-dom";

export default function CaseDetails() {
  const location = useLocation();
  const data = location.state;

  if (!data) {
    return (
      <div style={{ padding: 20 }}>
        Brak danych skrzynki (wejdź z listy wyszukiwania)
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>{data.name}</h1>
      <p>Cena: {data.price} zł</p>
      <p>Typ skrzynki: {data.series}</p>
    </div>
  );
}
