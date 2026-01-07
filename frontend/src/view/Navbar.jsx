import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Navbar = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    const fetchUser = async () => {
        try {
            const token = sessionStorage.getItem("token");
            if (!token) return;

            const response = await axios.get(
                "http://localhost:5000/users/user",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setUser(response.data);
        } catch (err) {
            console.log("Nie zalogowany lub token wygasł");
            setUser(null);
            setError(err.response?.data?.message);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []); // OK – token jest w storage

    return (
        <nav className="flex justify-between bg-cyan-800 h-15 w-full">
            <div className="flex flex-row px-10 gap-10 items-center">
                <button onClick={() => navigate("/MainPage")} className="font-bold text-white text-xl">
                    CFD
                </button>

                <button onClick={() => navigate("/cases")}>Skrzynki</button>
                <button>Promocje</button>
                <button onClick={() => navigate("/PremiumPage")}>Premium</button>
                <button onClick={() => navigate("/AddCasePage")}>Dodaj Skrzynkę</button>
                <button onClick={() => navigate("/AddItemPage")}>Dodaj Przedmiot</button>
                <button onClick={() => navigate("/SearchPage")}>Wyszukaj</button>
            </div>

            <div className="flex items-center px-10">
                {user ? (
                    <button
                        onClick={() => navigate("/ProfilePage")}
                        className={`${
                            user.role === "premium"
                                ? "text-yellow-300"
                                : "text-white"
                        } font-bold text-xl w-40 hover:scale-110 transition`}
                    >
                        {user.nickname}
                    </button>
                ) : (
                    <button
                        onClick={() => navigate("/Login")}
                        className="text-white font-bold text-xl"
                    >
                        Zaloguj się
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
