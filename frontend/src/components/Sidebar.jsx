import { NavLink } from "react-router-dom";
import {
    FaHome,
    FaChartBar,
    FaHistory,
    FaUser,
    FaSignOutAlt,
    FaRobot
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Sidebar() {
    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("token");

        navigate("/login");

    };
    return (

        <div className="fixed left-0 top-0 h-screen w-64 bg-green-700 text-white shadow-lg">

            <div className="text-center py-6 border-b border-orange-500">

                <h1 className="text-2xl font-bold">

                    Smart Real Estate

                </h1>

            </div>

            <nav className="flex flex-col mt-6">

                <NavLink
                    to="/"
                    className="flex items-center gap-3 px-6 py-4 hover:bg-orange-800"
                >
                    <FaHome />
                    Dashboard
                </NavLink>

                <NavLink
                    to="/prediction"
                    className="flex items-center gap-3 px-6 py-4 hover:bg-orange-800"
                >
                    <FaRobot />
                    Prediction
                </NavLink>

                <NavLink
                    to="/analytics"
                    className="flex items-center gap-3 px-6 py-4 hover:bg-orange-800"
                >
                    <FaChartBar />
                    Analytics
                </NavLink>

                <NavLink
                    to="/history"
                    className="flex items-center gap-3 px-6 py-4 hover:bg-orange-800"
                >
                    <FaHistory />
                    History
                </NavLink>

                <NavLink
                    to="/profile"
                    className="flex items-center gap-3 px-6 py-4 hover:bg-orange-800"
                >
                    <FaUser />
                    Profile
                </NavLink>

            </nav>

            <div className="absolute bottom-0 w-full">

                <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-6 py-4 bg-red-600 hover:bg-red-700"
                >
                    <FaSignOutAlt />
                    Logout
                </button>

            </div>

        </div>

    );

}

export default Sidebar;