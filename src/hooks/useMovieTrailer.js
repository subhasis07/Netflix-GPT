import { useDispatch } from "react-redux";
import { addMovieTrailer } from "../utils/movieSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constant";

const useMovieTrailer=(movieID)=>{
    const dispatch=useDispatch();

    const getMovieTrailer=async()=>{
        const data=await fetch("https://api.themoviedb.org/3/movie/"+movieID+"/videos?language=en-US", API_OPTIONS);
        const json= await data.json();
        // console.log(json);

        const filteredData=json.results.filter((video)=>video.type==="Trailer");
        const trailer=filteredData.length?filteredData[0]:json?.results[0];
        // console.log(trailer);

        dispatch(addMovieTrailer(trailer))
    }

    useEffect(()=>{
        getMovieTrailer();
    },[])
}

export default useMovieTrailer;