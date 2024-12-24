// app/error.tsx
'use client'; // This ensures the page is rendered on the client side

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen w-full items-center justify-center  ">
      <div className="text-center">
        <h1 className="text-5xl font-extrabold text-black-600">Oops!</h1>
        <h2 className="mt-2 text-2xl font-semibold text-gray-800">
          Something went wrong.
        </h2>
        <p className="mt-4 text-gray-600">
          An unexpected error has occurred. We are working to fix the problem.
        </p>
        
        <div className="mt-6">
        <Link href="/" 
            className="px-6 py-3 font-medium text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600 transition"
          >
            Try Again
            </Link>
        </div>

        

        
      </div>
    </div>
  );
}
