import React from 'react'
import Title from '../../Title'
import ThreadsList from './ThreadsList'
const Threads = () => {
  return (
    <div className='w-full my-4'>
    <Title titel='Threads' link='/threads'/>
   
                     
         <ThreadsList/>       
           
        
      </div>
  )
}

export default Threads