import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signup from "./pages/Signup";
import Login from "./pages/Login";

function Home() {

    return (

        <h1 className="text-3xl text-center mt-20">

            Dashboard Coming Soon

        </h1>

    );

}

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/signup"
                    element={<Signup />}
                />

            </Routes>

        </BrowserRouter>

    );

}

export default App;