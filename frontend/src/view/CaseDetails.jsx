import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CaseDetails() {
    const location = useLocation();
    const data = location.state;
    const [casei, setCasei] = useState(null);
    const [items, setItems] = useState([]);
    const REEL_REPEAT = 10;

    const { id } = useParams();
    const token = sessionStorage.getItem("token");

    useEffect(() => {
        const fetchCase = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:5000/cases/onecase/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log(res.data);
                setCasei(res.data);

                const initialReel = Array(REEL_REPEAT)
                    .fill(res.data.items)
                    .flat();
                setItems(initialReel);

            } catch (err) {
                console.log(err);
            }
        };

        fetchCase();
    }, []);

    if (!data || !casei) {
        return (
            <div className="flex items-center justify-center min-h-screen text-gray-400">
                Brak danych skrzynki (wejdź z listy wyszukiwania)
            </div>
        );
    }

    return (
        <div className="min-h-screen  py-10">

            {/* HEADER */}
            <div className="max-w-6xl mx-auto mb-10 text-center">
                <h1 className="text-4xl font-extrabold text-white mb-2">
                    {casei.name}
                </h1>
                <p className="text-gray-400">
                    Typ skrzynki: <span className="text-indigo-500">{casei.type}</span>
                </p>
            </div>

            {/* CASE INFO */}
            <div className="max-w-6xl mx-auto border-3 border-cyan-800 rounded-2xl shadow-xl p-6 mb-12 grid md:grid-cols-2 gap-8">

                <div className="flex justify-center items-center">
                    <img
                        src={`/${casei.image?.split("\\").pop()}`}
                        alt={casei.name}
                        className="max-h-72 object-contain rounded-xl hover:scale-105 transition-transform duration-300"
                    />
                </div>

                <div className="text-gray-200 flex flex-col justify-center space-y-4">
                    <p className="text-2xl font-semibold text-green-400">
                        {casei.price} zł
                    </p>

                </div>
            </div>

            <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold text-white mb-6">
                    Możliwe przedmioty
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {casei.items.map((item, index) => (
                        <div
                            key={`${item.id}-${index}`}
                            className="border-3 border-cyan-800 rounded-xl p-4 text-center hover:scale-105 transition-transform shadow-lg"
                        >
                            <img
                                src={`/${item.image?.split("\\").pop()}`}
                                alt={item.name}
                                className="h-28 mx-auto object-contain mb-3"
                            />
                            <p className="text-sm text-gray-200 font-medium">
                                {item.name}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
