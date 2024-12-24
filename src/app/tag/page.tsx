import TagHome from "@/component/tag/TagHome";
import React from "react";

interface PageProps {
  searchParams?: { [key: string]: string |  undefined };
}

const Page: React.FC<PageProps> = async ({ searchParams }) => {
  let param: string ;

  if (!searchParams || !searchParams.tag || !searchParams.tag.length) {
    param = "nature";
  } else {
    param = searchParams.tag;
  }

  return (
    <div>
      <TagHome value={param} />
    </div>
  );
};

export default Page;
