import React, {useEffect, useState} from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";


import RegisterPage from "./view/RegisterPage.jsx";
import LoginPage from "./view/LoginPage.jsx";
import MainPage from "./view/MainPage.jsx";
import NavBar from "./view/Navbar.jsx";
import AddCasePage from "./view/AddCasePage.jsx";
import AddItemPage from "./view/AddItemPage.jsx";
import CasesPage from "./view/CasesPage.jsx";
import OpenCasePage from "./view/OpenCasePage.jsx";
import PremiumPage from "./view/PremiumPage.jsx";
import ProfilePage from "./view/ProfilePage.jsx";
import AddBalancePage from "./view/AddBalancePage.jsx";
import PaymentSimulationPage from "./view/PaymentSimulationPage.jsx";
import SearchPage from "./view/SearchPage.jsx";

function Lay() {
    const location = useLocation();
    const hide = ["/", "/RegisterPage", "/registerPage"];
    const navHide = hide.includes(location.pathname);

    return (
        <div>
            {!navHide && <NavBar />}
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/RegisterPage" element={<RegisterPage />} />
                <Route path="/MainPage" element={<MainPage />} />
                <Route path="/AddCasePage" element={<AddCasePage />} />
                <Route path="/AddItemPage" element={<AddItemPage />} />
                <Route path="/cases" element={<CasesPage />} />
                <Route path="/cases/:id" element={<OpenCasePage />} />
                <Route path="/PremiumPage" element={<PremiumPage />} />
                <Route path="/ProfilePage" element={<ProfilePage />} />
                <Route path="/AddBalancePage" element={<AddBalancePage />} />
                <Route path="/PaymentSimulationPage" element={<PaymentSimulationPage />} />
                <Route path="/SearchPage" element={<SearchPage />} />
            </Routes>
        </div>
    );
}


export default function App() {
    return (
        <Router>
            <Lay />
        </Router> );
}
