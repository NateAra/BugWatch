import Link from "next/link";
import React from "react";
import { GiAlienBug } from "react-icons/gi";

const NavBar = () => {
  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href={"/"}>
        <GiAlienBug />
      </Link>
      <ul className="flex space-x-6">
        <li>
          <Link href={"/"}>Dashboard</Link>
        </li>
        <li>
          <Link href={""}>Issues</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
