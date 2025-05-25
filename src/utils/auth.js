import { jwtDecode } from 'jwt-decode';

export function getUserRole() {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
        const decoded = jwtDecode(token);
        return decoded?.role;
    } catch (e) {
        console.error('Failed to decode token:', e);
        return null;
    }
}

export function getUserStatus() {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
        const decoded = jwtDecode(token);
        return decoded?.status;
    } catch (e) {
        console.error('Failed to decode token:', e);
        return null;
    }
}

export function getUserId() {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
        const decoded = jwtDecode(token);
        return decoded?.id;
    } catch (e) {
        console.error('Failed to decode token:', e);
        return null;
    }
}