// Dashboard.js
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('userToken');
            if (!token) {
                navigate('/signin');
                return;
            }
            try {
                const response = await axios.get('https://miniature-journey.onrender.com/api/auth/user', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.data.success) {
                    if (response.data.role === 'user') {
                        setUser(response.data.user);
                    } else if (response.data.role === 'admin') {
                        const usersResponse = await axios.get('https://miniature-journey.onrender.com/api/auth/users', {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        });
                        if (usersResponse.data.success) {
                            setUsers(usersResponse.data.users);
                        } else {
                            navigate('/signin');
                        }
                    }
                } else {
                    navigate('/signin');
                }
            } catch (error) {
                navigate('/signin');
            }
        };
        fetchUserData();
    }, []);

    return (
        <div>
            {user && (
                <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
                    <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">
                        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">Dashboard</h2>
                        <div className="space-y-4 text-lg">
                            <p><strong>Name:</strong> {user.name}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Gender:</strong> {user.gender}</p>
                        </div>
                    </div>
                </div>
            )}
            {users.length > 0 && (
                <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-400 via-red-500 to-yellow-500">
                    <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-4xl">
                        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">Admin Dashboard</h2>
                        <table className="min-w-full bg-white border-collapse">
                            <thead>
                            <tr>
                                <th className="py-3 px-6 border-b-2 border-gray-200 bg-gray-100 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">Name</th>
                                <th className="py-3 px-6 border-b-2 border-gray-200 bg-gray-100 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">Email</th>
                                <th className="py-3 px-6 border-b-2 border-gray-200 bg-gray-100 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">Gender</th>
                            </tr>
                            </thead>
                            <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td className="py-4 px-6 border-b border-gray-200">{user.name}</td>
                                    <td className="py-4 px-6 border-b border-gray-200">{user.email}</td>
                                    <td className="py-4 px-6 border-b border-gray-200">{user.gender}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;

