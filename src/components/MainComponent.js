import React from 'react'
import { useSelector } from 'react-redux'
import VideoBackground from './VideoBackground';
import VideoTitle from './VideoTitle';

const MainComponent = () => {

    const movies= useSelector(store => store.movies?.nowPlayingMovies);

    if(!movies) return null;
    const movieToDisplay=movies[0];

    const {original_title, overview, id}= movieToDisplay;
    // console.log(movieToDisplay)
  return (

    <div>
        <VideoTitle title={original_title} overview={overview}/>
        <VideoBackground movieID={id}/>
    </div>
  )
}

export default MainComponent