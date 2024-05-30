// SignUp.js
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignIn = () => {
        navigate("/signin");
    }

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/auth/signup', {
                name, email, password, gender
            });
            console.log(response.data)
            if (response.data.success) {
                await localStorage.setItem('userToken', response.data.token);
                navigate('/dashboard');
            } else {
                setError("Error unable to signup user");
            }
        } catch (error) {
            setError("Error unable to signup user");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
            <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">Sign Up</h2>
                <form onSubmit={handleSignUp} className="space-y-6">
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
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Gender</label>
                        <div className="flex items-center space-x-6">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    value="Male"
                                    checked={gender === 'Male'}
                                    onChange={(e) => setGender(e.target.value)}
                                    className="form-radio text-blue-600"
                                />
                                <span className="ml-2 text-gray-700">Male</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    value="Female"
                                    checked={gender === 'Female'}
                                    onChange={(e) => setGender(e.target.value)}
                                    className="form-radio text-pink-600"
                                />
                                <span className="ml-2 text-gray-700">Female</span>
                            </label>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-600 transition-transform transform hover:scale-105">
                        Sign Up
                    </button>
                    {error && <div className="text-red-500 mt-4">{error}</div>}
                    <div className="text-center mt-4">
                        <button onClick={handleSignIn} className="text-indigo-700 hover:underline">
                            Back to Sign In?
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;

