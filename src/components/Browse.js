import React, { useEffect } from 'react'
import Header from './Header'
import useNowPlayMovies from '../hooks/useNowPlayingMovies';

const Browse = () => {

  useNowPlayMovies();
  
  return (
    <div>
      <Header/>
    </div>
  )
}

export default Browse