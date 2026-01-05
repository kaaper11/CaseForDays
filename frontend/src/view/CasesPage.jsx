import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CasesPage = () => {
    const [cases, setCases] = useState([]);
    const [error, setError] = useState("");

    const token = sessionStorage.getItem("token");

    useEffect(() => {
        const fetchCases = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:5000/cases/all",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setCases(res.data);
            } catch (err) {
                console.error(err);
                setError("Nie udało się pobrać skrzynek");
            }
        };

        fetchCases();
    }, []);

    return (
        <div className="flex flex-col items-center py-10">
            <h1 className="text-4xl font-bold mb-10">
                Dostępne skrzynki
            </h1>

            {error && (
                <p className="text-red-500 mb-5">
                    {error}
                </p>
            )}

            <div className="grid grid-cols-4 gap-8">
                {cases.map((c) => (
                    <Link
                        key={c._id}
                        to={`/cases/${c._id}`}
                        className="w-64 p-5 border-3 border-cyan-800 rounded-lg shadow-xl flex flex-col items-center gap-4 cursor-pointer hover:scale-105 hover:shadow-2xl transition"
                    >
                        <img
                            src={`http://localhost:5000/uploads/${c.image}`}
                            alt={c.name}
                            className="w-40 h-40 object-cover"
                        />

                        <h2 className="text-xl font-bold text-white">
                            {c.name}
                        </h2>

                        <p className="text-white">
                            Typ: {c.type}
                        </p>

                        <p className="text-white font-bold">
                            Cena: {c.price} zł
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CasesPage;
