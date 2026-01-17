import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../cases.css";

const EventCasePage = () => {
    const [cases, setCases] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCases = async () => {
            try {
                const res = await axios.get("http://localhost:5000/cases/all");
                setCases(res.data || []);
            } catch (err) {
                console.error("Błąd pobierania skrzynek:", err);
            }
        };
        fetchCases();
    }, []);

    const premiumCases = cases.filter(c => c.type === "Premium");
    const eventCases = cases.filter(c => c.type === "Eventowa");

    const groupedEvents = eventCases.reduce((acc, c) => {
        if (!acc[c.event]) acc[c.event] = [];
        acc[c.event].push(c);
        return acc;
    }, {});

    const getImage = img =>
        img?.startsWith("/") ? img : `/${img}`;

    return (
        <div className="cases-page">

            {premiumCases.length > 0 && (
                <section className="cases-section">
                    <h1 className="page-title">Skrzynki premium</h1>

                    <div className="cases-grid">
                        {premiumCases.map(c => (
                            <div
                                key={c.id}
                                className="case-card premium"
                                onClick={() => navigate(`/cases/${c.id}`)}
                            >
                                <img src={getImage(c.image)} alt={c.name} />
                                <h3>{c.name}</h3>
                                <p>Cena: {c.price} zł</p>
                                <p>Bonus: {c.bonus}%</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {eventCases.length > 0 && (
                <h1 className="page-title event-title-main">
                    Skrzynki eventowe
                </h1>
            )}

            {Object.entries(groupedEvents).map(([eventName, cases]) => (
                <section key={eventName} className="cases-section">
                    <h2 className="event-title">{eventName}</h2>

                    <div className="cases-grid">
                        {cases.map(c => (
                            <div
                                key={c.id}
                                className="case-card event"
                                onClick={() => navigate(`/cases/${c.id}`)}
                            >
                                <img src={getImage(c.image)} alt={c.name} />
                                <h3>{c.name}</h3>
                                <p>Cena: {c.price} zł</p>
                            </div>
                        ))}
                    </div>
                </section>
            ))}

        </div>
    );
};

export default EventCasePage;
