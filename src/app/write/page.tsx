'use client';
import { useState } from 'react';
import { Button } from "@nextui-org/react";
import { Prevue } from '@/component/Prevue';
import toast, { Toaster } from "react-hot-toast";
import Post from '@/component/write/Post';
import Threads from '@/component/write/Threads';

interface Tag {
  label: string;
}

const tags = [
  { key: "nature", label: "Nature" },
  { key: "dsa", label: "DSA" },
  { key: "webdev", label: "WEB_DEV" },
  { key: "react", label: "React" },
  { key: "docker", label: "Docker" },
  { key: "love", label: "Love" },
  { key: "sports", label: "Sports" },
  { key: "shopping", label: "Shopping" },
  { key: "news", label: "News" },
  { key: "movies", label: "Movies" },
  { key: "cricket", label: "Cricket" },
  { key: "romance", label: "Romance" },
  { key: "entertainment", label: "Entertainment" },
  { key: "technology", label: "Technology" },
];

const Page: React.FC = () => {
  const [content, setContent] = useState<string>(''); // `content` is a string
  const [post, setPost] = useState<boolean>(true); // Boolean to toggle between Post and Thread views
  const [prevue, setPrevue] = useState<boolean>(false); // Boolean to toggle Prevue state

  // Notification for errors
  const errorNotify = (val: string) => toast.error(val);

  // Function to toggle the Prevue view
  const handlePrevue = () => {
    if (!content) {
      errorNotify("All fields are necessary");
    } else {
      setPrevue(!prevue);
    }
  };

  // Function to add tags
  const addTags = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    if (!value) return;

    const tagsArray = value.split(',');
    const tagsGroup: Tag[] = tagsArray.map((item: string) => {
      const [key] = item.split(' '); // Split by space to extract the key
      console.log(key);
      return {
        label: key,
      };
    });
    console.log(tagsGroup);
  };

  return (
    <div>
      {prevue ? (
        <div className="relative mt-14 w-full h-full flex items-center justify-center">
          <div className="relative w-full h-[50%] mx-5">
            <Prevue
              prevue={prevue}
              content={content}
              setPrevue={setPrevue}
              errorNotify={errorNotify}
            />
          </div>
        </div>
      ) : (
        <div className="fixed w-full h-full flex flex-col gap-5 items-center justify-start mt-20">
          <div className="w-full my-4 bg-blue px-10 flex justify-end">
            <Button
              onClick={() => setPost(true)}
              size="lg"
              radius="none"
              color={post ? "primary" : "default"}
              className={'w-1/2'}
            >
              Post
            </Button>
            <Button
              onClick={() => setPost(false)}
              size="lg"
              radius="none"
              color={post ? "default" : "primary"}
              className={'w-1/2'}
            >
              Thread
            </Button>
          </div>
          {post ? (
            <Post content={content} setContent={setContent} handlePrevue={handlePrevue} />
          ) : (
            <Threads />
          )}
        </div>
      )}
      <Toaster />
    </div>
  );
};

export default Page;
