import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../openCase.css";

const ITEM_WIDTH = 160;
const ITEM_MARGIN = 10;
const ITEM_FULL_WIDTH = ITEM_WIDTH + ITEM_MARGIN;
const REEL_REPEAT = 10;
const ANIMATION_TIME = 8000;

const rarityClass = (rarity) => {
    switch (rarity) {
        case "niebieski": return "rarity-blue";
        case "fioletowy": return "rarity-purple";
        case "różowy": return "rarity-pink";
        case "czerwony": return "rarity-red";
        case "złoty": return "rarity-gold";
        default: return "";
    }
};

const OpenCasePage = () => {
    const { id } = useParams();
    const token = sessionStorage.getItem("token");

    const [caseName, setCaseName] = useState("");
    const [caseItems, setCaseItems] = useState([]);
    const [items, setItems] = useState([]);
    const [winner, setWinner] = useState(null);
    const [spinning, setSpinning] = useState(false);

    const reelRef = useRef(null);
    const wrapperRef = useRef(null);

    useEffect(() => {
        const fetchCase = async () => {
            const res = await axios.get(`http://localhost:5000/cases/${id}`);
            setCaseName(res.data.name);
            setCaseItems(res.data.items);

            const initialReel = Array(REEL_REPEAT)
                .fill(res.data.items)
                .flat();

            setItems(initialReel);
        };

        fetchCase();
    }, [id]);

    const openCase = async () => {
        if (spinning) return;

        setSpinning(true);
        setWinner(null);

        const res = await axios.post(
            `http://localhost:5000/cases/${id}/open`,
            {},
            { headers: { Authorization: `Bearer ${token}` } }
        );

        const { items: dbItems, wonItem } = res.data;

        const repeated = Array(REEL_REPEAT).fill(dbItems).flat();
        const baseIndex = Math.floor(repeated.length / 2);
        const winIndex = baseIndex + Math.floor(Math.random() * dbItems.length);

        repeated[winIndex] = wonItem;
        setItems(repeated);

        requestAnimationFrame(() => {
            const reel = reelRef.current;
            const wrapper = wrapperRef.current;
            if (!reel || !wrapper) return;

            reel.style.transition = "none";
            reel.style.transform = "translateX(0)";

            const offset =
                winIndex * ITEM_FULL_WIDTH -
                (wrapper.offsetWidth / 2 - ITEM_WIDTH / 2);

            requestAnimationFrame(() => {
                reel.style.transition = `transform ${ANIMATION_TIME}ms cubic-bezier(0.08, 0.82, 0.17, 1)`;
                reel.style.transform = `translateX(-${offset}px)`;
            });
        });

        setTimeout(() => {
            setWinner(wonItem);
            setSpinning(false);
        }, ANIMATION_TIME);
    };

    return (
        <div className="open-case-container">
            <h1>{caseName}</h1>

            <div className="reel-wrapper" ref={wrapperRef}>
                <div className="center-marker" />
                <div className="reel" ref={reelRef}>
                    {items.map((item, index) => (
                        <div
                            key={`${item._id}-${index}`}
                            className={`reel-item ${rarityClass(item.rarity)}`}
                        >
                            <img src={item.image} alt={item.name} />
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
                    Wygrałeś: {winner.name}
                </div>
            )}

            <div className="case-items">
                <h3 className="case-items-title">
                    Możliwe skiny w tej skrzynce
                </h3>
                <div className="case-items-grid">
                    {caseItems.map((item) => (
                        <div
                            key={item._id}
                            className={`case-item-card ${rarityClass(item.rarity)}`}
                        >
                            <img src={item.image} alt={item.name} />
                            <span>{item.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OpenCasePage;
