import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar({ isAdmin = true }) {
  const location = useLocation();
  const currentPath = location.pathname;

  const getLinkClasses = (path) => {
    const baseClasses =
      "flex items-center gap-3 w-full rounded-lg border p-[10px_20px] transition-all duration-300 hover:bg-[#662FFF] hover:border-[#8661EE] hover:shadow-[-10px_-6px_10px_0_#7F33FF_inset]";

    const isActive =
      (path === "/manager" && currentPath === "/manager") ||
      (path === "/student" && currentPath === "/student") ||
      (path.startsWith("/manager/courses") &&
        currentPath.startsWith("/manager/courses")) ||
      (path.startsWith("/manager/students") &&
        currentPath.startsWith("/manager/students")) ||
      (path.startsWith("/manager/categories") &&
        currentPath.startsWith("/manager/categories")) ||
      (path.startsWith("/manager/acccount-settings") &&
        currentPath.startsWith("/manager/acccount-settings")) ||
      (path.startsWith("/student/acccount-settings") &&
        currentPath.startsWith("/student/acccount-settings")) ||
      (path.startsWith("/student/detail-course") &&
        currentPath.startsWith("/student/detail-course"));

    if (isAdmin) {
      return `${baseClasses} ${
        isActive
          ? "bg-[#662FFF] border-[#8661EE] shadow-[-10px_-6px_10px_0_#7F33FF_inset]"
          : "bg-[#070B24] border-[#24283E] shadow-[-10px_-6px_10px_0_#181A35_inset]"
      }`;
    } else {
      return `${baseClasses} ${
        isActive
          ? "bg-[#662FFF] border-[#8661EE] shadow-[-10px_-6px_10px_0_#7F33FF_inset]"
          : "bg-[#070B24] border-[#24283E] shadow-[-10px_-6px_10px_0_#181A35_inset]"
      }`;
    }
  };

  return (
    <aside className="sidebar-container fixed h-screen w-full max-w-[280px] glass-card transition-all duration-300 backdrop-blur-xl overflow-hidden flex flex-1">
      <div className="scroll-container flex w-full  hide-scrollbar">
        <nav className="flex flex-col w-full h-fit p-[30px] gap-10 z-10">
          <Link to="#">
            <h1 className="text-xl font-bold text-white bg-clip-text text-transparent">
              SkillCore
            </h1>
          </Link>
          <ul className="flex flex-col gap-4">
            <p className="font-semibold text-xs leading-[18px] text-white">
              GENERAL
            </p>
            {isAdmin ? (
              <li>
                <Link to="/manager">
                  <div className={getLinkClasses("/manager")}>
                    <img
                      src="/assets/images/icons/3dcube-white.svg"
                      className="w-6 h-6"
                      alt="icon"
                    />
                    <span className="font-semibold text-white">Overview</span>
                  </div>
                </Link>
              </li>
            ) : (
              <li>
                <Link to="/student">
                  <div className={getLinkClasses("/student")}>
                    {" "}
                    <img
                      src="/assets/images/icons/3dcube-white.svg"
                      className="w-6 h-6"
                      alt="icon"
                    />
                    <span className="font-semibold text-white">My Courses</span>{" "}
                  </div>
                </Link>
              </li>
            )}
            {isAdmin && (
              <>
                <li>
                  <Link to="/manager/courses">
                    <div className={getLinkClasses("/manager/courses")}>
                      <img
                        src="/assets/images/icons/note-favorite-white.svg"
                        className="w-6 h-6"
                        alt="icon"
                      />
                      <span className="font-semibold text-white">Courses</span>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link to="/manager/categories">
                    <div className={getLinkClasses("/manager/categories")}>
                      <img
                        src="/assets/images/icons/crown-white.svg"
                        className="w-6 h-6"
                        alt="icon"
                      />
                      <span className="font-semibold text-white">
                        Categories
                      </span>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link to="/manager/students">
                    <div className={getLinkClasses("/manager/students")}>
                      <img
                        src="/assets/images/icons/profile-2user-white.svg"
                        className="w-6 h-6"
                        alt="icon"
                      />
                      <span className="font-semibold text-white">Students</span>
                    </div>
                  </Link>
                </li>
              </>
            )}
          </ul>
          <ul className="flex flex-col gap-4">
            <p className="font-semibold text-xs leading-[18px] text-white">
              OTHERS
            </p>
            <li>
              <Link
                to={
                  isAdmin
                    ? "/manager/acccount-settings"
                    : "/student/acccount-settings"
                }
              >
                <div
                  className={
                    isAdmin
                      ? getLinkClasses("/manager/acccount-settings")
                      : getLinkClasses("/student/acccount-settings")
                  }
                >
                  <img
                    src="/assets/images/icons/setting-2-white.svg"
                    className="w-6 h-6"
                    alt="icon"
                  />
                  <span className="font-semibold text-white">Settings</span>
                </div>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}
