import React from 'react';
import './styles/general.scss';
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Pages
import Home from "./pages/home/main";
import Landing from "./pages/landing/main";
import NotFound from "./pages/not-found/main";


export default function Web() {
    return (
        <BrowserRouter basename="/">
            <Routes>
                <Route path="home" element={<Home />} />
                <Route index element={<Landing />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}
