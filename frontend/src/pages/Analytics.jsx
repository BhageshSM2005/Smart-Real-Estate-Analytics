import { useEffect, useState } from "react";

import Layout from "../components/Layout";

import { getAnalytics } from "../services/predictionService";


import {
    Bar,
    Pie
} from "react-chartjs-2";

import {

    Chart as ChartJS,

    CategoryScale,

    LinearScale,

    BarElement,

    ArcElement,

    Tooltip,

    Legend

} from "chart.js";

ChartJS.register(

    CategoryScale,

    LinearScale,

    BarElement,

    ArcElement,

    Tooltip,

    Legend

);


function Analytics() {

    const [analytics, setAnalytics] = useState({

        total_predictions: 0,
        average_price: 0,
        highest_price: 0,
        lowest_price: 0

    });

    useEffect(() => {

        loadAnalytics();

    }, []);

    const loadAnalytics = async () => {

        try {

            const data = await getAnalytics();

            setAnalytics(data);

        }

        catch (error) {

            console.log(error);

        }

    };

    const barData = {

        labels: [

            "Average",
            "Highest",
            "Lowest"

        ],

        datasets: [

            {

                label: "Price (Lakhs)",

                data: [

                    analytics.average_price,

                    analytics.highest_price,

                    analytics.lowest_price

                ]

            }

        ]

    };

    const pieData = {

        labels: [

            "Predictions"

        ],

        datasets: [

            {

                data: [

                    analytics.total_predictions

                ]

            }

        ]

    };

    return (

        <Layout>

            <h1 className="text-4xl font-bold mb-8">

                Analytics Dashboard

            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">

                <div className="bg-white p-6 rounded-xl shadow-lg">

                    <h2 className="text-2xl font-bold mb-5">

                        Price Comparison

                    </h2>

                    <Bar data={barData} />

                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg">

                    <h2 className="text-2xl font-bold mb-5">

                        Total Predictions

                    </h2>

                    <Pie data={pieData} />

                </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                <div className="bg-blue-500 text-white rounded-xl p-6 shadow-lg">

                    <h2 className="text-xl font-semibold">

                        Total Predictions

                    </h2>

                    <p className="text-4xl mt-4 font-bold">

                        {analytics.total_predictions}

                    </p>

                </div>

                <div className="bg-green-500 text-white rounded-xl p-6 shadow-lg">

                    <h2 className="text-xl font-semibold">

                        Average Price

                    </h2>

                    <p className="text-4xl mt-4 font-bold">

                        ₹ {analytics.average_price} L

                    </p>

                </div>

                <div className="bg-yellow-500 text-white rounded-xl p-6 shadow-lg">

                    <h2 className="text-xl font-semibold">

                        Highest Price

                    </h2>

                    <p className="text-4xl mt-4 font-bold">

                        ₹ {analytics.highest_price} L

                    </p>

                </div>

                <div className="bg-red-500 text-white rounded-xl p-6 shadow-lg">

                    <h2 className="text-xl font-semibold">

                        Lowest Price

                    </h2>

                    <p className="text-4xl mt-4 font-bold">

                        ₹ {analytics.lowest_price} L

                    </p>

                </div>

            </div>

        </Layout>

    );

}

export default Analytics;