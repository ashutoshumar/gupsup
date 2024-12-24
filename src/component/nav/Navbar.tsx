"use client";
import React, { FC, useState, useEffect, useContext } from "react";
import NavMenu from "./NavMenu";
import { ThemeContext } from "@/lib/themeProvider";
import { useSession } from "next-auth/react";
import { CustomSession } from "@/utility/CustomSession";
interface NavbarProps {
  sesion: CustomSession | null; // Typing the `sesion` prop properly
}

const Navbar: FC<NavbarProps> = ({ sesion }) => {
  console.log("Navbar");

  // Get theme from the context
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  // State for session
  const [session, setSession] = useState<CustomSession | null>(sesion);

  // Get session data using `useSession`
  const { data } = useSession();

  // Update session state when `data` changes
  useEffect(() => {
    if (data) {
      setSession(data);
    }
  }, [data]);

  return (
    <nav
      className={
        darkMode
          ? "bg-white border-gray-200 z-50 shadow-lg md:px-8 px-1 fixed w-full top-0"
          : "bg-gray-700 border-gray-200 z-50 shadow-lg md:px-8 px-1 fixed w-full top-0"
      }
    >
      <NavMenu session={session} />
      <div className="flex justify-center items-center ml-[-10]"></div>
    </nav>
  );
};

export default Navbar;
