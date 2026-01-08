import { useLocation } from "react-router-dom";

export default function ItemDetails() {
  const location = useLocation();
  const data = location.state;

  if (!data) {
    return (
      <div style={{ padding: 20 }}>
        Brak danych przedmiotu (wejdź z listy wyszukiwania)
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>{data.name}</h1>
      <p>Cena: {data.price} zł</p>
      <p>Typ: {data.type}</p>
      <p>Stan: {data.condition}</p>
    </div>
  );
}
