import React, { Suspense } from 'react';
import EditorListSuspense from './EditorListSuspense';
import EditorList from './EditorList';

const EditorChoice = () => {
  return (
    <div className="mb-6  p-4 w-full "> {/* Adjusted padding for responsiveness */}
    <div className='w-full max-md:flex max-md:items-center '>   <h3 className="relative mx-auto font-bold text-3xl sm:text-4xl text-blue-500  my-3"> {/* Responsive font size */}
        {`Editor's Choice`}
      </h3>
      </div>

      <Suspense fallback={<EditorListSuspense />}>
        <EditorList />
      </Suspense>
    </div>
  );
}

export default EditorChoice;
