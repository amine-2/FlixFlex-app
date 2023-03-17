import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import './Movies.css'
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Card from "../../components/MovieCard";
import { useStateContext } from "../../contexts/StateContext";


const Movies = () => {

    const MOVIE_API = "https://api.themoviedb.org/3/"
    const SEARCH_MOVIE_API = MOVIE_API + "search/movie"
    const SERIES_API = MOVIE_API + "discover/tv"
    const DISCOVER_API = MOVIE_API + "discover/movie"
    const TRENDING_API = MOVIE_API + "trending/all/week"
    const API_KEY = "0415d34d78aeee21e7c9aaff8a22da93"
    const BACKDROP_PATH = "https://image.tmdb.org/t/p/w1280"

    const [movie, setMovie] = useState({ title: "Loading Movies" })
    const [movies, setMovies] = useState([])
    const [addOn, setAddOn] = useState(10)
    const [playing, setPlaying] = useState(false)
    const { cookies, setLoggedIn, loggedIn, searchKey, setTrailer } = useStateContext();
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchMovies()
    }, [])

    const fetchMovies = async (event) => {
        if (event) {
            event.preventDefault()
        }
        const { data } = await axios.get(`${searchKey ? SEARCH_MOVIE_API : DISCOVER_API}`, {
            params: {
                api_key: API_KEY,
                query: searchKey
            }
        })
        setMovies(data.results)
        setMovie(data.results[0])
        if (data.results.length) {
            await fetchMovie(data.results[0].id)
        }
    }

    const fetchMovie = async (id) => {
        const { data } = await axios.get(`${MOVIE_API}movie/${id}`, {
            params: {
                api_key: API_KEY,
                append_to_response: "videos"
            }
        })

        if (data.videos && data.videos.results) {
            const trailer = data.videos.results.find(vid => vid.name === "Official Trailer")
            console.log(data.videos)
            setTrailer(trailer ? trailer : data.videos.results[0])
        }

        setMovie(data)
    }


    const selectMovie = (movie) => {
        fetchMovie(movie.id)
        setPlaying(false)
        setMovie(movie)
        window.scrollTo(0, 0)
    }

    const renderMovies = () => (
        movies.slice(0, addOn).map(movie => (
            <Card
                selectMovie={selectMovie}
                key={movie.id}
                movie={movie}
                title={movie.title}
            />
        ))
    )


    const addMovie = () => {
        setAddOn(addOn + 10)
    }


    useEffect(() => {
        setLoggedIn(true);
    }, []);

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    };



    return (
        <>
            {loggedIn && <div className="board">
                <Navbar isScrolled={isScrolled}
                    fetch={fetchMovies} />
                <div className="hero">
                    <img
                        src={`${BACKDROP_PATH}${movie.backdrop_path}`}
                        alt=""
                        className="background-image"
                    />
                    <div className="container">
                        <div className="logo">
                            <h1>{movie.title}</h1>
                            <h3>{movie.tagline}</h3>
                        </div>
                        <div className="buttons">
                            <button
                                onClick={() => navigate("/player")}
                                className="hero-button"
                            >
                                <FaPlay />
                                Play
                            </button>
                            <button className="hero-button">
                                <AiOutlineInfoCircle />
                                More Info
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className="section-title">Movies</h2>
                    <div className="movie-cont">
                        {renderMovies()}
                    </div>
                    <button className="secondary-button" onClick={addMovie}>load more</button>
                </div>
            </div>}
        </>
    );
}


export default Movies;