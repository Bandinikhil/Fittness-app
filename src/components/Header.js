import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { SEARCH_SUGGESTIONS } from '../utils/constants';
import { cacheResults } from '../utils/searchSlice';
import { removeSearchVideoAction, setSearchResults, setSearchVideoAction } from '../utils/searchResultSlice';

const Header = () => {

    const [searchQuery, setSearchQuery] = useState('');
    const [searchdata,setSearchData] = useState([]);
    const [suggestionsVisible, setSuggestionsVisible] = useState(false);
    const searchCache = useSelector((store) => store.search);
   // const [selectedSuggestion, setSelectedSuggestion] = useState('');
    const searchResults = useSelector((store)=> store.suggestions.searchResults);
    
    const dispatch = useDispatch();
     
    //useEffect for search suggestions with debouncing feature and while clickng backspace it does not make api calls, as suggestions data will be stored in cache using redux and fetches suggesting from cache
    useEffect(()=>{
        const timer = setTimeout(()=>{
            if(searchCache[searchQuery]){
                setSearchData(searchCache[searchQuery])
            }else{
                getSearchSuggestions();
            }
        },200)
        return ()=>{
            clearTimeout(timer)
        }
        
    },[searchQuery])

//API call for fetching suggestions
    const getSearchSuggestions = async()=>{
         const data = await fetch(SEARCH_SUGGESTIONS + searchQuery);
         const json = await data?.json();
         console.log(json);
         setSearchData(json[1] || []);
    dispatch(
      cacheResults({
        [searchQuery]: json[1] || [],
      }))
    }

    //To load data based on the search query 
    const getSearchVideos = async(searchText)=>{
    const data = await fetch(`https://corsproxy.io/?https://asia-south1-socialboat-dev.cloudfunctions.net/assignmentVideos?q=${searchText}%20query%20by%20user&numResults=16`);
    const json = await data?.json();
    console.log(json?.results);
    dispatch(removeSearchVideoAction());
    dispatch(setSearchVideoAction(json?.results));
    if(searchResults.length >0){
    dispatch(setSearchResults(true))
    }else{
        dispatch(setSearchResults(false));
    }
}

// to handle the onClick of the suggestions
    const handleSuggestionClick = (suggestion) => {
        
        setSearchQuery(suggestion);
        setSuggestionsVisible(false); // Close suggestions when a suggestion is clicked
        getSearchVideos(searchQuery);
        
      };

      const handleInputFocus = () => {
        setSuggestionsVisible(true);
      };
    
      const handleInputBlur = () => {
        // Delay the closing of suggestions to allow clicking on a suggestion
        setTimeout(() => {
          setSuggestionsVisible(false);
        }, 300);
      };

      const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          getSearchVideos(searchQuery);
          handleInputBlur();
       
        }
      };

  return (
    <div className='grid grid-flow-col p-1 shadow-lg sticky top-0 bg-gray-200 z-50 no-scrollbar'>
    <div className='flex col-span-1 mx-2 px-2 items-center'>
      
        <img src="https://ik.imagekit.io/socialboat/Component_6__1__CgPWY-2O0.png?ik-sdk-version=javascript-1.4.3&amp;updatedAt=1663242315232" alt="socialboat icon" class="w-5 aspect-1 object-contain"></img>
      
    </div>
    <div className='col-span-10 flex items-center py-1 relative'>
      <input
        className='w-1/2 border self-center p-1 px-5 border-gray-400 outline-none no-underline rounded-l-full '
        type='text'
        placeholder='search'
        value={searchQuery}
        onChange={(e) => {

          setSearchQuery(e.target.value);
        }}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onKeyDown={(e) =>
           handleKeyDown(e)}
      />
    
      <button className='border border-gray-400 px-4 p-1 rounded-r-full bg-gray-100'>
         <img
          className='h-6'
          alt='search'
          src='https://www.svgrepo.com/download/7109/search.svg'
          
          onClick={() =>{
            //e.preventDefault();
          
        getSearchVideos(searchQuery)
        
      }}
    />
     </button>
     
     {/* To display suggestions */}
      {suggestionsVisible && searchdata.length > 0 && (
        <div className='absolute top-11 left-0 bg-white py-2 px-5 w-1/2 shadow-md rounded-lg border border-gray-100'>
          <ul>
            {searchdata.map((suggestionsdata, index) => (
              <li
                key={index}
                onClick={(e) =>{ 
                  e.preventDefault();
                  handleSuggestionClick(suggestionsdata) }
                 
                }
                className=' py-2 shadow-sm hover:bg-gray-100 cursor-pointer'
              >
                {suggestionsdata}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
    <div className='col-span-1 flex items-center justify-center'>
      <img
        className='h-8'
        alt='user'
        src='https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png'
      />
    </div>
  </div>
  )
}

export default Header