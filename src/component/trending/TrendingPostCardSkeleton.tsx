import React from 'react'
import { Card } from '@nextui-org/react'
import { Skeleton } from '@nextui-org/react'

const TrendingPostCardSuspense = () => {
  return (
    <Card
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50 w-[100%] max-md:w-[90%] my-5 mx-auto"
      shadow="sm"
    >
      {/* User info section */}
      <div className="flex gap-2 items-center p-4">
        <Skeleton className="flex rounded-full w-10 h-10" />
        <Skeleton className="h-3 w-1/5 rounded-lg" />
      </div>

      {/* Main content section */}
      <div className="grid grid-cols-6 md:grid-cols-12 gap-4 md:gap-6 p-4">
        <div className="hidden md:block md:col-span-2"></div>

        <div className="flex flex-col col-span-6 md:col-span-8 space-y-3">
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

        <div className="hidden md:block md:col-span-2"></div>
      </div>

      {/* Footer section */}
      <div className="flex justify-between items-center p-4">
        <Skeleton className="h-3 w-1/3 md:w-2/5 rounded-lg" />
        <Skeleton className="h-3 w-1/3 md:w-2/5 rounded-lg" />
      </div>
    </Card>
  )
}

export default TrendingPostCardSuspense
