import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../services/authService";

function Signup() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();
    
    const register = async () => {

        try {

            const response = await signupUser({
                name,
                email,
                password
            });

            setMessage(response.message);

            setTimeout(() => {

                navigate("/login");

            }, 1500);

        } catch (error) {

            if (error.response) {

                setMessage(error.response.data.message);

            } else {

                setMessage("Registration Failed");

            }

        }

    };

    return (

        <div className="min-h-screen flex justify-center items-center bg-gray-100">

            <div className="bg-white p-8 rounded-xl shadow-lg w-96">

                <h1 className="text-3xl font-bold text-center mb-6">

                    Smart Real Estate Analytics

                </h1>

                <h2 className="text-xl text-center mb-6">

                    Create Account

                </h2>

                <input
                    className="border p-2 w-full rounded mb-4"
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    className="border p-2 w-full rounded mb-4"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    className="border p-2 w-full rounded mb-6"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={register}
                    className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
                >

                    Register

                </button>

                <p className="text-center mt-5">

                    {message}

                </p>

            </div>

        </div>

    );

}

export default Signup;