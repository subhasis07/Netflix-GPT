import React, { useEffect } from 'react'
import Header from './Header'
import useNowPlayMovies from '../hooks/useNowPlayingMovies';
import MainComponent from './MainComponent';
import SecondaryComponent from './SecondaryComponent';

const Browse = () => {

  useNowPlayMovies();
  
  return (
    <div>
      <Header/>
      <MainComponent/>
      <SecondaryComponent/>
    </div>
  )
}

export default Browse