import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import api from "../api/axiosInstance";
import ProfileHeader from "../components/ProfileHeader";
import ContactList from "../components/ContactList";
import VacancyList from "../components/VacancyList";
import UserDetails from "../components/UserDetails";
import AddressBlock from "../components/AddressBlock";
import {FiEdit} from "react-icons/fi";

export default function UserProfilePage() {
    const {userId} = useParams();
    const [user, setUser] = useState(null);

    async function fetchUser() {
        try {
            const response = await api.get(`/users/${userId}`);
            setUser(response.data);
        } catch (error) {
            console.error("Failed to fetch user", error);
        }
    }

    useEffect(() => {
        fetchUser();
    }, [userId]);

    if (!user) return <div>Loading...</div>;

    return (
        <div className="w-full max-w-5xl mx-auto min-h-screen p-10">

            <h2 className="text-3xl font-bold text-center mb-10 flex items-center justify-center gap-6">
                Профіль
                <FiEdit className="text-gray-500 cursor-pointer text-xl"/>
            </h2>

            <div className="flex flex-col md:flex-row gap-12 w-full">
                <div className="w-full md:w-[300px] space-y-6">
                    <ProfileHeader imagePath={user.imagePath} setUser={setUser} userId={user.id}/>
                    <VacancyList vacancies={user.vacancies}/>
                </div>

                <div className="flex-1 space-y-6">
                    <UserDetails
                        firstName={user.firstName}
                        lastName={user.lastName}
                        userRole={user.userRole}
                        userStatus={user.active}
                    />
                    <ContactList contacts={user.contacts}/>
                    <AddressBlock address={user.address} ownerId={user.id} ownableType="USER" onAddressAdded={fetchUser}/>
                </div>
            </div>
        </div>
    );
}