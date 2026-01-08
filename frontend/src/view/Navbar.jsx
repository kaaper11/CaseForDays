import {useNavigate} from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    return (
        <div>
            <nav className={'flex justify-between bg-cyan-800 h-15 w-full '}>
                <div className={'flex flex-row px-10 gap-10 items-center'}>
                    <a onClick={() => navigate('/MainPage')} className={'font-bold text-white text-xl cursor-pointer'}>
                        <img src="/logo.png" alt="CaseForDays" className="h-10 select-none"/>
                    </a>
                    <button>
                        Skrzynki
                    </button>
                    <button>
                        Promocje
                    </button>
                    <button>
                        Premium
                    </button>
                    <button onClick={() => navigate('/AddCasePage')}>
                        Dodaj Skrzynkę
                    </button>
                    <button onClick={() => navigate('/AddItemPage')}>
                        Dodaj Przedmiot
                    </button>
                    <button onClick={() => navigate('/SearchPage')}>
                        Wyszukaj
                    </button>
                </div>
                <div className={'flex justify-between items-center px-10'}>
                    <button className={'text-white text-center font-bold w-40'}>Nazwa użytkownika</button>
                </div>

            </nav>
        </div>
    )
}
export default Navbar;