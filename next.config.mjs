import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import createMDX from '@next/mdx'
/** @type {import('next').NextConfig} */
const nextConfig = {
   
    images:{
        remotePatterns:[
       {     protocol:"https",
            hostname: "**"}
        ]
    }
}

const withMDX = createMDX({
    // Add markdown plugins here, as desired
    options: {
      remarkPlugins: [remarkGfm,],
      rehypePlugins: [rehypeAutolinkHeadings,rehypeHighlight,rehypeSlug,],
    },
  })
   
  // Wrap MDX and Next.js config with each other
  export default withMDX(nextConfig)
