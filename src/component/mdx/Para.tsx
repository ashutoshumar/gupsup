import { ReactNode } from 'react';

interface ParaProps {
  children: ReactNode;
}

const Para = ({ children }: any) => {
  return <p className="text-gray-700 my-4  text-large">{children}</p>;
};

export default Para;