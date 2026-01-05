import { useState } from "react";
import axios from "axios";

const AddItemPage = () => {
    const [name, setName] = useState("");
    const [rarity, setRarity] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState(null);

    const [weaponType, setWeaponType] = useState("");
    const [startrak, setStartrak] = useState(false);
    const [stan, setStan] = useState("");

    const [czyHolo, setCzyHolo] = useState(false);
    const [turniej, setTurniej] = useState("");
    const [druzyna, setDruzyna] = useState("");
    const [czyZlota, setCzyZlota] = useState(false);
    const [rok, setRok] = useState("");

    const [type, setType] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const token = sessionStorage.getItem("token");

    const add = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess(false);

        try {
            if (!token) {
                setError("Brak tokenu");
                return;
            }

            const formData = new FormData();
            formData.append("name", name);
            formData.append("rarity", rarity);
            formData.append("price", price);
            formData.append("image", image);

            let endpoint = "";

            if (type === "Skin") {
                formData.append("weaponType", weaponType);
                formData.append("startrak", startrak);
                formData.append("stan", stan);
                endpoint = "/additemskin";
            }

            if (type === "Nóż") {
                formData.append("weaponType", weaponType);
                formData.append("startrak", startrak);
                formData.append("stan", stan);
                endpoint = "/additemknife";
            }

            if (type === "Naklejka") {
                formData.append("czyHolo", czyHolo);
                formData.append("turniej", turniej);
                formData.append("druzyna", druzyna);
                formData.append("czyZlota", czyZlota);
                formData.append("rok", rok);
                endpoint = "/additemsticker";
            }

            await axios.post(
                `http://localhost:5000/items${endpoint}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setSuccess(true);

        } catch (err) {
            setError(err.response?.data?.message || "Błąd dodawania przedmiotu");
        }
    };

    return (
        <div className="flex flex-col items-center py-5">
            <h1>Dodaj nowy przedmiot</h1>

            <form
                onSubmit={add}
                className="flex flex-col gap-5 py-5 border-3 w-200 items-center rounded-lg border-cyan-800 shadow-2xl"
            >
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-70"
                    placeholder="Nazwa przedmiotu"
                />

                <select
                    value={rarity}
                    onChange={(e) => setRarity(e.target.value)}
                    className="w-50"
                >
                    <option value="">Poziom rzadkości</option>
                    <option>niebieski</option>
                    <option>fioletowy</option>
                    <option>różowy</option>
                    <option>czerwony</option>
                    <option>złoty</option>
                </select>

                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-70"
                    placeholder="Cena"
                />

                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-50"
                >
                    <option value="">Typ</option>
                    <option>Nóż</option>
                    <option>Skin</option>
                    <option>Naklejka</option>
                </select>

                {(type === "Nóż" || type === "Skin") && (
                    <div className="flex flex-col gap-5 p-5 border-cyan-800 border-3 shadow-2xl">
                        <select
                            value={weaponType}
                            onChange={(e) => setWeaponType(e.target.value)}
                            className="w-50"
                        >
                            <option value="">
                                {type === "Skin" ? "Typ broni" : "Typ noża"}
                            </option>
                            {type === "Skin" ? (
                                <>
                                    <option>AK-47</option>
                                    <option>GLOCK</option>
                                    <option>AWP</option>
                                    <option>M4A4</option>
                                </>
                            ) : (
                                <>
                                    <option>Bagnet</option>
                                    <option>Karambit</option>
                                    <option>Nóż motylkowy</option>
                                    <option>Gut</option>
                                </>
                            )}
                        </select>

                        <div className="flex flex-row gap-5">
                            <label className="text-white text-lg">Startrak</label>
                            <input
                                type="checkbox"
                                checked={startrak}
                                onChange={(e) => setStartrak(e.target.checked)}
                            />
                        </div>

                        <select
                            value={stan}
                            onChange={(e) => setStan(e.target.value)}
                            className="w-50"
                        >
                            <option value="">Stan</option>
                            <option>Factory new</option>
                            <option>Minimal wear</option>
                            <option>Field-Tested</option>
                            <option>Well-Worn</option>
                            <option>Battle-Scared</option>
                        </select>
                    </div>
                )}

                {type === "Naklejka" && (
                    <div className="flex flex-col gap-5 p-5 border-cyan-800 border-3 shadow-2xl">
                        <div className="flex flex-row gap-5">
                            <label className="text-white text-lg">Hologramowa</label>
                            <input
                                type="checkbox"
                                checked={czyHolo}
                                onChange={(e) => setCzyHolo(e.target.checked)}
                            />
                        </div>

                        <select
                            value={turniej}
                            onChange={(e) => setTurniej(e.target.value)}
                            className="w-50"
                        >
                            <option value="">Turniej</option>
                            <option>IEM</option>
                            <option>Dream Hack</option>
                        </select>

                        <select
                            value={druzyna}
                            onChange={(e) => setDruzyna(e.target.value)}
                            className="w-50"
                        >
                            <option value="">Drużyna</option>
                            <option>Virtus.pro</option>
                            <option>Natus Vincere</option>
                            <option>Astralis</option>
                            <option>Fnatic</option>
                        </select>

                        <div className="flex flex-row gap-5">
                            <label className="text-white text-lg">Złota</label>
                            <input
                                type="checkbox"
                                checked={czyZlota}
                                onChange={(e) => setCzyZlota(e.target.checked)}
                            />
                        </div>

                        <input
                            type="number"
                            value={rok}
                            onChange={(e) => setRok(e.target.value)}
                            placeholder="Rok"
                        />
                    </div>
                )}

                <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                />

                <button type="submit">Dodaj</button>

                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">Dodano przedmiot</p>}
            </form>
        </div>
    );
};

export default AddItemPage;
