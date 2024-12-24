"use client"
import React from 'react';
import Link from 'next/link';


export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center ">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-indigo-600">404</h1>
        <h2 className="mt-2 text-2xl font-semibold text-gray-800">Page Not Found</h2>
        <p className="mt-4 text-gray-600">
          Oops! The page you are looking for does not exist. It might have been moved or deleted.
        </p>
        
        <div className="mt-8">
          <Link href="/">
            <span className="px-6 py-3 font-medium text-white bg-indigo-600 rounded-md shadow-md hover:bg-indigo-700 transition">
              Back to Home
            </span>
          </Link>
        </div>
        
        
      </div>
    </div>
  );
}
