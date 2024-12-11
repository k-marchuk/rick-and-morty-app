'use client';

import Image from 'next/image';
import logo from '/public/images/image.webp';
import Link from 'next/link';
import { AiOutlineMenu, AiOutlineClose, AiOutlineGithub } from 'react-icons/ai';
import { useState } from 'react';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 w-full h-24 shadow-xl bg-[#eaffb0] z-50">
      <div className="flex justify-between items-center h-full px-4 2xl:px-16">
        <Link href="/">
          <Image
            className="h-15 w-20 md:h-100 md:w-300 inline"
            src={logo}
            alt="Logo Rick and Morty"
          />
        </Link>

        <div className="hidden md:flex">
          <ul className="hidden md:flex">
            <li className="mx-4 my-6 md:my-0">
              <Link
                className="text-xl hover:text-pink-500 hover:underline-offset-1 duration-300"
                href="/episode"
              >
                Episodes
              </Link>
            </li>
            <li className="mx-4 my-6 md:my-0">
              <Link
                className="text-xl hover:text-pink-500 hover:underline-offset-1 duration-300"
                href="/location"
              >
                Locations
              </Link>
            </li>
          </ul>
        </div>

        <div
          onClick={handleMenuToggle}
          className="md:hidden cursor-pointer pl-24"
        >
          <AiOutlineMenu size={25} />
        </div>
      </div>

      <div
        className={`fixed top-0 w-[65%] md:hidden h-screen bg-pink-200 p-10 ease-in duration-500
          ${isMenuOpen ? 'left-0' : 'left-[-100%]'}`}
      >
        <div className="flex w-full items-center justify-end">
          <div className="cursor-pointer" onClick={handleMenuToggle}>
            <AiOutlineClose size={25} />
          </div>
        </div>
        <ul className="flex-col py-4">
          <li
            className="mx-4 my-6 md:my-0"
            onClick={() => setIsMenuOpen(false)}
          >
            <Link
              className="text-xl hover:text-green-600 duration-300 hover:underline"
              href="/"
            >
              Home
            </Link>
          </li>
          <li
            className="mx-4 my-6 md:my-0"
            onClick={() => setIsMenuOpen(false)}
          >
            <Link
              className="text-xl hover:text-green-600 duration-300 hover:underline"
              href="/episode"
            >
              Episodes
            </Link>
          </li>
          <li
            className="mx-4 my-6 md:my-0"
            onClick={() => setIsMenuOpen(false)}
          >
            <Link
              className="text-xl hover:text-green-600 duration-300 hover:underline"
              href="/location"
            >
              Locations
            </Link>
          </li>
        </ul>

        <div className="mx-4">
          <Link
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiOutlineGithub size={30} />
          </Link>
        </div>
      </div>
    </nav>
  );
};
