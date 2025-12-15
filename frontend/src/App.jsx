import React, {useEffect, useState} from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";


import RegisterPage from "./view/RegisterPage.jsx";
import LoginPage from "./view/LoginPage.jsx";

function Lay() {
    const location = useLocation();
    const hide = ["/", "/RegisterPage"];
    const navHide = hide.includes(location.pathname);

    return (
        <div>
            {/*{!navHide && <NavBar />}*/}
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/RegisterPage" element={<RegisterPage />} />
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
