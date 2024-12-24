"use client";
import React, { useState } from "react";
import TagLeft from "./TagLeft";
import TagRight from "./TagRight";

const TagHome = ({ value }: { value: string }) => {
  const [tag, setTag] = useState(value);

  return (
    <div className="mt-20 w-full h-full flex flex-col md:flex-row">
      {/* Left Section */}
      <div className="w-full md:w-[60%] mt-4">
        <TagLeft value={tag} />
      </div>

      {/* Right Section */}
      <div className="w-full md:w-[40%] mt-4 md:mt-0">
        <TagRight selectedTag={tag} setTag={setTag} />
      </div>
    </div>
  );
};

export default TagHome;
