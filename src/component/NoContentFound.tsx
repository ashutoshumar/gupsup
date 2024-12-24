import React from 'react'
import { Card, CardBody, Spacer, Button } from '@nextui-org/react';

const NoContentFound = () => {
  return (
    <Card
      isHoverable
       isBlurred
     className="max-w-[400px] mx-auto p-5 text-center bg-gray-100 border border-gray-300"
    >
      <CardBody>
        < h4>No Results Found</h4>
        <Spacer y={1} />
        <span>
          We couldnt find any matching results. Please try again with different criteria.
        </span>
        <Spacer y={1} />
        <Button
        
          color="primary"
          onClick={() => {
            // Add custom action, like resetting the search or going back
            window.location.reload();
          }}
        >
          Retry
        </Button>
      </CardBody>
    </Card>
  );
}

export default NoContentFound;
