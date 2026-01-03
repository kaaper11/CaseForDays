import {useState} from "react";
import axios from "axios";

const AddItemPage = () => {
    const [name, setName] = useState("");
    const [rarity, setRarity] = useState("");
    const [price, setPrice] = useState();
    const [image, setImage] = useState("");

    const [weaponType, setWeaponType] = useState("");
    const [startrak, setStartrak] = useState(Boolean);
    const [stan , setStan] = useState('');

    const [czyHolo, setCzyHolo] = useState(Boolean);
    const [turniej, setTurniej] = useState('');
    const [druzyna, setDruzyna] = useState('');
    const [czyZlota, setCzyZlota] = useState(Boolean);
    const [rok, setRok] = useState();

    const [type, setType] = useState("");
    const token = sessionStorage.getItem("token");
    const [error, setError] = useState();
    const [success, setSuccess] = useState(false);


    const add = async (e) => {
        e.preventDefault();
        if (type === 'Skin'){
            addItemSkin();
        }else if(type === 'Nóż'){
            addItemKnife()
        }else {
            addItemSticker();
        }
    }

    const addItemSkin = async () => {
        try {
            if (token){
                    const response = await axios.post('http://localhost:5000/items/additemskin', {
                        name: name,
                        rarity: rarity,
                        price: price,
                        image: image,
                        weaponType: weaponType,
                        startrak: startrak,
                        stan: stan,
                    },{
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                setSuccess(true);
            }
        }catch(err) {
            setError(err.response?.data?.message);
            console.log(err)
        }
    }

    const addItemSticker = async () => {
        try {
            if (token){
                const response = await axios.post('http://localhost:5000/items/additemsticker', {
                    name: name,
                    rarity: rarity,
                    price: price,
                    image: image,
                    czyHolo: czyHolo,
                    turniej: turniej,
                    druzyna: druzyna,
                    czyZlota: czyZlota,
                    rok: rok,
                },{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setSuccess(true);
            }
        }catch(err) {
            setError(err.response?.data?.message);
            console.log(err)
        }
    }

    const addItemKnife = async () => {
        try {
            if (token){
                const response = await axios.post('http://localhost:5000/items/additemknife', {
                    name: name,
                    rarity: rarity,
                    price: price,
                    image: image,
                    weaponType: weaponType,
                    startrak: startrak,
                    stan: stan,
                },{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setSuccess(true);
            }
        }catch(err) {
            setError(err.response?.data?.message);
            console.log(err)
        }
    }


    return (
        <div className={'flex flex-col items-center py-5'}>
            <h1>Dodaj nowy przedmiot</h1>
            <form className={'flex flex-col gap-5 py-5 border-3 w-200 items-center rounded-lg border-cyan-800 shadow-2xl'}>
                <input value={name} onChange={(e) => setName(e.target.value)} className={'w-70'} placeholder={'Nazwa przedmiotu'}/>
                <select value={rarity} onChange={(e) => setRarity(e.target.value)} className={'w-50'}>
                    <option>Poziom rzadkości</option>
                    <option>niebieski</option>
                    <option>fioloetowy</option>
                    <option>różowy</option>
                    <option>czerowny</option>
                    <option>złoty</option>
                </select>
                <input type={'number'} value={price} onChange={(e) => setPrice(e.target.value)} className={'w-70'} placeholder={'Cena'}/>
                <select value={type} onChange={(e) => setType(e.target.value)} className={'w-50'}>
                    <option>Typ</option>
                    <option>Nóż</option>
                    <option>Skin</option>
                    <option>Naklejka</option>
                </select>
                {(type === 'Nóż' || type === 'Skin') && (
                    <div className={'flex flex-col gap-5 p-5 border-cyan-800 border-3 shadow-2xl'}>
                        {type === 'Skin' ?
                            <select value={weaponType} onChange={(e) => setWeaponType(e.target.value)} className={'w-50'}>
                                <option>Typ broni</option>
                                <option>AK-47</option>
                                <option>GLOCK</option>
                                <option>AWP</option>
                                <option>M4A4</option>
                            </select> :
                            <select value={weaponType} onChange={(e) => setWeaponType(e.target.value)} className={'w-50'}>
                                <option>Typ noża</option>
                                <option>Bagnet</option>
                                <option>Karambit</option>
                                <option>Nóż motylkowy</option>
                                <option>Gut</option>
                            </select>
                        }

                        <div className={'flex flex-row gap-5'}>
                            <label className={'text-white text-lg '}>Startrak</label>
                            <input checked={startrak} onChange={(e) => setStartrak(e.target.checked)} type={'checkbox'}/>
                        </div>
                        <select value={stan} onChange={(e) => setStan(e.target.value)} className={'w-50'}>
                            <option>Stan</option>
                            <option>Factory new</option>
                            <option>Minimal wear</option>
                            <option>Field-Tested</option>
                            <option>Well-Worn</option>
                            <option>Battle-Scared</option>
                        </select>
                    </div>
                )}
                {type === 'Naklejka' && (
                    <div className={'flex flex-col gap-5 p-5 border-cyan-800 border-3 shadow-2xl'}>
                        <div className={'flex flex-row gap-5'}>
                            <label className={'text-white text-lg '}>Hologramowa</label>
                            <input checked={czyHolo} onChange={(e) => setCzyHolo(e.target.checked)} type={'checkbox'}/>
                        </div>
                        <select value={turniej} onChange={(e) => setTurniej(e.target.value)} className={'w-50'}>
                            <option>Turniej</option>
                            <option>IEM</option>
                            <option>Dream Hack</option>
                            <option>*</option>
                            <option>*</option>
                        </select>
                        <select value={druzyna} onChange={(e) => setDruzyna(e.target.value)} className={'w-50'}>
                            <option>Drużyna</option>
                            <option>Vitrus .pro</option>
                            <option>Natus Vincere</option>
                            <option>Astralis</option>
                            <option>Fnatic</option>
                        </select>
                        <div className={'flex flex-row gap-5'}>
                            <label className={'text-white text-lg '}>Złota</label>
                            <input checked={czyZlota} onChange={(e) => setCzyZlota(e.target.checked)} type={'checkbox'}/>
                        </div>
                        <input value={rok} onChange={(e) => setRok(e.target.value)} type={'number'} placeholder={'Rok'}/>
                    </div>
                )}
                <input value={image} onChange={(e) => setImage(e.target.value)} type={'file'}/>
                <button onClick={add}>Dodaj</button>
                {error && (<error>{error}</error>)}
                {success && (<success>Dodano przedmiot</success>)}
            </form>

        </div>
    )
}
export default AddItemPage;