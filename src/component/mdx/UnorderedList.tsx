import { ReactNode } from 'react';

interface UnorderedListProps {
  children: ReactNode;
}

const UnorderedList = ({ children }: any) => {
  return (
    <ul className="list-disc list-inside pl-5">
      {children}
    </ul>
  );
};

export default UnorderedList;