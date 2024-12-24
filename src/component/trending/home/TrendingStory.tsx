import React from 'react'
import { Suspense } from 'react';
import CardSkeleton from '../../CardSkeleton';
import Title from '../../Title';
import TrendingStoryList from './TrendingStoryList';
const TrendingStory = () => {
   
   
  return (
    <div className='w-full my-4'>
     <Title titel='Trending' link='trending'/>
     <Suspense fallback={<CardSkeleton/>}>
    <TrendingStoryList/>
    </Suspense>
    </div>)
}

export default TrendingStory