import {Link, useNavigate} from 'react-router-dom';
import React, {useState} from 'react';
import logo from '../assets/logo.png';
import {getUserRole} from '../utils/auth';
import {useAuth} from '../context/AuthContext';
import AddUserModal from '../components/AddUserModal';
import {getUserStatus} from '../utils/auth';
import LoginFormModal from "./LoginFormModal";
import FirstRegistrationModal from "./FirstRegistrationModal";
import ResetRequestModal from "./ResetRequestModal";


export default function Header() {
    const [showModal, setShowModal] = useState(false);
    const role = getUserRole();
    const status = getUserStatus();
    const navigate = useNavigate();
    const {isAuthenticated, logout} = useAuth();
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [showResetModal, setShowResetModal] = useState(false);

    const handleLogout = () => {
        logout();
        navigate("/")
    };

    return (
        <header className="w-full bg-[#f6f6f6] p-4 flex justify-between items-center">
            <Link to="/">
                <img src={logo} alt="SmartBase Logo" className="h-24"/>
            </Link>
            <div className="space-x-4">
                {isAuthenticated ? (
                    <>
                        {role === 'OWNER' && (
                            <>
                                <button
                                    onClick={() => setShowModal(true)}
                                    className="bg-[#FE7C7C] hover:bg-[#58618E] text-white font-bold py-4 px-6 rounded-2xl text-xl"
                                >
                                    Додати користувача
                                </button>
                                <AddUserModal isOpen={showModal} onClose={() => setShowModal(false)}/>
                            </>
                        )}
                        <>
                            {status === 'true' && (
                                <button
                                    onClick={handleLogout}
                                    className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-4 px-6 rounded-2xl text-xl"
                                >
                                    Вийти
                                </button>

                            )}
                        </>

                    </>
                ) : (
                    <>
                            <button
                                onClick={() => setShowLoginModal(true)}
                                className="bg-[#fcb03d] hover:bg-[#e59e30] text-white font-bold py-4 px-6 rounded-2xl text-xl">
                                Увійти
                            </button>
                        <LoginFormModal
                            isOpen={showLoginModal}
                            onClose={() => setShowLoginModal(false)}
                            openResetModal={() => {
                                setShowLoginModal(false);
                                setShowResetModal(true);
                            }}
                        />

                        <ResetRequestModal
                            isOpen={showResetModal}
                            onClose={() => setShowResetModal(false)}
                        />
                            <button
                                onClick={() => setShowRegisterModal(true)}
                                className="bg-[#fcb03d] hover:bg-[#e59e30] text-white font-bold py-4 px-6 rounded-2xl text-xl">
                                Зареєструвати компанію
                            </button>
                        <FirstRegistrationModal isOpen={showRegisterModal} onClose={() => setShowRegisterModal(false)}/>
                    </>
                )}
            </div>
        </header>
    );
}
