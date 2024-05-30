// SignIn.js
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/auth/signin', {
                name, email, password
            });

            if (response.data.success) {
                console.log("bhaskar");
                await localStorage.setItem('userToken', response.data.token);
                navigate('/dashboard');
            } else {
                setError("Error unable to sign in user");
            }
        } catch (error) {
            setError("Error unable to sign in user");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-400 via-red-500 to-yellow-500">
            <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">Sign In</h2>
                <form onSubmit={handleSignIn} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 font-medium">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-600 transition-transform transform hover:scale-105"
                    >
                        Sign In
                    </button>
                    {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default SignIn;

