/*-------------User-------------*/
interface User{
    name:string,
    email:string,
    password:string
  }
  interface Tag{
    label:string
  }
const registerUser=async(user:User)=>{
 const res=await   fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/register`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          user
        })
      })
      return res
}

const updateUser=async(id:string,name:string,about:string,image:string | ArrayBuffer | null |undefined)=>{
  const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/profile/`, {
    method: 'POST',
    headers: {
        
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({id,name,about,image}),
   })
   return res
  
}
const forgetpassword=async(email:string)=>{
const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/forgetpassword`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email }),
});
return res
}

const resetpassword=async(token:string|null,password:string)=>{
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/resetpassword`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, password }),
  });
  return res
}

/*-------------Blog Post--------------------*/

const getBlog = async(token:string)=>{
  const res = await  fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/post/id/${token}`,
    { cache: 'no-store' }, 
 )
   
    return res
}
const postBlog=async(title:string,author:string,tag:Tag[],greyContent:string,userId:string)=>{
  console.log("await")
  const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
     title:title, username:author,tags:tag,description:greyContent,userId
    })
  })
  return res
}

/*----------------Trending Posts --------------------*/
const getTrendingPosts=async(initial:number)=>{
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/trending?initial=${initial}`,
    { cache: 'no-store' }, 
 )
   
    return res
 
}
/*----------------Top Posts --------------------*/
const getTopPosts=async(initial:number)=>{
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/topstories?initial=${initial}`, 
    { cache: 'no-store' }, 
)
 
  return res
}
/*----------------Thread posts--------------------*/
const getThreadsPost=async(initial:number)=>{
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/threads?initial=${initial}`,
    { cache: 'no-store' }, 
 )
   
    return res
 
}
const postThread=async(username:string,userId:string,image:string,title:string,description:string)=>{
  
  const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/threads`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
     title, image,username,userId,description
    })
  })
  return res
}

const getThreadPosts= async(token:string)=>
{
  const res= await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/threads/thread/${token}`,
    { cache: 'no-store' }, 
  );
  return res;
}
const postAddThread=async(title:string,author:string,tag:Tag[],greyContent:string,userId:string,threadId:string)=>{
  
  const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/threads/thread/${threadId}`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
     title:title, username:author,tags:tag,description:greyContent,userId
    })
  })

  return res
}


/*---------------- Story View --------------------*/
const getViewPosts=async(initialView:string)=>
{
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/view?tags=${initialView}`,
  {  next: { revalidate: 60 },} 
 )
   
    return res
}

/*---------------- Editor Choice --------------------*/
const getEditorChoice=async(limit:number)=>
  {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/editorchoice?limit=${limit}`,
    {  cache: 'no-store',} 
   )
   
     
      return res
  }
  /*---------------- Jobs --------------------*/
  const getJobs=async ()=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/jobs`,
      { cache: 'no-store' },
     )
     
       
        return res
  }
  /*---------------- Topic --------------------*/
const getTopic=async()=>{
  const res= await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tags`,
    { cache: 'no-store' },
 )

 return res
}
const getAllTags=async()=>{
  const res= await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/alltags`,
    { cache: 'no-store' },
 )

 return res
}
/*--------------------Like--------------------*/
const postLike =  async(id:string)=>{
  const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/like/${id}`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    }
  })
  return res}
const getLike =  async(id:string)=>{
  const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/like/${id}`)
  return res
}
const getAllLikedPosts =  async()=>{
  const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/like`,
    { cache: 'no-store' },
  )
  return res
}
/*--------------------BookMark--------------------*/
const postBookMark =  async(id:string)=>{
  const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/bookmark/${id}`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    }
  })
  return res
}
const getBookMark =  async(id:string)=>{
  const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/bookmark/${id}`)
  return res
}
const getAllBookMarkPosts =  async()=>{
  const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/bookmark`)
  return res
}

/*-------------Admin--------------------*/
const getAdminPosts=async(initial:number)=>{
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/posts?initial=${initial}`,
    { cache: 'no-store' }, 
 )
   
    return res
 
}
const putAdminPosts=async(id:string,title:string,author:string,tag:Tag[],greyContent:string,userId:string)=>{
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/posts`,{
    method:"PUT",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
     id:id,title:title, username:author,tags:tag,description:greyContent,userId
    })
  })
  return res
 
}
const getAdminUsers=async(initial:number)=>{
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/users?initial=${initial}`,
    { cache: 'no-store' }, 
 )
   
    return res
 
}
const getAdminUserById=async(id:string)=>{
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/users/user/${id}`,
    { cache: 'no-store' }, 
 )
   
    return res
}

const putAdminUserById=async(id:string,role:string)=>{
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/users/user/${id}`,{
    method:"PUT",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
     role:role  })
  })
  return res
}
const deleteAdminUserById=async(id:string)=>{
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/users/user/${id}`,{
    method:"DELETE"  })
 
  return res
}
export {
    registerUser,
    updateUser,
    forgetpassword,
    resetpassword,
    getBlog,
    postBlog,
    getTrendingPosts,
    getTopPosts,
    getThreadsPost,
    postThread,
    getThreadPosts,
    postAddThread,
    getViewPosts,
    getEditorChoice,
    getJobs,
    getTopic,
    getAllTags,
    postLike,
    getLike,
    getAllLikedPosts,
    postBookMark,
    getBookMark,
    getAllBookMarkPosts,
    getAdminPosts,
    putAdminPosts,
    getAdminUsers,
    getAdminUserById,
    putAdminUserById,
    deleteAdminUserById

   
 
}