import React from 'react'
import ThreadHero from './ThreadHero';
import { getThreadPosts } from '@/lib/request';
import CardSkeleton from '@/component/CardSkeleton';
import { Suspense } from 'react';
import RelatedThreadPostLists from './RelatedThreadPostLists';
import ThreadsList from '../home/ThreadsList';

const ThreadPosts = async({ token }: { token: string }) => {
  const res = await getThreadPosts(token);

  if (!res.ok) {
    throw Error("Page not found");
  }

  const data = await res.json();

  return (
    <div className='mt-20 w-full h-full flex flex-col items-center justify-center'>
      {/* Thread Hero Section */}
      <ThreadHero
        id={data.post._id}
        title={data.post.title}
        description={data.post.description}
      />

      {/* Thread's Posts Section */}
      <div className='w-full my-4'>
      <div className='px-4 sm:px-4 md:px-6 lg:px-12 xl:px-16 my-4'>
      <span className="font-bold text-xl sm:text-2xl text-blue-500">
            {"Thread's Posts"}
          </span>
        </div>

        <Suspense fallback={<CardSkeleton />}>
          <RelatedThreadPostLists posts={data.post.threads} />
        </Suspense>
      </div>

      {/* Latest Threads Section */}
      <div className='w-full my-4 mb-10'>
        <div className='px-4 sm:px-4 md:px-6 lg:px-12 xl:px-16 my-4'>
          <span className="font-bold text-xl sm:text-2xl text-blue-500">
            {"Latest Threads"}
          </span>
        </div>

        <Suspense fallback={<CardSkeleton />}>
          <ThreadsList />
        </Suspense>
      </div>
    </div>
  );
}

export default ThreadPosts;
