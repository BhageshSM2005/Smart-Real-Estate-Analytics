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