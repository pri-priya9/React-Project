import { useState, useEffect } from "react";

const API_KEY = "464883f68f2dfb4e8259a6bb9700b21c";
const API_URL = "https://api.themoviedb.org/3";

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/movie/now_playing?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setMovies(data.results));
  }, []);

  return (
    <div className="bg-gradient-to-r from-indigo-200 via-purple-300 to-pink-200 min-h-screen p-6">
      <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-6">
        🎬 Welcome To My Movie Hub 🌐
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movielist) => (
          <div
            key={movielist.id}
            className="bg-white rounded-lg shadow-lg p-4 hover:shadow-2xl transition-shadow transform hover:-translate-y-2 duration-300"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movielist.poster_path}`}
              alt={movielist.title}
              className="rounded-lg w-full h-[350px] object-cover"
            />

            <h2 className="text-lg font-bold text-gray-800 mt-2">
              {movielist.title}
            </h2>

            <p className="text-gray-600 text-sm mt-2 line-clamp-3">
              {movielist.overview}
            </p>

            <div className="flex justify-between items-center mt-3">
              <span className="text-yellow-500 font-bold text-lg">⭐ {movielist.vote_average}</span>
              <span className="text-gray-500 text-sm">
                📅 {movielist.release_date}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;



