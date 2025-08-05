"use client";

import React from "react";
import ApplicationLogo from "../ui/applicationLogo";
import Link from "next/link";
import { Button } from "../ui/button";
import { FaBookmark } from "react-icons/fa6";

const NavBar = () => {
  return (
    <div>
      <nav className="flex items-center justify-between px-8 bg-white shadow-md fixed top-0 z-[99999] w-full">
        <ApplicationLogo className="h-16 w-16" src="/logo.png" alt="Logo" />

        <ul className="flex items-center space-x-6  font-semibold ">
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
