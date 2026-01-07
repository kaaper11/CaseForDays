import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

const Navbar = () => {
    const navigate = useNavigate();
    const token = sessionStorage.getItem("token");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [user, setUser] = useState({});

    const data = async () => {
        try {
            if (token) {
                const response = await axios.get('http://localhost:5000/users/user', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setUser(response.data);
                setSuccess(true);
            }
        }catch(err) {
            setError(err.res.data.message);
        }
    }

    useEffect(() => {
        data()
    },[])

    return (
        <div>
            <nav className={'flex justify-between bg-cyan-800 h-15 w-full '}>
                <div className={'flex flex-row px-10 gap-10 items-center'}>
                    <a onClick={() => navigate('/MainPage')} className={'font-bold text-white text-xl cursor-pointer'}>CFD</a>
                    <button onClick={() => navigate('/cases')}>
                        Skrzynki
                    </button>
                    <button>
                        Promocje
                    </button>
                    <button onClick={() => navigate('/PremiumPage')}>
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
                    <buttons onClick={() => navigate('/ProfilePage')} className={`${user.role === 'premium' ? 'text-yellow-300 text-center font-bold text-xl w-40 cursor-pointer hover:scale-110 transition' : 'text-white text-center text-xl font-bold w-40 cursor-pointer hover:scale-110 transition'}`}>
                        {user.nickname}
                    </buttons>
                </div>

            </nav>
        </div>
    )
}
export default Navbar;