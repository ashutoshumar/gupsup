'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import upload from "../../../public/upload.png";
import { Button } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import { postThread } from '@/lib/request';
import { useRouter } from "next/navigation";

const Threads: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [prevueImage, setPrevueImage] = useState<string>(upload.src);
  const [loading, setLoading] = useState<boolean>(false);
  const { data: session } = useSession();
  const router = useRouter();

  const author: string = session?.user?.name || '';
  const userId: string = session?.user?.id.toString() || '';

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2 && reader.result) {
        setPrevueImage(reader.result as string);
      }
    };
    if (e.target.files && e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await postThread(author, userId, prevueImage, title, description);
      const data = await res.json();
      if (res.ok) {
        router.push("/");
      } else {
        console.error(data);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 text-white z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-100"></div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col">
          <div className="flex justify-between items-center font-medium px-5 mx-5 w-full">
            <div className="flex gap-5 items-center w-2/7">
              <div className="px-6 py-3.5 my-auto border border-dashed border-gray-300 hover:border-blue-500 focus-within:border-blue-500 rounded-lg shadow-sm">
                <label className="cursor-pointer">
                  <span className="text-gray-600">Upload an Image</span>
                  <input
                    type="file"
                    className="hidden"
                    disabled={loading}
                    onChange={handleImageChange}
                  />
                </label>
              </div>
              <div className="px-6 my-auto">
                <Image
                  src={prevueImage}
                  alt="Preview"
                  className="rounded-full aspect-square object-cover"
                  height={40}
                  width={40}
                />
              </div>
            </div>
            <div className="flex gap-5 items-center w-4/6">
              <div className="w-8/12">
                <input
                  placeholder="Title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="px-4 py-3 text-base bg-white rounded-lg border shadow-sm w-full"
                />
              </div>
              <div>
                <Button onClick={handleSubmit} color="primary" variant="ghost">
                  Create
                </Button>
              </div>
            </div>
          </div>
          <div className="flex flex-col p-5 w-full h-[50%] mx-5">
            <div className="flex flex-col ml-5 w-[90%] h-full">
              <textarea
                placeholder="Write..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="grow px-4 py-3 w-full text-base bg-white rounded-lg border shadow-sm"
              ></textarea>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Threads;
