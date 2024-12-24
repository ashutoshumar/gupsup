import React from 'react'
import { Card, CardBody, Spacer, Button } from '@nextui-org/react';

const NoBookMarkFound = () => {
  return (
    <Card
    
    className="max-w-[250px] mx-auto  text-center w-[250px] space-y-5 p-4"
   ><CardBody>
      <h4>{"You haven't BookMarked any post"}</h4>
      <Spacer y={1} />
      
      <Spacer y={1} />
      
    </CardBody>
  </Card>
  )
}

export default NoBookMarkFound