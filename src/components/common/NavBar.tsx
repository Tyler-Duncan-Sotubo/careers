"use client";

import React from "react";
import ApplicationLogo from "../ui/applicationLogo";
import Link from "next/link";
import { Button } from "../ui/button";
import { FaBookmark } from "react-icons/fa6";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineWork } from "react-icons/md";

const NavBar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div>
      <nav className="flex items-center justify-between px-8 bg-white shadow-md fixed top-0 z-[99999] w-full">
        <ApplicationLogo
          className="h-16 w-16"
          src="https://res.cloudinary.com/dw1ltt9iz/image/upload/v1757584746/logo_dggjny.png"
          alt="Logo"
        />

        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger>
              <GiHamburgerMenu size={30} className="text-monzo-brandDark" />
            </SheetTrigger>
            <SheetContent className="w-[300px] z-[999999] bg-white">
              <nav className="flex flex-col items-start space-y-4 pt-10">
                <ul className="md:flex items-center font-semibold ">
                  <li>
                    <Link href="/jobs" className="flex items-center space-x-2">
                      <Button
                        className="h-10 text-lg text-black hover:text-monzo-brandDark"
                        variant={"link"}
                        onClick={() => setIsOpen(false)}
                      >
                        <MdOutlineWork />
                        Find Jobs
                      </Button>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://centahr.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        className="h-10 text-lg text-black hover:text-monzo-brandDark"
                        variant={"link"}
                        onClick={() => setIsOpen(false)}
                      >
                        <MdOutlineWork />
                        Post Job
                      </Button>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/bookmarks"
                      className="flex items-center space-x-2"
                    >
                      <Button
                        className="h-10 text-lg text-black hover:text-monzo-brandDark"
                        variant={"link"}
                        onClick={() => setIsOpen(false)}
                      >
                        <FaBookmark className="w-6 h-6" title="Bookmarked" />
                        Bookmarks
                      </Button>
                    </Link>
                  </li>
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        <ul className="md:flex items-center space-x-6 font-semibold hidden ">
          <li>
            <Link href="/jobs">
              <Button className="h-10" variant={"secondary"}>
                Find Jobs
              </Button>
            </Link>
          </li>
          <li>
            <Link
              href="https://centahr.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="h-10">Post Job</Button>
            </Link>
          </li>
          <li>
            <Link href="/bookmarks">
              <FaBookmark className="w-6 h-6" title="Bookmarked" />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
