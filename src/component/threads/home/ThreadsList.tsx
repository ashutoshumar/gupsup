import React from 'react'
import { Card, Image, CardFooter, Button } from "@nextui-org/react";
import Link from 'next/link';
import { getThreadsPost } from '@/lib/request';
import CardSkeleton from '@/component/CardSkeleton';
import { PostInterface } from '@/utility/PostInterface';
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ThreadsList = async () => {
  const res = await getThreadsPost(0);
  const data = await res.json();

  if (!res.ok) {
    return <CardSkeleton />;
  }

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 mx-4 sm:mx-10">
      {data.threads.post.map((blog: PostInterface, index: number) => (
        <Card isFooterBlurred className="w-full max-w-[300px] sm:max-w-[250px] lg:max-w-[300px] py-4 mx-auto" key={index}>
           <Image
    removeWrapper
    alt="Card example background"
    className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
    src={blog.image.url}
  />
          <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between w-full p-4">
            <div className="text-left">
              <p className="text-black font-bold text-md">{blog.title}</p>
              <p className="text-xs">by: {blog.username}</p>
            </div>
            <Button className="text-xs" color="primary" radius="full" size="sm">
              <Link href={`/thread/${blog._id}`}>
                Read More
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ThreadsList;
