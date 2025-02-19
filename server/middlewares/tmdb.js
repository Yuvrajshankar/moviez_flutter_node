import axios from "axios";

export const fetchFromTMDB = async (url) => {
    try {
        const separator = url.includes("?") ? "&" : "?";
        const response = await axios.get(`${url}${separator}api_key=${process.env.TMDB_API_KEY}`);

        // console.log(response.data);
        if (response.status !== 200) {
            throw new Error("Failed to fetch data from TMDB: " + response.statusText);
        }

        return response.data;
    } catch (error) {
        console.error("Error fetching from TMDB:", error.message);
        throw error;
    }
};