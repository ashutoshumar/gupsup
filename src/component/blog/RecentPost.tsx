
import React from 'react'
import { getLatestStory } from '@/lib/request';
import Link from 'next/link';
const RecentPost =async() => {
  const res = await getLatestStory()
  const data =await res.json()
 
  return (
    <div className='fixed z-50 left-7  mt-20'>
      <div>
        <h2 className='text-blue-500'>Recent Posts</h2>
     
      {data.post.map((blog:any, index:any) => ( <li key={index} className="cursor-pointer">
        
                  <Link
                    
                   href={`http://localhost:3000/posts/${blog._id}`}
                   
                    
                      className=" py-2 px-3"
                   
                  >
                 <span className=' truncate overflow-hidden' > {blog.title.split(' ').slice(0, 5).join(' ')}</span>
                  </Link>
                </li>
       
      ))}
      </div>
      <div className='mt-10'>
      <h2 className='text-blue-500'>Related Posts</h2>
     
     {data.post.map((blog:any, index:any) => ( <li key={index} className="cursor-pointer">
       
                 <Link
                   
                  href={`http://localhost:3000/posts/${blog._id}`}
                  
                   
                     className=" py-2 px-3"
                  
                 >
                <span className=' truncate overflow-hidden' > {blog.title.split(' ').slice(0, 5).join(' ')}</span>
                 </Link>
               </li>
      
     ))}
      </div>
   
  </div>
  )
}

export default RecentPost