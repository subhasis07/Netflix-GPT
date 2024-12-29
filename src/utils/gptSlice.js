import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name: "gpt",
    initialState:{
        showGPTSearch:false,
        movieNames:null, //OututToGPT
        movieResults:null //ResultReceivedComparedFromTMDBdatabase
    },
    reducers:{
        toggleGPTSearchView: (state)=>{
            state.showGPTSearch=!state.showGPTSearch
        },
        addGPTMovieResults:(state,action)=>{
            const{movieNames, movieResults}=action.payload; 
            state.movieNames=movieNames;
            state.movieResults=movieResults
        }
    }
})

export const {toggleGPTSearchView, addGPTMovieResults} = gptSlice.actions

export default gptSlice.reducer