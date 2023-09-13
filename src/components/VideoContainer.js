import React, { useEffect, useState } from 'react'
import { RESULTS_API } from '../utils/constants';
import VideoCard from './VideoCard';


const VideoContainer = () => {
    

    const [videos,setVideos] = useState([])
    
    useEffect(()=>{
     getVideos();
    },[]) 
    
    const getVideos = async() => {
      try{const data = await fetch(RESULTS_API);
          const json = await data?.json();
          console.log(json?.results);
         setVideos(json?.results)}
          catch(err){
              console.error(`Error : ${err}`);
          }
        
    }
      if(videos === [] ) return null;
    return  (
      <div className='flex mt-2 flex-wrap justify-center no-scrollbar  '>
      {
          videos?.map((result)=> (
            
              <VideoCard key={result?.text} info={result}/>
           
             ))
      }
          
      </div>
    )
 
  
}

export default VideoContainer