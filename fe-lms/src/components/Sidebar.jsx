import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar({ isAdmin = true }) {
  const location = useLocation();
  const currentPath = location.pathname;

  const getLinkClasses = (path) => {
    const baseClasses =
      "flex items-center gap-3 w-full rounded-full border p-[14px_20px] transition-all duration-300 hover:bg-[#662FFF] hover:border-[#8661EE] hover:shadow-[-10px_-6px_10px_0_#7F33FF_inset]";

    // Determine if the current path matches the link's path
    // For overview, exact match. For others, startsWith to cover sub-routes.
    const isActive =
      (path === "/manager" && currentPath === "/manager") || // Exact match for overview
      (path === "/student" && currentPath === "/student") || // Exact match for student overview
      (path.startsWith("/manager/courses") &&
        currentPath.startsWith("/manager/courses")) ||
      (path.startsWith("/manager/students") &&
        currentPath.startsWith("/manager/students")) ||
      (path.startsWith("/student/detail-course") &&
        currentPath.startsWith("/student/detail-course"));

    if (isAdmin) {
      // Admin specific active/inactive states
      return `${baseClasses} ${
        isActive
          ? "bg-[#662FFF] border-[#8661EE] shadow-[-10px_-6px_10px_0_#7F33FF_inset]"
          : "bg-[#070B24] border-[#24283E] shadow-[-10px_-6px_10px_0_#181A35_inset]"
      }`;
    } else {
      // Student specific active/inactive states (adjust as needed if student has different inactive styles)
      return `${baseClasses} ${
        isActive
          ? "bg-[#662FFF] border-[#8661EE] shadow-[-10px_-6px_10px_0_#7F33FF_inset]"
          : "bg-[#070B24] border-[#24283E] shadow-[-10px_-6px_10px_0_#181A35_inset]" // Or adjust for student inactive
      }`;
    }
  };

  return (
    <aside className="sidebar-container fixed h-screen w-full max-w-[280px] bg-[#060A23] overflow-hidden flex flex-1 ]">
      <div className="scroll-container flex w-full overflow-y-scroll hide-scrollbar">
        <nav className="flex flex-col w-full h-fit p-[30px] gap-10 z-10">
          <Link to="#">
            <h1 className="text-white font-bold text-2xl">SkillCore</h1>
          </Link>
          <ul className="flex flex-col gap-4">
            <p className="font-semibold text-xs leading-[18px] text-white">
              GENERAL
            </p>
            {isAdmin ? (
              <li>
                <Link to="/manager">
                  <div className={getLinkClasses("/manager")}>
                    {" "}
                    {/* Use getLinkClasses */}
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
                {/* Assuming the student overview is /student */}
                <Link to="/student">
                  <div className={getLinkClasses("/student")}>
                    {" "}
                    {/* Use getLinkClasses for student overview */}
                    <img
                      src="/assets/images/icons/3dcube-white.svg"
                      className="w-6 h-6"
                      alt="icon"
                    />
                    <span className="font-semibold text-white">My Courses</span>{" "}
                    {/* Or "Overview" */}
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
                  <Link to="#">
                    <div className="flex items-center gap-3 w-full rounded-full border p-[14px_20px] transition-all duration-300 hover:bg-[#662FFF] hover:border-[#8661EE] hover:shadow-[-10px_-6px_10px_0_#7F33FF_inset] bg-[#070B24] border-[#24283E] shadow-[-10px_-6px_10px_0_#181A35_inset]">
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
              <Link to="#">
                <div className="flex items-center gap-3 w-full rounded-full border p-[14px_20px] transition-all duration-300 hover:bg-[#662FFF] hover:border-[#8661EE] hover:shadow-[-10px_-6px_10px_0_#7F33FF_inset] bg-[#070B24] border-[#24283E] shadow-[-10px_-6px_10px_0_#181A35_inset]">
                  <img
                    src="/assets/images/icons/security-card-white.svg"
                    className="w-6 h-6"
                    alt="icon"
                  />
                  <span className="font-semibold text-white">Subscription</span>
                </div>
              </Link>
            </li>
            <li>
              <Link to="#">
                <div className="flex items-center gap-3 w-full rounded-full border p-[14px_20px] transition-all duration-300 hover:bg-[#662FFF] hover:border-[#8661EE] hover:shadow-[-10px_-6px_10px_0_#7F33FF_inset] bg-[#070B24] border-[#24283E] shadow-[-10px_-6px_10px_0_#181A35_inset]">
                  <img
                    src="/assets/images/icons/cup-white.svg"
                    className="w-6 h-6"
                    alt="icon"
                  />
                  <span className="font-semibold text-white">Rewards</span>
                </div>
              </Link>
            </li>
            <li>
              <Link to="#">
                <div className="flex items-center gap-3 w-full rounded-full border p-[14px_20px] transition-all duration-300 hover:bg-[#662FFF] hover:border-[#8661EE] hover:shadow-[-10px_-6px_10px_0_#7F33FF_inset] bg-[#070B24] border-[#24283E] shadow-[-10px_-6px_10px_0_#181A35_inset]">
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
      <img
        src="/assets/images/backgrounds/sidebar-glow.png"
        className="absolute object-contain object-bottom bottom-0"
        alt="background"
      />
    </aside>
  );
}
