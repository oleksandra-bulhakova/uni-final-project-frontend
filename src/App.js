import React from 'react';
import {Routes, Route} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FinishRegistrationPage from "./pages/FinishRegistrationPage";
import MainPage from './pages/MainPage';
import Header from './components/Header';
import ChangePasswordPage from "./pages/ChangePasswordPage";
import Sidebar from './components/Sidebar';
import UserProfilePage from "./pages/UserProfilePage";
import AddClientPage from "./pages/AddClientPage";
import AllClientsPage from "./pages/AllClientsPage";
import AllUsersPage from "./pages/AllUsersPage";
import AddVacancyPage from "./pages/AddVacancyPage";
import AllVacanciesPage from "./pages/AllVacanciesPage";
import HomePageGuest from "./pages/HomePageGuest";
import {getUserId} from "./utils/auth";
import VacancyDetailsPage from "./pages/VacancyDetailsPage";
import ClientDetailsPage from "./pages/ClientDetailsPage";
import CreateCandidatePage from "./pages/CreateCandidatePage";
import AllCandidatesPage from "./pages/AllCandidatesPage";
import CandidateDetailsPage from "./pages/CandidateDetailsPage";

export default function App() {
    function HomeRoute() {
        const userId = getUserId();
        return userId ? <MainPage /> : <HomePageGuest />;
    }
    return (
        <div className="min-h-screen bg-[#f6f6f6]">
            <header className="w-full bg-[#f6f6f6] px-4 py-2 flex justify-between items-center shadow-sm z-10">
                <Header/>
            </header>

            <div className="flex">
                <aside className="w-64 p-4 min-h-screen">
                    <Sidebar/>
                </aside>

                <main className="flex-1 p-10">

                    <Routes>
                        <Route path="/" element={<HomeRoute />} />
                        <Route path="/finish" element={<FinishRegistrationPage/>}/>
                        <Route path="/main" element={<MainPage/>}/>
                        <Route path="/change-password" element={<ChangePasswordPage/>}/>
                        <Route path="/user/:userId" element={<UserProfilePage/>}/>
                        <Route path="/add-client" element={<AddClientPage/>}/>
                        <Route path="/clients" element={<AllClientsPage/>}/>
                        <Route path="/users" element={<AllUsersPage/>}/>
                        <Route path="/add-vacancy" element={<AddVacancyPage/>}/>
                        <Route path="/vacancies" element={<AllVacanciesPage/>}/>
                        <Route path="/vacancies/:vacancyId" element={<VacancyDetailsPage/>}/>
                        <Route path="/clients/:clientId" element={<ClientDetailsPage/>}/>
                        <Route path="/candidates" element={<AllCandidatesPage/>}/>
                        <Route path="/create-candidate" element={<CreateCandidatePage/>}/>
                        <Route path="/candidates/:candidateId" element={<CandidateDetailsPage/>}/>
                    </Routes>
                </main>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={1000}
                toastStyle={{marginTop: '80px'}}
            />
        </div>
    );
}

function Home() {
    return (
        <div className="flex flex-col items-center w-full max-w-xl px-4">

        </div>
    );
}