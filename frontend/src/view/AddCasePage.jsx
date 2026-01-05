import { useEffect, useState } from "react";
import axios from "axios";

const AddCasePage = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [type, setType] = useState("");
    const [image, setImage] = useState(null);
    const [items, setItems] = useState([]);
    const [bonus, setBonus] = useState("");
    const [event, setEvent] = useState("");

    const [addedItems, setAddedItems] = useState([]);
    const [opisId, setOpisId] = useState(null);

    const token = sessionStorage.getItem("token");

    const addItem = (item) => {
        setAddedItems((prev) => [...prev, item._id]);
    };

    const allItems = async () => {
        try {
            if (!token) return;

            const response = await axios.get(
                "http://localhost:5000/items/allitems",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setItems(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        allItems();
    }, []);

    const handleAddCase = async () => {
        try {
            if (!token) {
                alert("Brak tokenu – zaloguj się ponownie");
                return;
            }

            if (addedItems.length === 0) {
                alert("Dodaj przynajmniej jeden przedmiot do skrzynki");
                return;
            }

            const formData = new FormData();
            formData.append("name", name);
            formData.append("price", price);
            formData.append("type", type);
            formData.append("image", image);
            formData.append("items", JSON.stringify(addedItems));

            if (type === "Premium") {
                formData.append("bonus", bonus);
            }

            if (type === "Eventowa") {
                formData.append("event", event);
            }

            let endpoint = "/addcasestandard";
            if (type === "Premium") endpoint = "/addcasepremium";
            if (type === "Eventowa") endpoint = "/addcaseevent";

            await axios.post(
                `http://localhost:5000/cases${endpoint}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Skrzynka dodana pomyślnie!");

            setName("");
            setPrice("");
            setType("");
            setBonus("");
            setEvent("");
            setImage(null);
            setAddedItems([]);

        } catch (error) {
            console.error(error);
            alert(
                error.response?.data?.message ||
                "Błąd podczas dodawania skrzynki"
            );
        }
    };

    return (
        <div className="flex flex-col items-center py-5">
            <h1 className="text-3xl font-bold">Dodaj nową skrzynkę</h1>

            <form className="flex flex-col gap-5 py-5 border-3 w-200 items-center rounded-lg border-cyan-800 shadow-2xl">
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-70"
                    placeholder="Nazwa skrzynki"
                />

                <input
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    type="number"
                    className="w-70"
                    placeholder="Cena"
                />

                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-50"
                >
                    <option value="">Typ</option>
                    <option value="Standardowa">Standardowa</option>
                    <option value="Premium">Premium</option>
                    <option value="Eventowa">Eventowa</option>
                </select>

                {type === "Premium" && (
                    <input
                        value={bonus}
                        onChange={(e) => setBonus(e.target.value)}
                        placeholder="Ilość bonusu"
                        type="number"
                    />
                )}

                {type === "Eventowa" && (
                    <input
                        value={event}
                        onChange={(e) => setEvent(e.target.value)}
                        placeholder="Określ wydarzenie"
                        type="text"
                    />
                )}

                <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                />

                <button
                    type="button"
                    onClick={handleAddCase}
                    className="w-40 border-3 border-cyan-800 text-center rounded-md hover:bg-cyan-800 text-white cursor-pointer font-bold"
                >
                    Dodaj skrzynkę
                </button>
            </form>

            <div className="grid grid-cols-5 gap-5 py-10">
                {items.map((item) => (
                    <div
                        key={item._id}
                        onMouseEnter={() => setOpisId(item._id)}
                        onMouseLeave={() => setOpisId(null)}
                        className="skin w-60 h-80 flex flex-col items-center border-3 rounded-md border-cyan-800"
                    >
                        <img
                            src={`http://localhost:5000/uploads/${item.image}`}
                            alt={item.name}
                        />

                        <div className="text-white font-bold">
                            {item.weaponType} {item.name}
                        </div>

                        {opisId === item._id && (
                            <div className="tooltip">{item.opis}</div>
                        )}

                        <button
                            onClick={() => addItem(item)}
                            className="px-3 py-1 bg-cyan-800 text-white rounded-md"
                        >
                            Dodaj
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AddCasePage;
