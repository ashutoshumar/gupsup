import React from 'react'
import { Chip } from '@nextui-org/react'
import { getTopic } from '@/lib/request'
import TopicSkeleton from './TopicSkeleton'
import Link from 'next/link'
import { TagInterface } from '@/utility/TagInterface'
const TopicList = async () => {
  const res = await getTopic()
  if (!res.ok) {
    return <TopicSkeleton />
  }
  const tags = await res.json()

  return (
    <div className="gap-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {tags.tags.map((tag: TagInterface) => (
        <Link href={`/tag?tag=${tag.label}`} key={tag.label}>
        <Chip
          className="p-3 text-base sm:text-lg md:text-xl bg-white cursor-pointer"
          key={tag.label}
        >
       <span className="block md:hidden">{tag.label}</span>
          <span className="hidden md:block">
            {tag.label.length > 6 ? `${tag.label.slice(0, 6)}...` : tag.label}
          </span>
        </Chip>
        </Link>
      ))}
    </div>
  )
}

export default TopicList
