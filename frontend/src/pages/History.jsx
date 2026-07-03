import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getPredictionHistory } from "../services/predictionService";

function History() {

    const [history, setHistory] = useState([]);

    useEffect(() => {

        loadHistory();

    }, []);

    const loadHistory = async () => {

        try {

            const data = await getPredictionHistory();

            setHistory(data);

        }

        catch (error) {

            console.log(error);

        }

    };

    return (

        <Layout>

            <div className="bg-white rounded-xl shadow-lg p-8">

                <h1 className="text-3xl font-bold mb-8">

                    Prediction History

                </h1>

                <div className="overflow-x-auto">

                    <table className="w-full border-collapse">

                        <thead>

                            <tr className="bg-blue-600 text-white">

                                <th className="p-3">Location</th>
                                <th className="p-3">Sqft</th>
                                <th className="p-3">BHK</th>
                                <th className="p-3">Bath</th>
                                <th className="p-3">Price (Lakhs)</th>
                                <th className="p-3">Date</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                history.map((item) => (

                                    <tr
                                        key={item.id}
                                        className="border-b text-center hover:bg-gray-100"
                                    >

                                        <td className="p-3">{item.location}</td>

                                        <td>{item.sqft}</td>

                                        <td>{item.bhk}</td>

                                        <td>{item.bath}</td>

                                        <td>

                                            ₹ {item.predicted_price.toFixed(2)}

                                        </td>

                                        <td>{item.created_at}</td>

                                    </tr>

                                ))

                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </Layout>

    );

}

export default History;