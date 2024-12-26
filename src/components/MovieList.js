import React from 'react'
import MovieCard from './MovieCard'

const MovieList = ({title,movies}) => {
    return (
      <div className='px-6 '>
          <h1 className="text-lg md:text-3xl py-4 text-black">{title}</h1>
          <div className="flex overflow-x-scroll">
            <div className="flex cursor-pointer hover:">
                {movies?.map((movie)=>{
                    return <MovieCard key={movie.id} posterpath={movie.poster_path}/>
                })}
            </div>
          </div>
      </div>
    )
}

export default MovieList