"use client";
import React, {  Dispatch, SetStateAction } from "react";
import TagTopicCard from "./topic/TagTopicCard";



const TagRight = ({selectedTag, setTag }: {selectedTag:string, setTag: Dispatch<SetStateAction<string>> }) => {
  
    return (
        <div className="flex flex-col w-full h-full items-center">
            <div className="font-bold text-4xl text-blue-500 capitalize my-10">
                Topics
            </div>
           <div className="my-10">
            <TagTopicCard selectedTag={selectedTag} setTag={setTag}/>
            </div>
        </div>
    );
};

export default TagRight;
