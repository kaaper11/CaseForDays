import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../openCase.css";

const ITEM_WIDTH = 160;
const REEL_REPEAT = 5;

const OpenCasePage = () => {
    const { id } = useParams();
    const token = sessionStorage.getItem("token");

    const [items, setItems] = useState([]);
    const [winner, setWinner] = useState(null);
    const [spinning, setSpinning] = useState(false);

    const reelRef = useRef(null);

    const openCase = async () => {
        if (spinning) return;

        setSpinning(true);
        setWinner(null);

        try {
            const res = await axios.post(
                `http://localhost:5000/cases/${id}/open`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const { items: dbItems, wonItem } = res.data;

            const repeated = Array(REEL_REPEAT)
                .fill(dbItems)
                .flat();

            const middleIndex = Math.floor(repeated.length / 2);
            repeated[middleIndex] = wonItem;

            setItems(repeated);

            requestAnimationFrame(() => {
                if (!reelRef.current) return;

                reelRef.current.style.transition = "none";
                reelRef.current.style.transform = "translateX(0)";

                requestAnimationFrame(() => {
                    reelRef.current.style.transition =
                        "transform 4s cubic-bezier(0.1, 0.9, 0.2, 1)";

                    const offset =
                        middleIndex * ITEM_WIDTH -
                        ITEM_WIDTH * 2;

                    reelRef.current.style.transform =
                        `translateX(-${offset}px)`;
                });
            });

            setTimeout(() => {
                setWinner(wonItem);
                setSpinning(false);
            }, 4200);

        } catch (err) {
            console.error(err);
            setSpinning(false);
            alert("Błąd otwierania skrzynki");
        }
    };

    return (
        <div className="open-case-container">
            <h1>Otwieranie skrzynki</h1>

            <div className="reel-wrapper">
                <div className="reel" ref={reelRef}>
                    {items.map((item, index) => (
                        <div
                            className="reel-item"
                            key={`${item._id}-${index}`}
                        >
                            <img
                                src={`http://localhost:5000/uploads/${item.image}`}
                                alt={item.name}
                            />
                            <span>{item.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            <button onClick={openCase} disabled={spinning}>
                {spinning ? "Losowanie..." : "Otwórz skrzynkę"}
            </button>

            {winner && (
                <div className="winner">
                    Wygrałeś:
                    <strong> {winner.name}</strong>
                </div>
            )}
        </div>
    );
};

export default OpenCasePage;
