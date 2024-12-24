// app/error.tsx
'use client'; // This ensures the page is rendered on the client side

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-red-100 to-red-300">
      <div className="text-center">
        <h1 className="text-5xl font-extrabold text-red-600">Oops!</h1>
        <h2 className="mt-2 text-2xl font-semibold text-gray-800">
          Something went wrong.
        </h2>
        <p className="mt-4 text-gray-600">
          An unexpected error has occurred. We are working to fix the problem.
        </p>
        
        <div className="mt-6">
          <button
            onClick={reset}
            className="px-6 py-3 font-medium text-white bg-red-500 rounded-md shadow-md hover:bg-red-600 transition"
          >
            Try Again
          </button>
        </div>

        <div className="mt-6">
          {/* <Link href="/">
            <a className="inline-block px-6 py-3 font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 transition">
              Back to Home
            </a>
          </Link> */}
        </div>

        <div className="mt-8">
          <img
            src="https://via.placeholder.com/350x250"
            alt="Error Illustration"
            className="mx-auto w-80 h-auto"
          />
        </div>
      </div>
    </div>
  );
}
