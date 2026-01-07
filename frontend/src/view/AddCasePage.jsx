import {useEffect, useState} from "react";
import axios from "axios";

const AddCasePage = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState();
    const [type, setType] = useState('');
    const [image, setImage] = useState('');
    const [items, setItems] = useState([]);
    const [bonus, setBonus] = useState();
    const [event, setEvent] = useState('');

    const token = sessionStorage.getItem('token');
    const [opis, setOpis] = useState(false);

    const [addedItems, setAddedItems] = useState([]);
    const [czyjest, setCzyjest] = useState({});
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);



    const add = async (e) => {
        e.preventDefault();
        if (type === 'Standardowa'){
            addStandardCase();
        }else if(type === 'Premium'){
            addPremiumCase()
        }else {
            addEventCase();
        }
    }

    const addStandardCase = async () => {
        try {
            await axios.post('http://localhost:5000/cases/addcasestandard', {
                name: name,
                price: price,
                type: type,
                image: image,
                items: addedItems,
            },{
                headers: {
                    Authorization: `Bearer ${token}`
                }})
            setSuccess(true);

        }catch(err){
            setError(err.response?.data?.message);
        }
    }


    const addPremiumCase = async () => {
        try {
            await axios.post('http://localhost:5000/cases/addcasepremium', {
                name: name,
                price: price,
                type: type,
                image: image,
                items: addedItems,
                bonus: bonus,
            },{
                headers: {
                    Authorization: `Bearer ${token}`
                }})
            setSuccess(true);

        }catch(err){
            setError(err.response?.data?.message);
        }
    }

    const addEventCase = async () => {

        try {
            await axios.post('http://localhost:5000/cases/addcaseevent', {
                name: name,
                price: price,
                type: type,
                image: image,
                items: addedItems,
                event: event,
            },{
                headers: {
                    Authorization: `Bearer ${token}`
                }})

            setSuccess(true);

        }catch(err){
            setError(err.response?.data?.message);
        }
    }

    const addItem = (item, index) => {

        if (addedItems.some(itema => itema.id === item.id)){
            alert("Już dodałeś ten przedmiot!")
            return;
        }
        setAddedItems([...addedItems, item])
        setCzyjest(prev => ({
            ...prev,
            [index] : prev[index]= true,
        }))
    }

    const allItems = async () => {
        try {
        if (token) {
            const response = await axios.get('http://localhost:5000/items/allitems', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setItems(response.data);

        }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        allItems()
    },[addedItems])

    return (
        <div className={'flex flex-col items-center py-5'}>
            <h1>Dodaj nową skrzynkę</h1>
            <form className={'flex flex-col gap-5 py-5 border-3 w-200 items-center rounded-lg border-cyan-800 shadow-2xl'}>
                <input value={name} onChange={(e) => setName(e.target.value)} className={'w-70'} placeholder={'Nazwa skrzynki'}/>
                <input value={price} onChange={(e) => setPrice(e.target.value)} type='number' className={'w-70'} placeholder={'Cena'}/>
                <select value={type} onChange={(e) => setType(e.target.value)} className={'w-50'}>
                    <option>Typ</option>
                    <option>Standardowa</option>
                    <option>Premium</option>
                    <option>Eventowa</option>
                </select>
                {type === "Premium" && (
                    <div className={'flex flex-col gap-5 p-5 border-cyan-800 border-3 shadow-2xl rounded-md'}>
                        <input value={bonus} onChange={(e) => setBonus(e.target.value)} placeholder={'Ilość bonusu'} type={"number"}/>
                    </div>
                    )}
                {type === "Eventowa" && (
                    <div className={'flex flex-col gap-5 p-5 border-cyan-800 border-3 shadow-2xl rounded-md'}>
                        <input value={event} onChange={(e) => setEvent(e.target.value)} placeholder={'Określ wydarzenie'} type={"text"}/>
                    </div>
                    )}
                <input value={image} onChange={(e) => setImage(e.target.value)} type={'file'}/>
                <button onClick={add}  className={'w-45 border-3 border-cyan-800 text-center rounded-md hover:bg-cyan-800 text-white cursor-pointer font-bold '}>Dodaj skrzynkę</button>
                {success && (<success>Dodano skrzynkę</success>)}
                {error && (<error>{error}</error>)}
            </form>
            <div className="grid grid-cols-5 gap-5 py-10">
                {items.map((item, index) => (
                    <div onMouseEnter={() => setOpis(true)} onMouseLeave={() => setOpis(false)}
                         className={`${czyjest[index] ? 'skin w-60 h-80 flex items-center justify-center text-center flex-col gap-0  border-3 cursor-pointer hover:shadow-2xl rounded-md border-green-700' : 'skin w-60 h-80 flex items-center justify-center text-center flex-col gap-0  border-3 cursor-pointer hover:shadow-2xl rounded-md border-cyan-800' }`}>
                        <img src={item.image.split('\\').pop()}/>
                        <div className={`${czyjest[index] ? 'flex w-60 h-35 flex-col border-1 border-green-700' : 'flex w-60 h-35 flex-col border-1 border-cyan-800'}`}>
                            <d className = {'text-lg font-bold text-white'}>{item.weaponType} {item.name}</d>
                            <d className = {'text-lg font-bold text-white'}>{item.cena} zł</d>
                        </div>
                        {opis && (
                            <div className={'tooltip'}>
                                {item.opis}
                            </div>
                        )}
                        <div className={`${czyjest[index] ? 'flex w-60 h-35 items-center justify-center border-1 border-green-700' : 'flex w-60 h-35 items-center justify-center border-1 border-cyan-800'}`}>
                            <button onClick={() => addItem(item, index)}>Dodaj</button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}
export default AddCasePage;