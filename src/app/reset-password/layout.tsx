import { Suspense } from 'react'
import type { Metadata } from 'next'
import Loading from './loading'
export const metadata: Metadata = {
  title: 'reset-password',
  description: '',
}


export default function Layout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <section>
      
        <Suspense fallback={<Loading/>}>
        {children}
        </Suspense>
       
      </section>
    )
  }
  