import React, { FC } from 'react';
import { Divider, Chip } from "@nextui-org/react";
import PrevueMdx from '@/component/mdx/PrevueMdx';
import { getBlog } from '@/lib/request';
import BlogLikeBookMark from './BlogLikeBookMark';
import { PostInterface } from '@/utility/PostInterface';
interface iProp {
  token: string;
}

const Blog: FC<iProp> = async ({ token }) => {
  const res = await getBlog(token);
  if (!res.ok) {
    throw Error("Page Not found");
  }
  const data:PostInterface = await res.json();
  const createdAt = new Date(data.post.updatedAt);

  return (
    <div className='relative mt-14 mx-auto w-full md:w-[80%] lg:w-[60%] h-full flex items-center justify-center'>
      <div className='relative w-full h-full mx-5'>
        <div className={`relative z-100 w-full h-full flex items-center justify-center bg-gradient-to-r`}>
          
          {/* Main Content */}
          <div className="mt-500 p-5 md:p-10 lg:p-20 overflow-auto flex flex-col items-center px-5 md:px-10 lg:px-20 pt-11 pb-20 bg-slate-50 max-md:px-5">
            
            {/* Title Section */}
            <div className="rounded overflow-hidden flex flex-col items-center">
              <h2 className="mt-4 mx-auto break-words text-center font-extrabold leading-none tracking-tight text-gray-900 text-2xl md:text-5xl lg:text-6xl dark:text-white">
                <span className="text-blue-600 dark:text-blue-500">{data.post.title}</span>
              </h2>
            </div>

            {/* Tags Section */}
            <div className="flex gap-5 mt-5 flex-wrap justify-center items-center text-base leading-4 max-md:flex-wrap max-md:justify-around m-auto max-w-sm">
              {data.post.tags.map((label: any, index: any) => (
                <div key={index} className="flex flex-1 justify-center">
                  <Chip>#{label.label}</Chip>
                </div>
              ))}
            </div>

            {/* Description Section */}
            <div className="prose prose-sm md:prose-lg lg:prose-xl dark:prose-invert mt-5 dark:text-slate-300 font-light font-sans w-full">
              <PrevueMdx>{data.post.description}</PrevueMdx>
            </div>

            {/* Divider */}
            <Divider className="my-10" />
            <BlogLikeBookMark likeCount={data.post.likesCount} bookMarkCount={data.post.bookmarksCount} name={data.post.username} date={createdAt} postId={token}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blog;
