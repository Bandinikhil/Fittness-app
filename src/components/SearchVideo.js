import React from 'react'
import { useSelector } from 'react-redux';
import VideoCard from './VideoCard';

const SearchVideo = () => {
    //subscribing to the store to fetch the data based on the search query 
    const searchResults = useSelector((store)=> store.suggestions.searchResults);
    const searchTrue = useSelector((store)=> store.suggestions.checkResults );
console.log(searchResults[0]);

if(searchResults === [] ) return (<h1>Please Search Again No data Found!!!</h1>);
  return (
    
    <div className='flex flex-wrap justify-center no-scrollbar'>
      {
        searchTrue && searchResults[0] && searchResults[0].map((result)=>(
            <VideoCard key={result?.text} info={result}/> 
        ))
          
        
        }
    </div>
  )
  
}

export default SearchVideo