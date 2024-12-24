import React, { Suspense } from 'react'
import JobsListSuspense from './JobsListsuspense'
import JobsList from './JobsList'

const Jobs = () => {
  return (
    <div className="max-sm:my-1 my-6 p-4 w-full "> {/* Adjusted padding for responsiveness */}
     <div className='w-full max-md:flex max-md:items-center '> <h3 className="relative mx-auto font-bold text-3xl sm:text-4xl text-blue-500  my-6"> {/* Responsive font size */}
        {`Latest Jobs`}
      </h3>
      </div>

      <Suspense fallback={<JobsListSuspense />}>
        <JobsList />
      </Suspense>
    </div>
  )
}

export default Jobs;
