import React from 'react'
import VideoContainer from './VideoContainer'
import { useSelector } from 'react-redux';
import SearchVideo from './SearchVideo';

const MainContainer = () => {

    const searchTrue = useSelector((store)=> store.suggestions.checkResults );
  return (
    <div>
      {searchTrue ? <SearchVideo/> : <VideoContainer/>}
    </div>
  )
}

export default MainContainer