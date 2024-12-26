import React from 'react'
import { MOVIE_POSTER_URL } from '../utils/constant'

const MovieCard = ({posterpath}) => {
    if (!posterpath) return null;

  return (
    <div className="w-36 md:w-48 pr-4 transform transition duration-300 hover:scale-105">
        <img alt='Movie_Card' src={MOVIE_POSTER_URL+posterpath}/>
    </div>
  )
}

export default MovieCard