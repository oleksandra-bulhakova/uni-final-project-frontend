import React from 'react';
import {Routes, Route} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FinishRegistrationPage from "./pages/FinishRegistrationPage";
import MainPage from './pages/MainPage';
import Header from './components/Header';
import ChangePasswordPage from "./pages/ChangePasswordPage";
import Sidebar from './components/Sidebar';

export default function App() {
    return (
        <div className="min-h-screen bg-[#f6f6f6]">
            <header className="w-full bg-[#f6f6f6] p-4 flex justify-between items-center">
                <Header/>
            </header>

            <div className="flex">
                <Sidebar/>
            </div>
            <div className="pt-8 flex flex-col items-center justify-center">

                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/finish" element={<FinishRegistrationPage/>}/>
                    <Route path="/main" element={<MainPage/>}/>
                    <Route path="/change-password" element={<ChangePasswordPage/>}/>
                </Routes>
                <ToastContainer
                    position="top-center"
                    autoClose={1000}
                    toastStyle={{marginTop: '80px'}}
                />
            </div>
        </div>
    );
}

function Home() {
    return (
        <div className="flex flex-col items-center w-full max-w-xl px-4">

        </div>
    );
}