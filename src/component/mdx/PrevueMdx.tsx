import { MDXRemote } from 'next-mdx-remote/rsc'
import React from 'react'
import { Heading } from './Heading'
import Para from './Para'
import UnorderedList from './UnorderedList'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import "@/styles/highlight-js/github-dark.css"
const PrevueMdx = ({ children }: { children: string }) => {
  
  return (
    <> 
    
    
    <MDXRemote source={children} options={{mdxOptions: {
      remarkPlugins: [remarkGfm ],
      rehypePlugins: [
        rehypeSlug,
        rehypeAutolinkHeadings,
         rehypeHighlight
      ],
    },}}  components={{
      h1: Heading.H1,
      h2: Heading.H2,
      h3: Heading.H3,
      h4: Heading.H4,
      h5: Heading.H5,
      h6: Heading.H6,
      p: Para,
      ul:UnorderedList,
     
    
     }} />

     </>
  )
}

export default PrevueMdx
 
// export default async function PrevueMdx({ children }: { children: string }) {
//   // Optionally provide a type for your frontmatter object
//   const { content, frontmatter } = await compileMDX<{ title: string }>({
//     source: {children},
//     options: { parseFrontmatter: true },
//   })
//   return (
//     <>
//       <h1>{frontmatter.title}</h1>
//       {content}
//     </>
//   )
// }

// options={
  // { mdxOptions: {
  //   remarkPlugins: [remarkGfm ,remarkParse, remarkRehype,remarkHtml],
  //   rehypePlugins: [
  //     rehypeSlug,
  //     rehypeAutolinkHeadings,
  //     rehypePrism,
  //     rehypeStringify,
  //   ],
  // },
// }
// }