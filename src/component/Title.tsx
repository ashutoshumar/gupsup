import React,{FC} from 'react'
import Link from 'next/link'

interface iProp{
    titel:string
    link:string
}
const Title:FC<iProp> = ({titel,link}) => {
  return (
    <div className='mx-10 my-4'>
       
        <Link href={link} className="font-bold text-large text-blue-500"> {titel}</Link>
        
       
    </div>
  )
}

export default Title