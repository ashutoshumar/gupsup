import { getEditorChoice } from '@/lib/request'
import React from 'react'
import Link from 'next/link'
import EditorListSuspense from './EditorListSuspense'
import { PostInterface } from '@/utility/PostInterface'

interface PostsInterface{
  data:PostInterface[]
}
const EditorList = async () => {
  const res = await getEditorChoice(3);
  if (!res.ok) {
    return <EditorListSuspense />;
  }
  const posts:PostsInterface = await res.json();

  return (
    <div className='flex flex-col gap-5 justify-center items-center w-full max-w-screen-lg mx-auto p-4'> {/* Full width with max width for larger screens */}
      {posts && posts.data.map((post: PostInterface) => (
        <Link href={`/posts/${post._id}`} key={post.title} className='cursor-pointer w-full p-4 bg-gray-100 rounded-md hover:bg-gray-200 transition duration-200 ease-in-out'> {/* Added padding, background, and hover effect */}
          <h2 className='text-blue-500 text-lg md:text-xl font-semibold'>{post.title}</h2> {/* Responsive text size */}
          <p className='line-clamp-2 text-sm md:text-base text-gray-600'>{post.description}</p> {/* Responsive text size and color */}
        </Link>
      ))}
    </div>
  );
}

export default EditorList;
