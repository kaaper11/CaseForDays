const AddCasePage = () => {
    return (
        <div className={'flex flex-col items-center py-5'}>
            <h1>Dodaj nową skrzynkę</h1>
            <form className={'flex flex-col gap-5 py-5 border-3 w-200 items-center rounded-lg border-cyan-800 shadow-2xl'}>
                <input className={'w-70'} placeholder={'Nazwa skrzynki'}/>
                <input type='number' className={'w-70'} placeholder={'Cena'}/>
                <input type={'number'} className={'w-70'} placeholder={'Pojemność'}/>
                <select className={'w-50'}>
                    <option>Typ</option>
                    <option>Standardowa</option>
                    <option>Premium</option>
                    <option>Eventowa</option>
                </select>
                <input type={'file'}/>
                <button>Dodaj</button>
            </form>

        </div>
    )
}
export default AddCasePage;