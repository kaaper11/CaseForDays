import React, {useState} from "react";
import axios from "axios";

const RegisterPage = () => {
    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const handleRegister = async () => {
        try {
            await axios.post('http://localhost:5000/users/register', {
                nickname: nickname,
                email: email,
                password: password,
            })
            setSuccess(true);
            setError(null);
        }catch(err) {
            setError(err.response?.data?.message);
        }
    }

    return (
        <>
            <div className={'flex items-center justify-center'}>
                <img className={'relative h-screen w-screen'} src={'./public/background.jpg'}/>
                <div className={'absolute flex flex-col gap-5 items-center justify-center bg-gray-100/20 w-200 h-120 rounded-lg'}>

                    <h1 className={'text-5xl text-center font-bold'}>Rejestracja</h1>
                    <div className={'flex flex-row gap-6'}>
                        <input placeholder={"Nick"} value={nickname} onChange={(e) => {setNickname(e.target.value)}} className={'w-60 h-9'} type={'text'}/>
                    </div>
                    <div className={'flex flex-row gap-3'}>
                        <input placeholder={"Email"} onChange={(e) => {setEmail(e.target.value)}} className={'w-60 h-9'} type={'email'}/>
                    </div>
                    <div className={'flex flex-row gap-3'}>
                        <input placeholder={"Hasło"} onChange={(e) => {setPassword(e.target.value)}} className={'w-60 h-9'} type={'password'}/>
                    </div>
                    <button onClick={handleRegister} className={'w-60 h-9'} type={'submit'}>Zarejsetruj się</button>
                    {success && (<c className={'text-green-200 font-bold text-xl'}>Zarejestrowano pomyślnie!</c>)}
                    {error && (<d className={'text-red-200 font-bold text-xl'}>{error}</d>)}
                </div>
            </div>
        </>
    )
}

export default RegisterPage;