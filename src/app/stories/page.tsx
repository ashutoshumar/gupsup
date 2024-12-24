"use client";
import React, { useRef, useState } from "react";
import { FcNext, FcPrevious } from "react-icons/fc";
import View from "@/component/view/View";

const Page: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [view, setView] = useState<string>("nature");

  const scroll = (direction: "left" | "right") => {
    const { current } = scrollContainerRef;
    const scrollAmount = direction === "left" ? -300 : 300;

    if (current) {
      current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

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

  return (
    <div className="mt-20 w-full h-full flex flex-col gap-6">
      {/* Horizontal scrolling container (sticky at top) */}
      <div className="sticky top-0 w-full bg-white z-10">
        <div className="flex justify-between items-center px-4">
          {/* Previous button */}
          <button
            onClick={() => scroll("left")}
            className="text-4xl border-none cursor-pointer"
            aria-label="Scroll Left"
          >
            <FcPrevious />
          </button>

          {/* Scrollable tag list */}
          <div className="relative w-full max-w-[85%] overflow-hidden">
            <div
              ref={scrollContainerRef}
              className="flex overflow-x-auto scrollbar-hide scroll-smooth gap-5 py-5"
            >
              {tags.map((item) => (
                <div
                  key={item.key}
                  onClick={() => setView(item.key)}
                  className={
                    item.key === view
                      ? "min-w-[120px] bg-blue-500 text-white flex items-center justify-center rounded-lg"
                      : "min-w-[100px] cursor-pointer bg-gray-300 flex items-center justify-center rounded-lg"
                  }
                >
                  {item.label}
                </div>
              ))}
            </div>
          </div>

          {/* Next button */}
          <button
            onClick={() => scroll("right")}
            className="text-4xl border-none cursor-pointer"
            aria-label="Scroll Right"
          >
            <FcNext />
          </button>
        </div>
      </div>

      {/* View Component */}
      <div className="w-full flex justify-center mx-auto">
        <View initialView={view} />
      </div>
    </div>
  );
};

export default Page;
