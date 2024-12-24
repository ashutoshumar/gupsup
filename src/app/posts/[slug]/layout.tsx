
import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Post',
  description: 'Generated by create next app',
}
export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    
      <section className=''>
       
       {/* <RecentPost/> */}
      
      {children}
    
        
        
     </section>
  
  )
}
