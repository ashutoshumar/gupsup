"use client"
import React,{FC,useContext,useState} from "react";
import { ThemeContext,ActionType} from "@/lib/themeProvider";
import { usePathname } from 'next/navigation'
import {Navbar, NavbarBrand, NavbarContent, NavbarMenuToggle,NavbarItem, Link, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar,NavbarMenu,Button,NavbarMenuItem} from "@nextui-org/react";
import { CustomSession } from "@/utility/CustomSession";
import Image from "next/image";
interface iProp{
    session:CustomSession | null
}
const NavMenu:FC<iProp> =({session})=> {
  console.log("navbar session")
  console.log(session)
  //theme
  const {state,dispatch} = useContext(ThemeContext);
  const [toggle, setToggle] = useState(false);
  const darkMode = state.darkMode;
  function toggleTheme() {
    if (darkMode === true) {
      dispatch({type: ActionType.LIGHTMODE});
    } else {
      dispatch({type:ActionType.DARKMODE});
    }
  }

  const pathname = usePathname()
  
  const menuItems = [
    {
      name: "Home",
      route: "/",
    },
    {
      name: "Threads",
      route: "/threads",
    },
    {
      name:"Stories",
      route:"/stories"
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

  return (
   
    <Navbar className={
      darkMode
        ? "bg-white border-gray-200 z-50 shadow-lg md:px-8 px-1 fixed w-full top-0"
        : "bg-gray-700 border-gray-200 z-50 shadow-lg md:px-8 px-1 fixed w-full top-0"
    }   isBordered>
      <NavbarContent className={
                darkMode
                  ? "text-xl font-medium text-decoration-none whitespace-nowrap text-black sm:hidden "
                  : "text-xl font-medium text-decoration-none whitespace-nowrap text-white sm:hidden "
              } justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent className={
                darkMode
                  ? "text-xl font-medium text-decoration-none whitespace-nowrap text-black sm:hidden pr-3"
                  : "text-xl font-medium text-decoration-none whitespace-nowrap text-white sm:hidden pr-3"
              } justify="center">
        <NavbarBrand>
        {`<GUPp-SUPp/>`}
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex justify-end " justify="start">
      <NavbarBrand className={
                darkMode
                  ? "text-xl font-medium text-decoration-none whitespace-nowrap text-black "
                  : "text-xl font-medium text-decoration-none whitespace-nowrap text-white"
              }>
      {`<GUPp-SUPp/>`}
      </NavbarBrand>

      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-12  " justify="center">
     
      <NavbarItem  >
          <Link   className={darkMode? "text-black":"text-white"} href="/">
          <span className={pathname == "/"  ? " text-blue-500" : " no-underline  "}>
          Home
          </span>
          </Link>
        </NavbarItem>
       
        <NavbarItem >
          <Link  className={darkMode? "text-black":"text-white"} href="/threads" >
          <span className={pathname == "/threads" ?  "text-blue-500" : " no-underline  "}>
          Threads
          </span>
          </Link>
        </NavbarItem>
        <NavbarItem >
          <Link  className={darkMode? "text-black":"text-white"} href="/stories" >
          <span className={pathname == "/stories" ?" text-blue-500" : " no-underline  "}>
          Stories
          </span>
          </Link>
        </NavbarItem >
      { session!.user && <NavbarItem  >
          <Link className={darkMode? "text-black":"text-white"}  href="/write">
          <span className={pathname == "/write" ? "text-blue-500" : " no-underline  "}>
            Write
            </span>
          </Link>
        </NavbarItem>}
        
       { session!.user?.role =="admin" && <NavbarItem  >
          <Link className={darkMode? "text-black":"text-white"} href="/dashboard">
          <span className={(pathname == "/dashboard") ? "text-blue-500" : " no-underline  "}>
          Dashboard
          </span>
          </Link>
        </NavbarItem>}
        {/* <Input
  classNames={{
    base: "max-w-full sm:max-w-[10rem] h-10 hidden sm:flex gap",
    mainWrapper: "h-full",
    input: "text-small",
    inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
  }}
  placeholder="Type to search..."
  size="sm"
  startContent={<IoSearch />}
  type="search"
/> */}
{
  session!.user?(
    <NavbarItem>
    {
      session!.user?.image?(  <Link href="/profile" className="h-full flex justify-center items-center">
            <Avatar radius="full" src={session!.user.image} />
            </Link>
    
    ):(<Link href="/profile">
      <Avatar radius="full" src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
      </Link>)
    }
    </NavbarItem>
  ):(
    <div>
    <Button  color="primary" >
       <Link href="/login" className="text-white"> Login</Link>
      
     </Button>
   </div>
  
  )
}
<NavbarItem >
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
            </NavbarItem >
      </NavbarContent>
      
    
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
          { ((item.route!='/write' && item.route!='/dashboard')||(item.route=="/write" && session!.user)||(item.route =='/dashboard' && session!.user?.role =="admin")) && <Link
            color={
              pathname == item.route ? "primary" :  "foreground"
            }
              className="w-full"
              href={item.route}
              size="lg"
            >
              {item.name}
            </Link>}

          </NavbarMenuItem>
        ))}
        <NavbarMenuItem>
        <div onClick={() => toggleTheme()}>
              {darkMode ? (
                <span className=" cursor-pointer hover:scale-1.50 block">
                  Light
                </span>
              ) : (
                <span className=" cursor-pointer hover:scale-1.50 block">
              Dark
              </span>
              )}
            </div>
        </NavbarMenuItem>
        <NavbarMenuItem>
        {
  session!.user?(
    <div>
    {
      session!.user?.image?(  <Link href="/profile" className="h-full flex justify-start items-start">
            <Avatar radius="full" src={session!.user.image} />
            </Link>
    
    ):(<Link href="/profile" className="h-full flex justify-start items-start">
      <Avatar radius="full" src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
      </Link>)
    }
    </div>
  ):(
    <div>
    <Button  color="primary" >
       <Link href="/login" className="text-white"> Login</Link>
      
     </Button>
   </div>
  
  )
}
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  
  );
}
export default  NavMenu

