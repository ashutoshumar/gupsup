'use client';

import React from 'react';
import { Heading } from './Heading';
import Para from './Para';
import UnorderedList from './UnorderedList';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import "@/styles/highlight-js/github-dark.css";

const PrevueMdx = async ({ children }: { children: string }) => {
  const { MDXRemote } = await import('next-mdx-remote/rsc'); // Dynamic import

  return (
    <>
      <MDXRemote
        source={children}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings, rehypeHighlight],
          },
        }}
        components={{
          h1: Heading.H1,
          h2: Heading.H2,
          h3: Heading.H3,
          h4: Heading.H4,
          h5: Heading.H5,
          h6: Heading.H6,
          p: Para,
          ul: UnorderedList,
        }}
      />
    </>
  );
};

export default PrevueMdx;
