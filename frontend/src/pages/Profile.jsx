import { useEffect, useState } from "react";

import Layout from "../components/Layout";

import {

    getProfile,

    updateProfile,

    changePassword

} from "../services/profileService";

function Profile() {

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [message, setMessage] = useState("");

    const [oldPassword, setOldPassword] = useState("");

    const [newPassword, setNewPassword] = useState("");

    const [passwordMessage, setPasswordMessage] = useState("");

    useEffect(() => {

        loadProfile();

    }, []);

    const loadProfile = async () => {

        try {

            const data = await getProfile();

            setName(data.name);

            setEmail(data.email);

        }

        catch (error) {

            console.log(error);

        }

    };

    const saveProfile = async () => {

        try {

            const response = await updateProfile({

                name,

                email

            });

            setMessage(response.message);

        }

        catch (error) {

            console.log(error);

        }

    };

    const updatePassword = async () => {

        try {

            const response = await changePassword({

                old_password: oldPassword,

                new_password: newPassword

            });

            setPasswordMessage(response.message);

            setOldPassword("");

            setNewPassword("");

        }

        catch (error) {

            if (error.response) {

                setPasswordMessage(error.response.data.message);

            }

        }

    };

    return (

        <Layout>

            <div className="max-w-xl mx-auto bg-white shadow-xl rounded-xl p-8">

                <h1 className="text-3xl font-bold mb-8">

                    My Profile

                </h1>

                <div className="space-y-5">

                    <div>

                        <label className="font-semibold">

                            Name

                        </label>

                        <input

                            className="w-full border rounded-lg p-3 mt-2"

                            value={name}

                            onChange={(e) => setName(e.target.value)}

                        />

                    </div>

                    <div>

                        <label className="font-semibold">

                            Email

                        </label>

                        <input

                            className="w-full border rounded-lg p-3 mt-2"

                            value={email}

                            onChange={(e) => setEmail(e.target.value)}

                        />

                    </div>

                    <button

                        onClick={saveProfile}

                        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"

                    >

                        Update Profile

                    </button>

                    <hr className="my-8" />

                    <h2 className="text-2xl font-bold">

                        Change Password

                    </h2>

                    <div className="space-y-5 mt-5">

                        <input

                            type="password"

                            className="w-full border rounded-lg p-3"

                            placeholder="Current Password"

                            value={oldPassword}

                            onChange={(e) => setOldPassword(e.target.value)}

                        />

                        <input

                            type="password"

                            className="w-full border rounded-lg p-3"

                            placeholder="New Password"

                            value={newPassword}

                            onChange={(e) => setNewPassword(e.target.value)}

                        />

                        <button

                            onClick={updatePassword}

                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"

                        >

                            Change Password

                        </button>

                        {

                            passwordMessage &&

                            <p className="text-blue-600 font-semibold">

                                {passwordMessage}

                            </p>

                        }

                    </div>

                    {message && (

                        <p className="text-green-600 font-semibold">

                            {message}

                        </p>

                    )}

                </div>

            </div>

        </Layout>

    );

}

export default Profile;