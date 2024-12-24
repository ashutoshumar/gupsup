import React from 'react'
import { Card } from '@nextui-org/react'
import { Skeleton } from '@nextui-org/react'

const ThreadsPostCardSuspense = () => {
  return (
    <Card
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50 w-[100%] max-md:w-[90%] my-5 mx-auto"
      shadow="sm"
    >
    <div className="flex gap-2 items-center m-2">
      <Skeleton className="flex rounded-full w-10 h-10" />
      <Skeleton className="h-3 w-1/5 rounded-lg" />
    </div>

    <div className="grid grid-cols-6 md:grid-cols-12 gap-4 md:gap-6 items-center justify-center">
      <div className="relative col-span-3 md:col-span-2"></div>

      <div className="flex flex-col col-span-6 md:col-span-8">
        <div className="space-y-3">
          <Skeleton className="w-full rounded-lg">
            <div className="h-3 w-full rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-full rounded-lg">
            <div className="h-3 w-full rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-full rounded-lg">
            <div className="h-3 w-full rounded-lg bg-default-200"></div>
          </Skeleton>
        </div>
      </div>

      <div className="relative col-span-3 md:col-span-2"></div>
    </div>

    <div className="flex justify-between items-center m-2">
      <Skeleton className="h-3 w-2/5 rounded-lg" />
      <Skeleton className="h-3 w-2/5 rounded-lg" />
    </div>
  </Card>
  )
}

export default ThreadsPostCardSuspense;
