"use client";

import React from "react";
import ApplicationLogo from "../ui/applicationLogo";
import Link from "next/link";

const navData = [
  { href: "/jobs", label: "Find Job" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
];

const NavBar = () => {
  return (
    <div>
      <nav className="flex items-center justify-between px-8 bg-white shadow-md fixed top-0 z-50 w-full">
        <ApplicationLogo className="h-20 w-20" src="/logo.png" alt="Logo" />

        <ul className="flex items-center space-x-6 w-2/3 font-semibold ">
          {navData.map((item) => (
            <li
              key={item.href}
              className="text-md hover:text-monzo-brandDark transition-colors hover:underline"
            >
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
