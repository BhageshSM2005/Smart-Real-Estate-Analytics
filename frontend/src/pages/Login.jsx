import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const login = async () => {

        try {

            const response = await loginUser({
                email,
                password
            });

            localStorage.setItem(
                "token",
                response.token
            );

            setMessage(response.message);

            navigate("/");

        }

        catch (error) {

            if (error.response) {

                setMessage(error.response.data.message);

            }

            else {

                setMessage("Login Failed");

            }

        }

    };

    return (

        <div className="min-h-screen flex justify-center items-center bg-gray-100">

            <div className="bg-white shadow-xl rounded-xl p-8 w-96">

                <h1 className="text-3xl font-bold text-center mb-6">
                    Smart Real Estate Analytics
                </h1>

                <h2 className="text-xl text-center mb-6">
                    Welcome Back
                </h2>

                <input
                    className="border p-2 rounded w-full mb-4"
                    placeholder="Email"
                    onChange={(e)=>setEmail(e.target.value)}
                />

                <input
                    type="password"
                    className="border p-2 rounded w-full mb-6"
                    placeholder="Password"
                    onChange={(e)=>setPassword(e.target.value)}
                />

                <button
                    onClick={login}
                    className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded"
                >
                    Login
                </button>

                <p className="text-center mt-5">

                    {message}

                </p>

            </div>

        </div>

    );

}

export default Login;