import React from 'react'
import { Card, CardBody, Image, Button, CardHeader, Avatar, CardFooter } from "@nextui-org/react";
import Link from 'next/link';
import { PostInterface } from '@/utility/PostInterface';
const ThreadPostCard = ({ post }: { post: PostInterface }) => {
  const createdAt = new Date(post.createdAt);
  const today = new Date();
  const ageInMilliseconds = today.getTime() - createdAt.getTime();
  const ageInHour = Math.floor(ageInMilliseconds / (1000 * 60 * 60))
  const ageInDays = ageInHour / 24;
  const ageInMonth = ageInDays / 30;
  const ageInYear = ageInMonth / 12;
  let ago = '';

  if (ageInYear >= 1) {
    ago = `${createdAt.toISOString().split('T')[0]}`
  } else if (ageInMonth >= 1) {
    const month = createdAt.toString().split(" ")
    ago = `${month[2]} ${month[1]}`
  } else if (ageInDays >= 1) {
    ago = `${Math.floor(ageInDays)} days ago`
  } else {
    ago = `${Math.floor(ageInHour)} hours ago`
  }

  return (
    <Card
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50 max-w-full sm:max-w-[1000px] my-5 mx-auto"
      shadow="sm"
    >
      <CardHeader className="justify-between">
        <div className="flex gap-3 md:gap-5">
          <Avatar isBordered radius="full" size="md" src="https://nextui.org/avatars/avatar-1.png" />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-sm md:text-base font-semibold leading-none text-default-600">{post.username}</h4>
          </div>
        </div>
      </CardHeader>

      <CardBody>
        <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
          <div className="relative col-span-2 md:col-span-1">
            {/* Placeholder for potential content */}
          </div>

          <div className="flex flex-col col-span-6 md:col-span-8">
            <h3 className='font-bold text-lg md:text-xl text-blue-500'>{post.title}</h3>
            <p className='line-clamp-3 text-sm md:text-base'>{post.description}</p>
          </div>

          <div className="max-md:hidden  col-span-4 md:col-span-3 md:mx-3 mx-auto">
            <Image
              height={200}
              width={500}
              alt='Post image'
              src={post.image.url}
              className="object-cover rounded-lg " // Added for better image handling
            />
          </div>
        </div>
      </CardBody>

      <CardFooter>
        <div className="flex flex-col md:flex-row justify-between w-full px-4 py-2">
          <div className='flex gap-4 justify-center items-center'>
            <span className='text-lg md:text-xl'>✨</span>
            <span className='text-lg md:text-xl'>{ago}</span>
            <div className="flex justify-center items-center text-lg md:text-xl">
              
            </div>
          </div>

          <div className='flex justify-center items-center mt-2 md:mt-0'>
            <Button color="primary" className='p-2 mx-1'>
              <Link href={`/thread/${post._id}`}>
                Read More
              </Link>
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

export default ThreadPostCard;
