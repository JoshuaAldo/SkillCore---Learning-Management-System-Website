import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="flex items-center gap-[60px]">
      <h1 className="text-white font-bold text-2xl">SkillCore</h1>
      <ul className="flex items-center gap-10">
        <li className="font-semibold transition-all duration-300 hover:text-[#662FFF] text-white">
          <Link to="/manager/sign-in">Manager Page</Link>
        </li>
        <li className="font-semibold transition-all duration-300 hover:text-[#662FFF] text-white">
          <Link to="/student/sign-in">Student Page</Link>
        </li>
      </ul>
    </div>
  );
}
