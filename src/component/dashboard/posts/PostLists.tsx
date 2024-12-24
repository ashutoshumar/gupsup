"use client"
import React, { useState, useEffect } from 'react'
import { MdEdit } from "react-icons/md";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import { getAdminPosts } from "@/lib/request";
import { PostInterface } from '@/utility/PostInterface';

interface Post {
  _id: string;
  title: string;
  description: string;
}

interface PostsResponse {
  posts: {
    post: PostInterface[];
    metadata: number;
  };
}

const PostLists = () => {
  const [posts, setPosts] = useState<PostInterface[]>([]); // State for posts
  const [total, setTotal] = useState<number>(0);  // State for total number of posts
  const [offset, setOffset] = useState<number>(0); // State for offset to paginate
  const [loading, setLoading] = useState<boolean>(false); // State to track loading state

  const [ref, inView] = useInView(); // Hook to detect when the scroll reaches the bottom

  const loadPosts = async (): Promise<void> => {
    if (loading) return; // Prevent duplicate calls
    setLoading(true);

    try {
      const res = await getAdminPosts(offset);
      if (!res.ok)
        throw new Error("Unable to load Dashboard posts");
      
      const data: PostsResponse = await res.json();

      setPosts((prevPosts) => [...prevPosts, ...data.posts.post]);
      setTotal(data.posts.metadata);
      setOffset((prevOffset) => prevOffset + 1);
    } catch (error) {
      console.error("Error loading posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (inView && !loading) {
      if (posts.length === 0 || posts.length < total) {
        loadPosts();
      }
    }
  }, [inView, loading]); // Include necessary dependencies

  return (
    <div>
      <div className="w-full gap-5 flex justify-start items-center p-5">
        <div className="w-[20%] flex justify-start items-center">Title</div>
        <div className="w-[60%] flex justify-center items-center">Description</div>
        <div className="w-[20%] flex justify-end items-center">Edit</div>
      </div>
      
      {posts.map((post: PostInterface, index: number) => (
        <div key={index} className="w-full gap-5 flex justify-between p-5">
          <div className="w-[20%]">{post.title}</div>
          <div className="w-[60%]">
            <p className="line-clamp-3 text-sm md:text-base">{post.description}</p>
          </div>
          <div className="w-[20%] flex justify-end items-center">
            <Link href={`/dashboard/update/posts/${post._id}`}>
              <MdEdit />
            </Link>
          </div>
        </div>
      ))}

      {/* Infinite scroll trigger */}
      <div ref={ref} className="my-10 w-full">
        {posts && posts.length < total && <div>Loading...</div>}
      </div>
    </div>
  )
}

export default PostLists;
