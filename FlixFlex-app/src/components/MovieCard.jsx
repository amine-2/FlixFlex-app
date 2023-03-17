import React from 'react'
import { IoPlayCircleSharp } from "react-icons/io5";
import "./MovieCard.css"






const MovieCard = ({ movie, selectMovie,title }) => {
  const IMAGE_PATH = "https://image.tmdb.org/t/p/w342"
  return (
    <div onClick={() => selectMovie(movie)} className="card-container">
      <div className='img-container'>
        {movie.poster_path &&
          <img src={IMAGE_PATH + movie.poster_path} className='movie-img' />
        }
        <div className="img-overlay">
          <IoPlayCircleSharp />
        </div>
      </div>
      <h3 className={"movie-title"}>{title}</h3>
      {movie.vote_average ? <span className={"movie-voting"}>{movie.vote_average}</span> : null}
    </div>
  )
}

export default MovieCard