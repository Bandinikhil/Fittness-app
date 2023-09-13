import { createSlice } from "@reduxjs/toolkit";


const searchResultSlice = createSlice({
    name : "suggestions",
    initialState:{
        searchResults:[],
        checkResults : false,
    },
    reducers : {
        setSearchVideoAction : (state,action)=>{
            state.searchResults.push(action.payload)
        },
        removeSearchVideoAction : (state)=>{
             state.searchResults = [];
        },
        setSearchResults : (state,action) => {
            state.checkResults = action.payload;
        }
    }
})

export const {setSearchVideoAction,setSearchResults,removeSearchVideoAction} = searchResultSlice.actions;
export default searchResultSlice.reducer
