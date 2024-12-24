// components/Heading.tsx
import React, { ReactNode } from 'react';

interface HeadingProps {
  children: ReactNode;
}

export const Heading = {
  H1: ({ children }: any) => <h1 className=" text-blue-500 text-2xl font-bold">{children}</h1>,
  H2: ({ children }: any) => <h2 className=" text-blue-500 text-xl font-bold">{children}</h2>,
  H3: ({ children }: any) => <h3 className=" text-blue-500 text-large font-bold">{children}</h3>,
  H4: ({ children }: any) => <h4 className=" text-blue-500 font-bold">{children}</h4>,
  H5: ({ children }: any) => <h5 className=" text-blue-500 font-bold">{children}</h5>,
  H6: ({ children }: any) => <h6 className=" text-blue-500 font-bold">{children}</h6>,
};
