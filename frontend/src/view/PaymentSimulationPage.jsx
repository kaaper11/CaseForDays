import {useNavigate} from "react-router-dom";

const PaymentSimulationPage = () => {
    const navigate = useNavigate();
    return (
        <div className={'flex items-center justify-center py-10 flex-col gap-10'}>
            <h1>Symulacja płatności...</h1>
            <button onClick={() => navigate('/MainPage')}>Strona główna</button>
        </div>
    )
}
export default PaymentSimulationPage