import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import './Series.css'
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Card from "../../components/MovieCard";
import { useStateContext } from "../../contexts/StateContext";


const Series = () => {

    const MOVIE_API = "https://api.themoviedb.org/3/"
    const SEARCH_MOVIE_API = MOVIE_API + "search/movie"
    const SEARCH_SERIES_API = MOVIE_API + "search/tv"
    const SERIES_API = MOVIE_API + "discover/tv"
    const DISCOVER_API = MOVIE_API + "discover/movie"
    const TRENDING_API = MOVIE_API + "trending/all/week"
    const API_KEY = "0415d34d78aeee21e7c9aaff8a22da93"
    const BACKDROP_PATH = "https://image.tmdb.org/t/p/w1280"

    const [serie, setSerie] = useState({ title: "Loading Movies" })
    const [series, setSeries] = useState([])
    const [addOn, setAddOn] = useState(10)



    const { loggedIn, searchKey, setTrailer } = useStateContext();
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();





    useEffect(() => {
        fetchSeries()
    }, [])

    const fetchSeries = async (event) => {
        if (event) {
            event.preventDefault()
        }
        const { data } = await axios.get(`${searchKey ? SEARCH_SERIES_API : SERIES_API}`, {
            params: {
                api_key: API_KEY,
                query: searchKey
            }
        })
        console.log(data)
        setSeries(data.results)
        setSerie(data.results[0])
        if (data.results.length) {
            await fetchSerie(data.results[0].id)
        }
    }

    const fetchSerie = async (id) => {
        const { data } = await axios.get(`${MOVIE_API}tv/${id}`, {
            params: {
                api_key: API_KEY,
                append_to_response: "videos"
            }
        })

        console.log(data)

        if (data.videos && data.videos.results) {
            const trailer = data.videos.results.find(vid => vid.name === "Official Trailer")
            setTrailer(trailer ? trailer : data.videos.results[0])
        }

        setSerie(data)

    }


    const selectSerie = (serie) => {
        fetchSerie(serie.id)
        setSerie(serie)
        window.scrollTo(0, 0)
    }

    const renderSeries = () => (
        series.slice(0, addOn).map(serie => (
            <Card
                selectMovie={selectSerie}
                key={serie.id}
                movie={serie}
                title={serie.name}
            />
        ))
    )

    const addMovie = () => {
        setAddOn(addOn + 10)
    }




    return (
        <>
            {loggedIn && <div className="board">
                <Navbar isScrolled={isScrolled}
                    fetch={fetchSeries} />
                <div className="hero">
                    <img
                        src={`${BACKDROP_PATH}${serie.backdrop_path}`}
                        alt=""
                        className="background-image"
                    />
                    <div className="container">
                        <div className="logo">
                            <h1>{serie.name}</h1>
                            <h3>{serie.tagline}</h3>
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
                {renderSeries && <div>
                    <h2 className="section-title">Series</h2>
                    <div className="movie-cont">
                        {renderSeries()}
                    </div>
                </div>}
                <button className="secondary-button" onClick={addMovie}>load more</button>
            </div>}
        </>
    );
}


export default Series;