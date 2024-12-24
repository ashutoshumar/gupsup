"use client"
import React, {FC, useContext, useState} from "react";
import Link from "next/link";
import { ThemeContext,ActionType} from "@/lib/themeProvider";
import { motion, AnimatePresence } from "framer-motion";
import Hamburger from "hamburger-react";
import { Button,Avatar } from "@nextui-org/react";
import Image from 'next/image'
import Profile from "../component/profile/Profile";
// import { headers } from "next/headers";

interface iProp{
  session:any
}
const Navbar:FC<iProp> =({session})  => {
  // const headerList = headers();
  // const pathname = headerList.get("x-current-path");
  // console.log("pathname",pathname)
  // if(pathname=="/dashboard")
  // {
  //   console.log("true")
  // }
  // else
  // {
  //   console.log("false")
  // }
  const {state,dispatch} = useContext(ThemeContext);
  const [toggle, setToggle] = useState(false);
  const darkMode = state.darkMode;
   console.log(session)

  const links = [
    {
      name: "Home",
      route: "/",
    },
    {
      name: "Threads",
      route: "/thread",
    },
    {
      name: "Write",
      route: "/write",
    },
    {
      name: "Dashboard",
      route: "/dashboard",
    },
    
  ];


 


  function toggleTheme() {
    if (darkMode === true) {
      dispatch({type: ActionType.LIGHTMODE});
    } else {
      dispatch({type:ActionType.DARKMODE});
    }
  }
 
  return (
    <div className="bg-blue">
      <nav
        className={
          darkMode
            ? "bg-white border-gray-200 z-50 shadow-lg md:px-8 px-1 fixed w-full top-0"
            : "bg-gray-700 border-gray-200 z-50 shadow-lg md:px-8 px-1 fixed w-full top-0"
        }
      >
        <div className="flex justify-between items-center py-2 md:py-4 md:px-2 mx-auto">
          <div className="flex items-center cursor-pointer">
            <a
              href="#"
              className={
                darkMode
                  ? "text-xl font-medium text-decoration-none whitespace-nowrap text-black"
                  : "text-xl font-medium text-decoration-none whitespace-nowrap text-white"
              }
            >
              {`<GUPp-SUPp/>`}
            </a>
          </div>
       
         <div className="hidden justify-between items-center w-full md:flex md:w-auto ">
            <ul
              className={
                "flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-md md:font-medium"
              }
            >
           
             
              {links.map((el) => (
                <li key={el.name} className="cursor-pointer">
                  <Link
                    
                    href={el.route}
                   
                    className={
                      darkMode
                        ? "block py-2 px-3 text-black hover:bg-blue-500 hover:text-white rounded-md"
                        : "block py-2 px-3 text-white hover:bg-blue-500 hover:text-black rounded-md"
                    }
                  >
                    {el.name}
                  </Link>
                </li>
              ))}
               {
  session?(
    <div>
    {
      session!.user?.image?(  <Profile url={session!.user?.image} name={session.user?.name!}  email={session.user?.email!} about={session.user?.about!}/>
    
    ):( <Avatar
      isBordered
      className="transition-transform"
      color="secondary"
      name="Jason Hughes"
      size="sm"
      src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
    />)
    }
    
    </div>
  ):(
    <li>
    <Button  color="primary" >
       <Link href="/login" className="text-white"> Login</Link>
      
     </Button>
     </li>
  
  )
}
            </ul>
            <div onClick={() => toggleTheme()}>
              {darkMode ? (
                <Image
                width={0}
                height={0}
                  src="https://img.icons8.com/external-flaticons-flat-flat-icons/64/000000/external-sun-lighting-flaticons-flat-flat-icons.png"
                  className="w-6 ml-6 cursor-pointer hover:scale-1.50 block"
                  alt=""
                />
              ) : (
                <Image
                width={0}
                height={0}
                  src="https://img.icons8.com/external-prettycons-lineal-color-prettycons/49/000000/external-moon-astrology-and-symbology-prettycons-lineal-color-prettycons.png"
                  className="w-6 ml-6 cursor-pointer hover:scale-1.50 block"
                  alt=""
                />
              )}
            </div>
          </div>

          <div className="flex md:hidden items-center">
            <div onClick={() => toggleTheme()}>
              {darkMode ? (
                <Image
                width={0}
                height={0}
                  src="https://img.icons8.com/external-flaticons-flat-flat-icons/64/000000/external-sun-lighting-flaticons-flat-flat-icons.png"
                  className="w-6 mr-4 cursor-pointer hover:scale-1.50 block"
                  alt=""
                />
              ) : (
                <Image
                width={0}
                height={0}
                  src="https://img.icons8.com/external-prettycons-lineal-color-prettycons/49/000000/external-moon-astrology-and-symbology-prettycons-lineal-color-prettycons.png"
                  alt=""
                  className="w-6 mr-4 cursor-pointer hover:scale-1.50 block"
                />
              )}
            </div>

            <Hamburger
              toggled={toggle}
              size={22}
              duration={0.8}
              distance={"lg"}
              toggle={setToggle}
              color={darkMode ? "#000000" : "#ffffff"}
            />
          </div>
        </div>
        {/* Mobile view nav bar */}
      </nav>
      <AnimatePresence>
        {toggle && (
          <motion.div
            initial={{ x: 100 }}
            animate={{ x: 0, transition: { type: "spring" } }}
            exit={{ x: 200, transition: { type: "spring" } }}
            className={
              darkMode
                ? "bg-white py-2 px-2 md:p-0 z-50 fixed top-16 mt-2 rounded-lg shadow-lg right-2 block w-40"
                : "bg-black py-2 px-2 md:p-0 z-50 fixed top-16 mt-2 rounded-lg shadow-lg right-2 block w-40"
            }
          >
            <ul className="md:hidden md:flex-row md:space-y-8 md:mt-0 md:text-md md:font-medium">
              {links.map((el) => (
                <Link
                key={el.route}
                href={el.route}
                
                  className={
                    darkMode
                      ? "hover:bg-blue-500 text-black block px-3 py-2 rounded-md text-base font-medium mt-1 hover:text-white"
                      : "hover:bg-blue-500 text-white block px-3 py-2 rounded-md text-base font-medium mt-1 hover:text-white"
                  }
               
                 
                >
                  <li >{el.name}</li>
                </Link>
              ))}
               {
  session?(
    <div>
    {
      session!.user?.image?(  <Profile url={session!.user?.image} name={session.user?.name!}  email={session.user?.email!} about={session.user?.about!}/>
    
    ):( <Avatar
      isBordered
      className="transition-transform"
      color="secondary"
      name="Jason Hughes"
      size="sm"
      src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
    />)
    }
    
    </div>
  ):(
    <li>
    <Button  color="primary" >
       <Link href="/login" className="text-white"> Login</Link>
      
     </Button>
     </li>
  
  )
}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
