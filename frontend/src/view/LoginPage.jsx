import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");
    const navigate = useNavigate();

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const handleLogin = async () => {
        try {
           const response =  await axios.post('http://localhost:5000/users/login', {
                email: email,
                password: password,
            })
            console.log(response.data)
            sessionStorage.setItem("token", response.data)
            setSuccess(true);
            setError(null);
            navigate("/MainPage");
        }catch(err) {
            setError(err.response?.data?.message);
        }
    }

    return (
        <>
            <div className={'flex items-center justify-center'}>
                <img className={'relative h-screen w-screen'} src={'./public/background.jpg'}/>
                <div className={'absolute flex flex-col gap-5 items-center justify-center bg-gray-100/20 w-200 h-120 rounded-lg'}>

                    <h1 className={'text-5xl text-center font-bold'}>Logowanie</h1>
                    <div className={'flex flex-row gap-3'}>
                        <input placeholder={"Email"} onChange={(e) => {setEmail(e.target.value)}} className={'w-60 h-9'} type={'email'}/>
                    </div>
                    <div className={'flex flex-row gap-3'}>
                        <input placeholder={"Hasło"} onChange={(e) => {setPassword(e.target.value)}} className={'w-60 h-9'} type={'password'}/>
                    </div>
                    <button onClick={handleLogin} className={'w-60 h-9'} type={'submit'}>Zaloguj się</button>
                    {success && (<c className={'text-green-200 font-bold text-xl'}>Zalogowano pomyślnie!</c>)}
                    {error && (<d className={'text-red-200 font-bold text-xl'}>{error}</d>)}
                </div>
            </div>
        </>
    )
}

export default LoginPage;