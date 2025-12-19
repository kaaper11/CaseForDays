import {useState} from "react";

const AddItemPage = () => {
    const [type, setType] = useState("");

    return (
        <div className={'flex flex-col items-center py-5'}>
            <h1>Dodaj nowy przedmiot</h1>
            <form className={'flex flex-col gap-5 py-5 border-3 w-200 items-center rounded-lg border-cyan-800 shadow-2xl'}>
                <input className={'w-70'} placeholder={'Nazwa przedmiotu'}/>
                <select className={'w-50'}>
                    <option>Poziom rzadkości</option>
                    <option>niebieski</option>
                    <option>fioloetowy</option>
                    <option>różowy</option>
                    <option>czerowny</option>
                    <option>złoty</option>
                </select>
                <input className={'w-70'} placeholder={'Cena'}/>
                <select value={type} onChange={(e) => setType(e.target.value)} className={'w-50'}>
                    <option>Typ</option>
                    <option>Nóż</option>
                    <option>Skin</option>
                    <option>Naklejka</option>
                </select>
                <input type={'file'}/>
                <button>Dodaj</button>
            </form>

        </div>
    )
}
export default AddItemPage;