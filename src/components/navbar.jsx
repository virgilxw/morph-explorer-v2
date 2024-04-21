import React, { useState } from "react";
import { Menu } from '@headlessui/react'
import Dropdown from './navbar/dropdown'

const Navbar = () => {
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <header className="flex flex-row justify-between items-center w-full h-20 px-4 text-white bg-black fixed nav z-50">
      <h1 className=" font-signature ml-2">
        <a
          className="link-underline link-underline-black"
          href=""
          target="_blank"
          rel="noreferrer"
        >
          Morphometrics Explorer v2
        </a>
      </h1>
      <div className="flex justify-between items-center">
        <Dropdown/>
        <p className="px-3">about</p>
      </div>
    </header>
  );
};

export default Navbar;
