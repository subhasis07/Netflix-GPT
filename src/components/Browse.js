import React, { useEffect } from 'react'
import Header from './Header'
import useNowPlayMovies from '../hooks/useNowPlayingMovies';
import MainComponent from './MainComponent';
import SecondaryComponent from './SecondaryComponent';
import GptSearch from './GptSearch';
import { useSelector } from 'react-redux';


const Browse = () => {

  const GPTsearchState=useSelector((store)=>store.gpt.showGPTSearch)

  useNowPlayMovies();
  
  return (
    <div>
      <Header/>
      {GPTsearchState ?
          <GptSearch/> :
        <>
          <MainComponent/>
          <SecondaryComponent/>
        </> }
      

    </div>
  )
}

export default Browse