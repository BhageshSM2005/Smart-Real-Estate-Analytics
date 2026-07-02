import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getLocations, predictPrice } from "../services/predictionService";

function Prediction() {

    const [locations, setLocations] = useState([]);

    const [location, setLocation] = useState("");

    const [sqft, setSqft] = useState("");

    const [bhk, setBhk] = useState("");

    const [bath, setBath] = useState("");

    const [price, setPrice] = useState(null);

    useEffect(() => {

        loadLocations();

    }, []);

    const loadLocations = async () => {

        try {

            const data = await getLocations();

            setLocations(data);

        }

        catch (error) {

            console.log(error);

        }

    };

    const predict = async () => {

        try {

            const response = await predictPrice({

                location,
                sqft,
                bath,
                bhk

            });

            setPrice(response.predicted_price);

        }

        catch (error) {

            console.log(error);

        }

    };

    return (

        <Layout>

            <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-8">

                <h1 className="text-3xl font-bold text-center mb-8">

                    House Price Prediction

                </h1>

                <div className="space-y-6">

                    <div>

                        <label className="font-semibold">

                            Location

                        </label>

                        <select

                            className="w-full border rounded-lg p-3 mt-2"

                            value={location}

                            onChange={(e) => setLocation(e.target.value)}

                        >

                            <option value="">

                                Select Location

                            </option>

                            {locations.map((loc) => (

                                <option

                                    key={loc}

                                    value={loc}

                                >

                                    {loc}

                                </option>

                            ))}

                        </select>

                    </div>

                    <div>

                        <label className="font-semibold">

                            Square Feet

                        </label>

                        <input

                            type="number"

                            className="w-full border rounded-lg p-3 mt-2"

                            placeholder="Enter Square Feet"

                            value={sqft}

                            onChange={(e) => setSqft(e.target.value)}

                        />

                    </div>

                    <div className="grid grid-cols-2 gap-6">

                        <div>

                            <label className="font-semibold">

                                BHK

                            </label>

                            <input

                                type="number"

                                className="w-full border rounded-lg p-3 mt-2"

                                placeholder="Enter BHK"

                                value={bhk}

                                onChange={(e) => setBhk(e.target.value)}

                            />

                        </div>

                        <div>

                            <label className="font-semibold">

                                Bathrooms

                            </label>

                            <input

                                type="number"

                                className="w-full border rounded-lg p-3 mt-2"

                                placeholder="Bathrooms"

                                value={bath}

                                onChange={(e) => setBath(e.target.value)}

                            />

                        </div>

                    </div>

                    <button

                        onClick={predict}

                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"

                    >

                        Predict Price

                    </button>

                    {price !== null && (

                        <div className="mt-8 bg-green-100 border border-green-400 rounded-xl p-6 text-center">

                            <h2 className="text-2xl font-bold text-green-700">

                                Estimated Price

                            </h2>

                            <p className="text-4xl font-bold mt-3">

                                ₹ {price.toFixed(2)} Lakhs

                            </p>

                        </div>

                    )}

                </div>

            </div>

        </Layout>

    );

}

export default Prediction;