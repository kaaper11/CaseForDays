import { useState } from "react";
import axios from "axios";

const IMAGE_OPTIONS = [
    "/background.jpg",
    "/glock.jpg",
    "/glock1.jpg",
    "/tlo.jpg",
];

const AddItemPage = () => {
    const [name, setName] = useState("");
    const [rarity, setRarity] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");

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

    const authHeaders = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const add = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess(false);

        if (!token) {
            setError("Musisz być zalogowany");
            return;
        }

        if (!name || !rarity || !price || !image || !type) {
            setError("Uzupełnij wszystkie wymagane pola");
            return;
        }

        if ((type === "Skin" || type === "Nóż") && (weaponType === "" || stan === "")) {
            setError("Uzupełnij typ broni/noża oraz stan");
            return;
        }


        if (type === "Naklejka" && (!turniej || !druzyna || !rok)) {
            setError("Uzupełnij dane naklejki");
            return;
        }

        try {
            if (type === "Skin") await addItemSkin();
            else if (type === "Nóż") await addItemKnife();
            else if (type === "Naklejka") await addItemSticker();
            setSuccess(true);
        } catch (err) {
            setError(err.response?.data?.message || "Błąd");
        }
    };

    const addItemSkin = async () => {
        await axios.post(
            "http://localhost:5000/items/additemskin",
            {
                name,
                rarity,
                price: Number(price),
                image,
                weaponType,
                startrak,
                stan,
            },
            authHeaders
        );
    };

    const addItemKnife = async () => {
        await axios.post(
            "http://localhost:5000/items/additemknife",
            {
                name,
                rarity,
                price: Number(price),
                image,
                weaponType,
                startrak,
                stan,
            },
            authHeaders
        );
    };

    const addItemSticker = async () => {
        await axios.post(
            "http://localhost:5000/items/additemsticker",
            {
                name,
                rarity,
                price: Number(price),
                image,
                czyHolo,
                turniej,
                druzyna,
                czyZlota,
                rok: Number(rok),
            },
            authHeaders
        );
    };

    return (
        <div className="flex flex-col items-center py-5">
            <h1 className="text-2xl font-bold">Dodaj nowy przedmiot</h1>

            <form
                onSubmit={add}
                className="flex flex-col gap-5 py-5 w-200 items-center rounded-lg border-2 border-cyan-800 shadow-2xl"
            >
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nazwa przedmiotu" />

                <select value={rarity} onChange={(e) => setRarity(e.target.value)}>
                    <option value="">Poziom rzadkości</option>
                    <option>niebieski</option>
                    <option>fioletowy</option>
                    <option>różowy</option>
                    <option>czerwony</option>
                    <option>złoty</option>
                </select>

                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Cena" />

                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="">Typ</option>
                    <option>Nóż</option>
                    <option>Skin</option>
                    <option>Naklejka</option>
                </select>

                <select value={image} onChange={(e) => setImage(e.target.value)}>
                    <option value="">Wybierz obrazek</option>
                    {IMAGE_OPTIONS.map((img) => (
                        <option key={img} value={img}>{img}</option>
                    ))}
                </select>

                {(type === "Nóż" || type === "Skin") && (
                    <div className="flex flex-col gap-4 p-4 border-2 border-cyan-800 w-full">
                        <select value={weaponType} onChange={(e) => setWeaponType(e.target.value)}>
                            <option value="">{type === "Skin" ? "Typ broni" : "Typ noża"}</option>
                            <option>AK-47</option>
                            <option>GLOCK</option>
                            <option>AWP</option>
                            <option>M4A4</option>
                            <option>Bagnet</option>
                            <option>Karambit</option>
                            <option>Nóż motylkowy</option>
                            <option>Gut</option>
                        </select>

                        <label className="flex gap-2 items-center">
                            <input type="checkbox" checked={startrak} onChange={(e) => setStartrak(e.target.checked)} />
                            Startrak
                        </label>

                        <select value={stan} onChange={(e) => setStan(e.target.value)}>
                            <option value="">Stan</option>
                            <option>Factory new</option>
                            <option>Minimal wear</option>
                            <option>Field-Tested</option>
                            <option>Well-Worn</option>
                            <option>Battle-Scarred</option>
                        </select>
                    </div>
                )}

                <button type="submit">Dodaj</button>

                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">Dodano przedmiot ✔</p>}
            </form>
        </div>
    );
};

export default AddItemPage;
