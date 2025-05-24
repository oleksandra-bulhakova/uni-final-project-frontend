import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <button
            onClick={handleLogout}
            className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-2xl shadow-md"
        >
            Вийти
        </button>
    );
};

export default LogoutButton;