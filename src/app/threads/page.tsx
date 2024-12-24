import { getThreadsPost } from "@/lib/request";
import ThreadsPostList from "@/component/threads/ThreadsPostList";
const Thread =async () => {
  const initialPosts=await getThreadsPost(0);
  if(!initialPosts.ok)
  {
    throw Error("some error occured")
  }
  const data=await initialPosts.json()
 console.log(data)
 return (
   <div>
    
       <ThreadsPostList initialPosts={data.threads.post}/>
      
     
   </div>
 )
};

export default Thread;