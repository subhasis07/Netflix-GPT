import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constant";
import { addNowPlayingMovies } from "../utils/movieSlice";
import { useEffect } from "react";


const useNowPlayMovies=()=>{
    const dispatch=useDispatch();

    const getPopularMovies= async()=>{
      const data = await fetch("https://api.themoviedb.org/3/movie/popular?page=1",API_OPTIONS);
      const json= await data.json();
  
      // console.log(json.results);
  
      dispatch(addNowPlayingMovies(json.results))
  
    }
  
    useEffect(()=>{
      getPopularMovies();
    },[])
}

export default useNowPlayMovies;