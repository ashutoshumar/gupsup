import useSWR from 'swr'
const fetcher = (url:string) => fetch(url).then((res) => res.json())
const useGetPost=()=>{
    const { data, error , isLoading} = useSWR(
        "${process.env.NEXT_PUBLIC_BASE_URL}/api/post/posts",
        fetcher
      );
    
      
      return {
         data,
        isLoading,
         error
      }
}
const useGetPostById=(id:any)=>{
  const { data, error , isLoading} = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/post/id/${id}`
    ,
    fetcher
  );
  return {
     data,
    isLoading,
     error
  }
}
export {useGetPost,useGetPostById}