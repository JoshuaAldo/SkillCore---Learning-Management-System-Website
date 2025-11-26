import React from "react";
import secureLocalStorage from "react-secure-storage";
import {
  MANAGER_SESSION,
  STORAGE_KEY,
  STUDENT_SESSION,
} from "../utils/const.js";
import { Link, useRouteLoaderData } from "react-router-dom";
import { Search, User, LogOut, UserCircle, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header({ isAdmin = true }) {
  const session =
    isAdmin === true
      ? useRouteLoaderData(MANAGER_SESSION)
      : useRouteLoaderData(STUDENT_SESSION);
  const handleLogout = () => {
    secureLocalStorage.removeItem(STORAGE_KEY);
    isAdmin === true
      ? window.location.replace("/manager/sign-in")
      : window.location.replace("/student/sign-in");
  };

  return (
    <header className="glass-card p-4 backdrop-blur-xl">
      <div id="TopBar" className="flex items-center justify-between">
        <form action="" className="relative flex-1 max-w-md">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground/50"
            size={20}
          />
          <Input
            type="text"
            name="search"
            id="search"
            placeholder="Search course, student, other file..."
            className="pl-10 bg-white/3 focus:bg-white/8 transition-all duration-200 border-0"
          />
        </form>

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer">
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">
                    {session?.name}
                  </p>
                  <p className="text-xs text-muted-foreground/60">
                    {session?.role}
                  </p>
                </div>
                <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center shadow-glow">
                  {session.profileImg?.includes("default.png") ? (
                    <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center shadow-glow">
                      <User size={20} className="text-white" />
                    </div>
                  ) : (
                    <img
                      src={session.profileImg}
                      className="w-10 h-10 object-cover rounded-full shadow-glow"
                      alt="profile photos"
                    />
                  )}
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 glass-card backdrop-blur-xl border-white/10"
            >
              <DropdownMenuLabel className="text-foreground">
                My Account
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem className="cursor-pointer hover:bg-white/5 focus:bg-white/5 text-foreground">
                <UserCircle className="mr-2 h-4 w-4" />
                <Link
                  to={
                    isAdmin
                      ? "/manager/acccount-settings"
                      : "/student/acccount-settings"
                  }
                >
                  <span>My Account</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem className="cursor-pointer hover:bg-white/5 focus:bg-white/5 text-foreground">
                <LogOut className="mr-2 h-4 w-4" />
                <button type="button" onClick={handleLogout}>
                  Logout
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
