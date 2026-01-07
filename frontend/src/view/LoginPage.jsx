import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://localhost:5000/users/login", {
                email,
                password,
            });

            sessionStorage.setItem("token", response.data.token);

            setSuccess(true);
            setError(null);
            navigate("/MainPage");
        } catch (err) {
            setError(err.response?.data?.message || "Błąd logowania");
        }
    };

    return (
        <div className="flex items-center justify-center">
            <img className="relative h-screen w-screen" src="/background.jpg" />
            <div className="absolute flex flex-col gap-5 items-center justify-center bg-gray-100/20 w-200 h-120 rounded-lg">
                <h1 className="text-5xl font-bold">Logowanie</h1>

                <input
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-60 h-9"
                    type="email"
                />

                <input
                    placeholder="Hasło"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-60 h-9"
                    type="password"
                />

                <button onClick={handleLogin} className="w-60 h-9">
                    Zaloguj się
                </button>

                {success && <p className="text-green-300">Zalogowano pomyślnie</p>}
                {error && <p className="text-red-300">{error}</p>}
            </div>
        </div>
    );
};

export default LoginPage;
