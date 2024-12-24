"use client";
import {NextUIProvider} from '@nextui-org/react'
import  { PropsWithChildren} from "react";
import { SessionProvider } from "next-auth/react";
import { AuthProvider } from '@/utility/authProvider';
import {useRouter} from 'next/navigation'
import { ThemeProvider } from '@/lib/themeProvider';
export const Provider=({ children }: PropsWithChildren<{}>)=>{
    const router = useRouter();
    return (
    <NextUIProvider navigate={router.push}>
         <ThemeProvider>
     <SessionProvider>
        <AuthProvider>
        { children }
        </AuthProvider>
    </SessionProvider>
      </ThemeProvider>
    </NextUIProvider>
)
}