import React, {useEffect, useState} from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";


import RegisterPage from "./view/RegisterPage.jsx";
import LoginPage from "./view/LoginPage.jsx";
import MainPage from "./view/MainPage.jsx";
import NavBar from "./view/Navbar.jsx";
import AddCasePage from "./view/AddCasePage.jsx";
import AddItemPage from "./view/AddItemPage.jsx";
import SearchPage from "./view/SearchPage.jsx";
import CaseDetails from "./view/CaseDetails.jsx";
import ItemDetails from "./view/ItemDetails.jsx";
import TopSkins from "./view/Topskins.jsx";

function Apps() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/case/:id" element={<CaseDetails />} />
        <Route path="/item/:id" element={<ItemDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

function Lay() {
    const location = useLocation();
    const hide = ["/", "/RegisterPage"];
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
