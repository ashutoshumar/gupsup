import { Suspense } from 'react'
import type { Metadata } from 'next'
import Loading from './loading'
import TopStoryRightView from '@/component/topStory/TopStoryRightView'
export const metadata: Metadata = {
  title: 'Top Story',
  description: '',
}


export default function Layout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <section className="relative flex flex-col md:flex-row w-full h-full">
      {/* Left content for posts */}
      <div className="w-full md:w-[60%] mt-4">
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </div>

      {/* Right view, sticky on medium and large screens */}
      <div className="w-full md:w-[40%] mt-4 max-sm:mt-0 md:sticky md:top-0 h-fit">
        <TopStoryRightView />
      </div>
    </section>
    )
  }
  