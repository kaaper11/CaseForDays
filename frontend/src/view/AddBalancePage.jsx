import {useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";

const AddBalancePage = () => {
    const navigate = useNavigate();
    const token = sessionStorage.getItem("token");

    const addBalance = async (value) => {
        console.log("soema", value);
        try {
            if (token) {
                await axios.put('http://localhost:5000/users/addbalance', {value}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                navigate('/PaymentSimulationPage');
            }
        }catch(err) {
            console.log(err);
        }
    }


    return (
        <div className={'flex justify-center items-center py-10'}>
            <div className={'flex  justify-center items-center flex-col border-3 border-cyan-800 w-300'}>
                <h1>Dodaj środki do swojego konta</h1>
                <div   className={'grid grid-cols-3 gap-4 h-125 w-255 p-5'}>
                    <div onClick={() => addBalance(100)} className={'hover:scale-105 cursor-pointer transition flex flex-col justify-center items-center p-10 border-3 border-cyan-800 bg-cyan-100 '}>
                        <div className={'py-37 flex flex-col justify-center items-center '}>
                            <p >100 V-dolców </p>
                            <c className = {'text-cyan-800'}>+20 dla użytkowników premium</c>
                        </div>
                        <p>32.00 zł</p>
                    </div>
                    <div onClick={() => addBalance(200)} className={'hover:scale-105 cursor-pointer transition flex flex-col justify-center items-center p-10 border-3 border-cyan-800 bg-cyan-200'}>
                        <div className={'py-37 flex flex-col justify-center items-center '}>
                            <p >200 V-dolców </p>
                            <c className = {'text-cyan-800'}>+30 dla użytkowników premium</c>
                        </div>
                        <p>52.00 zł</p>
                    </div>
                    <div onClick={() => addBalance(300)}className={'hover:scale-105 cursor-pointer transition flex flex-col justify-center items-center p-10 border-3 border-cyan-800 bg-cyan-300'}>
                        <div className={'py-37 flex flex-col justify-center items-center '}>
                            <p >300 V-dolców </p>
                            <c className = {'text-cyan-800'}>+40 dla użytkowników premium</c>
                        </div>
                        <p>72.00 zł</p>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default AddBalancePage;