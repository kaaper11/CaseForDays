import axios from "axios";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const ProfilePage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [error, setError] = useState(null);
    const token = sessionStorage.getItem("token");

    const data = async () => {
        try {
            if (token) {
                const response = await axios.get('http://localhost:5000/users/user', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setUser(response.data);
            }
        }catch(err) {
            setError(err.res.data.message);
        }
    }

    useEffect(() => {
        data()
    },[])


    return (
        <div className={'flex flex-col gap-10 justify-center items-center py-10'}>
            <div className={'flex flex-col gap-5 py-5 items-center justify-center w-200 border-cyan-800 border-3'}>
                <p><c className={'font-thin'}>Nazwa użytkownika: </c> {user.nickname}</p>
                <p><c className={'font-thin'}>email: </c> {user.email}</p>
                <p><c className={'font-thin'}>Balans: </c> {user.balance} V-dolców</p>
                <p><c className={'font-thin'}>Typ konta:  </c> {user.role}</p>
                <buttons onClick={() => navigate('/AddBalancePage')} className={"flex items-center justify-center border-3 border-amber-400 w-50 h-20 rounded-md text-white text-2xl font-bold bg-amber-300 hover:scale-200 transition cursor-pointer"}>Dodaj balans</buttons>
            </div>
            <p>Ekwipunek:</p>
            <div className={'flex  flex-col gap-5 items-center justify-center w-300 border-cyan-800 border-3'}>
                {user.inventory?.length > 0 ? (
                        <div>
                            {user.inventory.map(inventor => (
                                    <div></div>
                                ))}
                        </div>
                ): <p>Brak przedmiotów w ekwpiunku</p>}

            </div>
        </div>
    )
}
export default ProfilePage;