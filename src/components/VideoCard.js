import React from 'react'

const VideoCard = ({info}) => {
    const {tags,video} = info;
    const elements = info?.heading.split(' ');
    const title = elements[0];
    
  return (
    <div className='p-2 m-2 w-80 min-h-60 shadow-lg overflow-hidden no-scrollbar'> 
    <video width="640" height="360" controls>
       <source src={video} type="video/mp4" />
        </video>
     <ul>
        <li className='font-bold py-2'>{title}</li>
        <li className='flex flex-wrap'>{tags.join(', ')}</li>
        
     </ul>
    </div>
  )
}

export default VideoCard