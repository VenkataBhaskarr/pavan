import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    const handleSignUp = () => {
        navigate("/signup");
    };
    const handleSignIn = () => {
        navigate("/signin");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            <div className="bg-white p-10 rounded-2xl shadow-2xl text-center max-w-lg">
                <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
                    Welcome to My Website!
                </h1>
                <p className="text-lg text-gray-700 mb-10">
                    Join us today and start exploring amazing content.
                </p>
                <div className="flex justify-center space-x-6">
                    <button
                        onClick={handleSignUp}
                        className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition-transform transform hover:scale-105">
                        Sign Up
                    </button>
                    <button
                        onClick={handleSignIn}
                        className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition-transform transform hover:scale-105">
                        Sign In
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Home;
