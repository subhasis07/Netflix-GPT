import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import lang from '../utils/languageConstants'
import openai from '../utils/openai'
import { API_OPTIONS } from '../utils/constant'

const GptSearchBar = () => {

    const dispatch=useDispatch();
    const langKey=useSelector(store => store.config.lang)
    const serachedText=useRef(null);

    const searchMoviesTMDB = async(movie)=>{
        const data=fetch("https://api.themoviedb.org/3/search/movie?query=" +
            movie +
            "&include_adult=false&language=en-US&page=1",
            API_OPTIONS);
        const json= await data.json();

        return json.result;
    }

    const handleGPTResult=async()=>{
        //console.log(serachedText.current.value);

        const gptQuery= 
        "Act as a Movie Recommendation system and suggest some movies for the query : " +
        serachedText.current.value +
        ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Movie1,Movie2,Movie3,Movie4,Movie5";
  
        const gptResults = await openai.chat.completions.create({
            messages: [{ role: "user", content: gptQuery }],
            model: "gpt-3.5-turbo",
        });

        // console.log(gptResults.choices?.[0]?.message?.content);
        //ex res pf above query:  Andaz Apna Apna, Hera Pheri, Chupke Chupke, Jaane Bhi Do Yaaro, Padosan
        
        //making the res as array format
        const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");
        // ["Andaz Apna Apna", "Hera Pheri", "Chupke Chupke", "Jaane Bhi Do Yaaro", "Padosan"]
    
        //searchiing in TMDB database
        const promiesArr=gptMovies.map((movie)=>searchMoviesTMDB(movie));

        const getAllMoviesfromTMDB=await Promise.all(promiesArr);

        // console.log(getAllMoviesfromTMDB);
        
        dispatch(getAllMoviesfromTMDB({
            movieNames:gptMovies, 
            movieResults:getAllMoviesfromTMDB
        }))

    }
    
  return (
    <div className='pt-[15%] flex justify-center'>
        <form className='w-1/2 bg-gray-700 grid grid-cols-12' 
            onSubmit={(e)=>e.preventDefault()}>
            <input
                ref={serachedText}
                type='text'
                className='p-4 m-4 col-span-9'
                placeholder={lang[langKey].gptSearchPlaceholder}
            />
            <button className='col-span-3 m-4 py-2 px-4 bg-red-600 text-white rounded-md'
                onClick={handleGPTResult}>
                {lang[langKey].search}
            </button>
        </form>
    </div>
  )
}

export default GptSearchBar