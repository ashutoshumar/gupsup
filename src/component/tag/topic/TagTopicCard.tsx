"use client"
import React,{useState,useEffect,Dispatch,SetStateAction} from 'react'
import { getAllTags } from '@/lib/request';
import { Chip } from '@nextui-org/react';
interface Tag {
    label: string;
}
const TagTopicCard =  ({selectedTag, setTag }: {selectedTag:string, setTag: Dispatch<SetStateAction<string>> }) => {
    
    const [allTags, setAllTags] = useState<Tag[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const loadTags = async () => {
        try {
            const res = await getAllTags();
            if (!res.ok) {
                throw new Error("Failed to fetch tags");
            }
            const data = await res.json();
            setAllTags(data.tags);
        } catch (error) {
            console.error(error);
            setAllTags([]); // Graceful fallback
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadTags();
    }, []);

    if (isLoading) {
        return <div className="text-center">Loading...</div>;
    }

  return (
    <div className="gap-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
    {allTags.map((tag) => (
        <div
            key={tag.label}
            className="relative group cursor-pointer"
            onClick={() => setTag(tag.label)}
        >
            <Chip
                radius="lg"
                variant="faded"
                
                className={selectedTag==tag.label?"truncate max-w-full text-blue-500":"truncate max-w-full "}
            >
                {tag.label.length > 6
                    ? `${tag.label.slice(0, 6)}...`
                    : tag.label}
            </Chip>
            {/* Tooltip on hover */}
            <div className="absolute hidden group-hover:flex -top-10 left-1/2 transform -translate-x-1/2 bg-black text-white text-sm rounded px-2 py-1 z-10">
                {tag.label}
            </div>
        </div>
    ))}
</div>
  )
}

export default TagTopicCard;