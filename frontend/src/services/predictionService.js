import API from "./api";

export const getLocations = async () => {

    const response = await API.get("/locations");

    return response.data.locations;

};

export const predictPrice = async (data) => {

    const response = await API.post(
        "/predict",
        data
    );

    return response.data;

};

export const getPredictionHistory = async () => {

    const response = await API.get("/history");

    return response.data;

};

export const getAnalytics = async () => {

    const response = await API.get(
        "/analytics"
    );

    return response.data;

};