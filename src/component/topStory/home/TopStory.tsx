import React,{Suspense} from 'react'
import Title from '../../Title';
import CardSkeleton from '../../CardSkeleton';
import TopStoryList from './TopStoryList';
const TopStory = () => {
    
   
      return (
        <div className='w-full my-4'>
      <Title titel='Top Stories' link='/topStories'/>
     
      <Suspense fallback={<CardSkeleton/>}>
    <TopStoryList/>
    </Suspense>
                       
          
        </div>
       
      );
}

export default TopStory