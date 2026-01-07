import axios from "axios";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const PremiumPage = () => {
    const token = sessionStorage.getItem("token");
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
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
            }
        }catch(err) {
            setError(err.res.data.message);
        }
    }

    useEffect(() => {
        data()
    },[])

    const premium = async () => {
        try {
            if (token) {
               const response =  await axios.put('http://localhost:5000/users/premium', {}, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
                setSuccess(response.data);
            }
        }catch(err){
            setError(err.res.data.message);
        }
    }


    return (

        <div className={'flex flex-col'}>
            {user.role === "normal" && (
                <div>
                    <div className={'flex justify-center py-20'}>
                        <div className={'grid grid-cols-2 gap-5'}>
                            <div className={'flex  flex-col gap-5  bg-cyan-800 w-150 rounded-md shadow-2xl'}>
                                <div className={'bg-fuchsia-300 w-50 px-2 rounded-t-md'}>
                                    <p>0 zł za 1 miesiąc</p>
                                </div>
                                <div className={'px-5 flex flex-col gap-5'}>
                                    <p >Premium</p>
                                    <c className={'text-4xl font-bold text-fuchsia-200'}>Individual</c>
                                    <div className={'flex flex-col '}>
                                        <c className={'text-white font-bold'}>0 zł za 1 miesiąc</c>
                                        <c className={'text-gray-400'}>V-dolców na miesiąc później</c>
                                    </div>
                                    <p>---------------------------------------------------------</p>
                                    <div className={'flex flex-col '}>
                                        <c className={'text-white font-bold'}>* Pełne konto premium</c>
                                        <c className={'text-white font-bold'}>* Bonus do każdej wygranej</c>
                                        <c className={'text-white font-bold'}>* Podwyższenie szans na lepsze wygrane</c>
                                    </div>
                                    <div className={'flex flex-col items-center py-7 '}>
                                        <buttons onClick={premium} className={'h-10 w-120 rounded-2xl bg-fuchsia-300  text-center cursor-pointer text-white font-bold'}>
                                            <p>Wypróbuj premium</p>
                                        </buttons>
                                    </div>
                                </div>
                            </div>
                            <div className={'flex  flex-col gap-5  bg-cyan-800 w-150 rounded-md shadow-2xl'}>
                                <div className={'bg-blue-200 w-50 px-2 rounded-t-md'}>
                                    <p>0 zł za 1 miesiąc</p>
                                </div>
                                <div className={'px-5 flex flex-col gap-5'}>
                                    <p >Standard</p>
                                    <c className={'text-4xl font-bold text-blue-100'}>No premium</c>
                                    <div className={'flex flex-col '}>
                                        <c className={'text-white font-bold'}>Darmowy ZAWSZE</c>
                                    </div>
                                    <p>---------------------------------------------------------</p>
                                    <div className={'flex flex-col '}>
                                        <c className={'text-white font-bold'}>* Konro standardowe</c>
                                        <c className={'text-white font-bold'}>* Brak bonusów</c>
                                        <c className={'text-white font-bold'}>* Stała szansa na wygraną</c>
                                    </div>
                                    <div className={'flex flex-col items-center py-13 '}>
                                        <buttons onClick={() => navigate('/MainPage')} className={'h-10 w-120 rounded-2xl bg-blue-200  text-center cursor-pointer text-white font-bold'}>
                                            <p>Zostań przy standardowym planie</p>
                                        </buttons>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className={'flex items-center justify-center'}>
                        {success && (<success>{success}</success>)}
                        {error && (<error>{error}</error>)}
                    </div>
                </div>
            )}
            {user.role === "premium" && (
                <div className={'flex flex-col items-center justify-center py-20'}>
                    <div className={'flex  flex-col gap-5  bg-cyan-800 w-150 rounded-md shadow-2xl'}>
                        <div className={'bg-fuchsia-300 w-60 px-2 rounded-t-md'}>
                            <p>Twój obecny plan</p>
                        </div>
                        <div className={'px-5 flex flex-col gap-5'}>
                            <p >Premium</p>
                            <c className={'text-4xl font-bold text-fuchsia-200'}>Individual</c>
                            <div className={'flex flex-col '}>
                                <c className={'text-gray-400'}>100 V-dolców na miesiąc</c>
                            </div>
                            <p>---------------------------------------------------------</p>
                            <div className={'flex flex-col '}>
                                <c className={'text-white font-bold'}>* Pełne konto premium</c>
                                <c className={'text-white font-bold'}>* Bonus do każdej wygranej</c>
                                <c className={'text-white font-bold'}>* Podwyższenie szans na lepsze wygrane</c>
                            </div>
                            <div className={'flex flex-col items-center py-7 '}>
                                <buttons onClick={premium} className={'h-10 w-120 rounded-2xl bg-fuchsia-300  text-center cursor-pointer text-white font-bold'}>
                                    <p>Zakończ subskrypcję</p>
                                </buttons>

                            </div>

                        </div>

                    </div>
                    <div className={'flex items-center justify-center'}>
                        {success && (<success>{success}</success>)}
                        {error && (<error>{error}</error>)}
                    </div>
                </div>
            )}

        </div>
    )
}
export default PremiumPage;