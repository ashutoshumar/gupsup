import React from 'react'
import { signOut } from 'next-auth/react'
import { Button } from '@nextui-org/react'
const ProfileAbout = ({about,email}:{about:String,email:String}) => {
  return (
    <div >
    <div >
        Email:{email}
    </div>
    <div>
    About:{about}
</div>
<Button className='my-6' color="primary" onClick={() => signOut({ callbackUrl: '/' })}>
Sign Out
       
     </Button>


</div>
  )
}

export default ProfileAbout