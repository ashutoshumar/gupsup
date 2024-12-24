import React from 'react'
import Link from 'next/link';
import { Card, CardBody, CardHeader, Divider, CardFooter, Button } from "@nextui-org/react";
import { getTopPosts } from '@/lib/request';
import { BiSolidLike } from "react-icons/bi";
import { MdOutlineBookmark } from "react-icons/md";
import CardSkeleton from '../../CardSkeleton';
import { PostInterface } from '@/utility/PostInterface';
const readingTime = require('reading-time');

const TopStoryList = async () => {
  
  const res = await getTopPosts(0);
  const data = await res.json();
  
  if (!res.ok) {
    return <CardSkeleton />;
  }

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 mx-4 sm:mx-10">
      {data.data.post.map((blog: PostInterface, index: number) => (
        <Card
          className="w-full max-w-[300px] sm:max-w-[250px] lg:max-w-[300px] py-4 mx-auto"
          key={index}
        >
          <CardHeader className="pb-0 pt-1 px-4 flex gap-3 flex-col items-start">
            <div className="flex flex-col justify-center item-center">
              <h1 className="font-bold text-lg sm:text-xl text-blue-500">{blog.title}</h1>
              <div className="flex gap-1">
                <p className="text-xs text-default-500">{blog.username}</p>
                <span className="text-xs text-default-500">📖 {readingTime(blog.description).text}</span>
              </div>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <p className="line-clamp-3 text-sm sm:text-base">{blog.description}</p>
          </CardBody>
          <Divider />
          <CardFooter>
            <div className="flex justify-between gap-2 w-full">
              <div className="flex gap-2 justify-center items-center">
                <div className="flex justify-center items-center"><BiSolidLike />
                <span className="text-tiny uppercase font-bold p-1">{blog.likesCount}</span>
                </div>
                <div className="flex justify-center items-center"><MdOutlineBookmark />
                <span className="text-tiny uppercase font-bold p-1">{blog.bookmarksCount}</span>
                </div>
              </div>
              
              <Button color="primary" className="text-xs sm:text-sm p-2 mx-1">
                <Link href={`/posts/${blog._id}`}>
                  Read More
                </Link>
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default TopStoryList;
