import React from 'react'
import Jobs from '../jobs/Jobs'
import EditorChoice from '../editorchoice/EditorChoice'

const StoryRightView = () => {
  return (
    <div className="max-sm:mt-0 md:sticky md:top-0 mt-14 mx-4 sm:mx-6 lg:mx-10"> {/* Responsive margin for outer div */}
    <div className="px-2 sm:px-4 lg:px-6"> {/* Responsive padding for inner div */}
      <div className="flex flex-col gap-2"> {/* Flex container for spacing between components */}
        <Jobs />
        <EditorChoice />
      </div>
    </div>
  </div>
  )
}

export default StoryRightView