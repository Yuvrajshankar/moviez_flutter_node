import { fetchFromTMDB } from "../middlewares/tmdb.js";

export async function getTrendingMovie(req, res) {
    try {
        const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/movie/day?language=en-US");
        const limited = data.results.slice(0, 5);
        res.json({ success: true, content: limited });
    } catch (error) {
        console.error("Error fetching trending movies:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export async function getNowPlayingMovies(req, res) {
    try {
        const data = await fetchFromTMDB("https://api.themoviedb.org/3/movie/now_playing");
        res.json({ success: true, content: data.results });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export async function getMovieTrailer(req, res) {
    try {
        const { id } = req.params;
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`);

        // Filter the results for the Official Trailer
        const trailer = data.results.find(video => video.name.includes("Official Trailer") && video.type === "Trailer");

        res.json({ success: true, trailer });
    } catch (error) {
        console.log(error);
        if (error.message.includes("404")) {
            return res.status(404).send(null);
        }
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export async function getMovieDetails(req, res) {
    try {
        const { id } = req.params;
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`);
        res.status(200).json({ success: true, content: data });
    } catch (error) {
        console.log(error);
        if (error.message.includes("404")) {
            return res.status(404).send(null);
        }
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export async function getSimilarMovies(req, res) {
    try {
        const { id } = req.params;
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`);
        res.status(200).json({ success: true, content: data.results });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export async function getRecommendationMovies(req, res) {
    try {
        const { id } = req.params;
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/recommendations?langugae=en-US&page=1`);
        res.status(200).json({ success: true, content: data.results });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export async function getMoviesByCategory(req, res) {
    try {
        const { category } = req.params;
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`);
        res.status(200).json({ success: true, content: data.results });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

