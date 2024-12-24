import Hero from '@/component/Hero';
import Footer from '@/component/Footer';
import TopStory from '@/component/topStory/home/TopStory';
import TrendingStory from '@/component/trending/home/TrendingStory';
import Threads from '@/component/threads/home/Threads';


export default function Home() {
 
 
  return (
     
   
      
      <div>
        
        <Hero/>
        <TrendingStory/>
        <TopStory/>
        <Threads/>
        <Footer/>
        
      </div>
     

    
  )
}
