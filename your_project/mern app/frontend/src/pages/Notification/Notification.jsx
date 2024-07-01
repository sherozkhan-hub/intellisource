import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Notification = () => {
    const [notifications, setNotifications] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await fetch(`/api/user/getNotifications?recieverId=${currentUser._id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch notifications');
                }
                const data = await response.json();
                setNotifications(data);
                console.log(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchNotifications();
    }, []);

    return (
        <>
            <div className="container mx-auto">
                <h1 className="text-2xl text-center py-4 font-bold mb-4">Notifications</h1>
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
                {notifications.map((notification) => (
                    <div key={notification._id} className="flex items-center shadow-md mb-4 border-gray-300 rounded-xl px-6 p-4">
                        <img src={notification.sender.profilePicture} alt="Profile" className="w-10 h-10 rounded-full mr-3" />
                        <div>
                            <p className="text-sm font-medium">{notification.sender.username}</p>
                            <p className="text-sm text-gray-600">{notification.message}</p>
                            <p className="text-xs text-gray-500">{notification.createdAt}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Notification;
