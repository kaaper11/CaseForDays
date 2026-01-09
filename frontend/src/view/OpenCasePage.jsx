import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ItemDetails() {
    const location = useLocation();
    const data = location.state;
    const token = sessionStorage.getItem("token");
    const { id } = useParams();
    const [item, setItem] = useState(null);

    const oneSkin = async () => {
        try {
            if (token) {
                const response = await axios.get(
                    `http://localhost:5000/items/oneitem/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setItem(response.data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        oneSkin();
    }, []);

    if (!data || !item) {
        return (
            <div className="flex items-center justify-center min-h-screen text-gray-400">
                Brak danych przedmiotu (wejdź z listy wyszukiwania)
            </div>
        );
    }

    return (
        <div className="  p-10 flex justify-center ">
            <div className="max-w-4xl w-full border-3 border-cyan-800 rounded-2xl shadow-2xl overflow-hidden">

                <div className="grid md:grid-cols-2 gap-6 p-6">

                    {/* IMAGE */}
                    <div className="flex justify-center items-center">
                        <img
                            src={`/${item.image.split("\\").pop()}`}
                            alt={item.name}
                            className="rounded-xl max-h-80 object-contain hover:scale-105 transition-transform duration-300"
                        />
                    </div>

                    {/* DETAILS */}
                    <div className="text-gray-200 space-y-4">
                        <h1 className="text-3xl font-bold text-white">
                            {item.weaponType} {item.name}
                        </h1>

                        <div className="flex gap-4 text-sm">
              <span className="bg-indigo-600 px-3 py-1 rounded-full">
                {item.type}
              </span>
                            <span className="bg-purple-600 px-3 py-1 rounded-full">
                {item.rarity}
              </span>
                        </div>

                        <p className="text-2xl font-semibold text-green-400">
                            Wartość: {item.cena} V-dolców
                        </p>

                        <div>
                            <h2 className="text-lg font-semibold mb-1">Opis:</h2>
                            <p className="text-gray-300 leading-relaxed">
                                {item.opis}
                            </p>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
}
