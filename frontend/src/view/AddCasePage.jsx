import { useEffect, useState } from "react";
import axios from "axios";

const CASE_IMAGES = [
    "/tło.jpg",
    "/case_premium.jpg",
    "/case_event.jpg",
];

const EVENTS = ["Halloween", "Święta"];

const AddCasePage = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [type, setType] = useState("");
    const [image, setImage] = useState("");
    const [items, setItems] = useState([]);
    const [addedItems, setAddedItems] = useState([]);
    const [bonus, setBonus] = useState("");
    const [event, setEvent] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const token = sessionStorage.getItem("token");

    useEffect(() => {
        const fetchItems = async () => {
            const res = await axios.get(
                "http://localhost:5000/items/allitems",
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setItems(res.data || []);
        };
        fetchItems();
    }, [token]);

    const addItem = (item) => {
        if (addedItems.some(i => i.id === item.id)) return;
        setAddedItems(prev => [...prev, item]);
    };

    const removeItem = (id) => {
        setAddedItems(prev => prev.filter(i => i.id !== id));
    };

    const add = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess(false);

        if (!name || !price || !type || !image) {
            setError("Uzupełnij wszystkie wymagane pola");
            return;
        }

        if (addedItems.length === 0) {
            setError("Dodaj przynajmniej jeden przedmiot");
            return;
        }

        if (type === "Eventowa" && !event) {
            setError("Wybierz wydarzenie");
            return;
        }

        try {
            const payload = {
                name,
                price: Number(price),
                type,
                image,
                items: addedItems.map(i => i.id),
            };

            if (type === "Premium") payload.bonus = Number(bonus);
            if (type === "Eventowa") payload.event = event;

            const endpoint =
                type === "Standardowa"
                    ? "addcasestandard"
                    : type === "Premium"
                        ? "addcasepremium"
                        : "addcaseevent";

            await axios.post(
                `http://localhost:5000/cases/${endpoint}`,
                payload,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setSuccess(true);
            setName("");
            setPrice("");
            setType("");
            setImage("");
            setAddedItems([]);
            setBonus("");
            setEvent("");
        } catch (err) {
            setError(err.response?.data?.message || "Błąd dodawania skrzynki");
        }
    };

    return (
        <div className="flex flex-col items-center py-5">
            <h1 className="text-2xl font-bold">Dodaj nową skrzynkę</h1>

            <form
                onSubmit={add}
                className="flex flex-col gap-4 py-5 w-200 items-center rounded-lg border-2 border-cyan-800"
            >
                <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Nazwa skrzynki"
                />

                <input
                    type="number"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    placeholder="Cena"
                />

                <select value={type} onChange={e => setType(e.target.value)}>
                    <option value="">Typ</option>
                    <option>Standardowa</option>
                    <option>Premium</option>
                    <option>Eventowa</option>
                </select>

                {type === "Premium" && (
                    <input
                        type="number"
                        value={bonus}
                        onChange={e => setBonus(e.target.value)}
                        placeholder="Bonus"
                    />
                )}

                {type === "Eventowa" && (
                    <select value={event} onChange={e => setEvent(e.target.value)}>
                        <option value="">Wybierz wydarzenie</option>
                        {EVENTS.map(ev => (
                            <option key={ev} value={ev}>{ev}</option>
                        ))}
                    </select>
                )}

                <select value={image} onChange={e => setImage(e.target.value)}>
                    <option value="">Wybierz obraz</option>
                    {CASE_IMAGES.map(img => (
                        <option key={img} value={img}>{img}</option>
                    ))}
                </select>

                <button type="submit">Dodaj skrzynkę</button>

                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">Skrzynka dodana </p>}
            </form>

            <h2 className="text-xl mt-10">Dostępne przedmioty</h2>

            <div className="grid grid-cols-5 gap-5 py-5">
                {items.map(item => (
                    <div
                        key={item.id}
                        className="w-60 h-80 border-2 border-cyan-800 rounded-md flex flex-col items-center justify-between p-2"
                    >
                        <img
                            src={item.image}
                            alt={item.name}
                            className="h-32 object-contain"
                        />
                        <p>{item.weaponType} {item.name}</p>
                        <p>{item.price} zł</p>
                        <button onClick={() => addItem(item)}>Dodaj</button>
                    </div>
                ))}
            </div>

            {addedItems.length > 0 && (
                <>
                    <h2 className="text-xl mt-10">Dodane przedmioty</h2>
                    <div className="flex flex-wrap gap-3 py-5">
                        {addedItems.map(item => (
                            <div
                                key={item.id}
                                className="border-2 border-green-600 px-3 py-2 rounded flex gap-2 items-center"
                            >
                                <span>{item.name}</span>
                                <button onClick={() => removeItem(item.id)}>✖</button>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default AddCasePage;
