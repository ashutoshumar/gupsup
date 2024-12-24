import { Metadata } from "next";
import { ReactNode, Suspense } from "react";
import Loading from "./loading";
export const metadata:Metadata={
    title:"update"
}
export default function Layout({children}:{children:ReactNode})
{
    return (
     <section>
 <Suspense fallback={<Loading/>}>
        {children}
        </Suspense>
       
     </section>
    )
}