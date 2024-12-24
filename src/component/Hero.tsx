"use client"
import React, { useContext } from "react";
import heroBg from "../../public/webdev.svg";
import { ReactTypical } from '@deadcoder0904/react-typical'
import { ThemeContext } from "@/lib/themeProvider";
import { motion } from "framer-motion";
import cloudBg from "../../public/cloudBg.png"
import cloudDark from "../../public/cloudDark.png";
import Image from 'next/image'

const Hero = () => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
  console.log(darkMode)
  return (
    <> 
     {/* <Image src={heroBg} alt="Picture of the author" /> */}
      <div
        style={
          darkMode
            ? { backgroundImage: `url(${cloudBg.src})`, backgroundSize: "cover" }
            : { backgroundImage: `url(${cloudDark.src})`, backgroundSize: "cover" }
        }
      >
        <main
          className="mx-auto max-w-7xl px-4 sm:px-6 md:mt-0 lg:px-8 flex flex-col md:flex-row items-center justify-center md:justify-between h-screen"
          id="/"
        >
          <div className="sm:text-center lg:text-left">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-4xl">
              <motion.span
                className={darkMode ? "block text-black" : " text-white"}
              >
                Hi, It's {`<GUPp-SUPp/>`} Time 
              </motion.span>
              <span className="block text-blue-500 z-0 lg:inline">
                <ReactTypical
                  steps={[
                    "Story Telling",
                    4000,
                    "Reading ",
                    4000,
                    "Learning",
                    4000,
                  ]}
                  loop={Infinity}
                />
              </span>
            </h1>
            <p
              className={
                darkMode
                  ? "mt-3 text-base text-black sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
                  : "mt-3 text-base text-white sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
              }
            >
              I am all about Story Telling , Reading and Learning.
            </p>
            {/* <div className="flex md:justify-start ">
              {contactLinks.map((el) => (
                <a
                  href={el.link}
                  className="mr-5 cursor-pointer mt-8 hover:scale-125"
                >
                  <img alt="" src={el.url} />
                   <p className="text-md mt-2 hover:hidden">{el.name}</p> 
                </a>
              ))}
            </div> */}
           
          </div>
          <motion.img
            initial="hidden"
            whileInView={"visible"}
            variants={{
              visible: {
                y: 0,
                opacity: 1,
                transition: {
                  type: "spring",
                },
              },
              hidden: { opacity: 1, y: 80 },
            }}
            src={heroBg.src}
            alt=""
            className="md:w-3/6 hidden sm:block"
          />
        </main>
      </div>
    </>
  );
};

export default Hero;
