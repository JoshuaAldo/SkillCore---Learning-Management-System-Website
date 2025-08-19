import React, { useState } from "react";
import { Link, useLoaderData, useParams } from "react-router-dom";
import ContentText from "./ContentText";
import ContentVideo from "./ContentVideo";
import Header from "../../../components/Header";

export default function ManageCoursePreviewPage({ isAdmin = true }) {
  const course = useLoaderData();
  const { id } = useParams();

  const [activeContent, setActiveContent] = useState(course?.details[0]);

  const handleChangeContent = (content) => {
    setActiveContent(content);
  };

  const handleNextContent = (content) => {
    const currIndex = course?.details?.findIndex(
      (val) => val._id === content._id
    );

    if (currIndex < course?.details.length - 1) {
      handleChangeContent(course?.details[currIndex + 1]);
    }
  };

  const getContentItemClasses = (item) => {
    const baseClasses =
      "flex items-center gap-3 w-full rounded-full border p-[14px_20px] transition-all duration-300 hover:bg-[#662FFF] hover:border-[#8661EE] hover:shadow-[-10px_-6px_10px_0_#7F33FF_inset]";
    const isActive = activeContent && activeContent._id === item._id; // Check if this item is the active one

    return `${baseClasses} ${
      isActive
        ? "bg-[#662FFF] border-[#8661EE] shadow-[-10px_-6px_10px_0_#7F33FF_inset]" // Active styles
        : "bg-[#070B24] border-[#24283E] shadow-[-10px_-6px_10px_0_#181A35_inset]" // Inactive styles
    }`;
  };

  return (
    <div className="flex min-h-screen">
      <aside className="sidebar-container fixed h-screen w-full max-w-[330px] bg-[#060A23] overflow-hidden flex flex-1">
        <div className="scroll-container flex w-full overflow-y-scroll hide-scrollbar">
          <nav className="flex flex-col w-full h-fit p-[30px] gap-[30px] z-10">
            <Link
              to={isAdmin ? `/manager/courses/${id}` : "/student"}
              className="font-semibold text-white hover:underline"
            >
              <div className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  id="back-arrow"
                >
                  <path fill="none" d="M0 0h24v24H0V0z"></path>
                  <path
                    fill="white"
                    d="M19 11H7.83l4.88-4.88c.39-.39.39-1.03 0-1.42-.39-.39-1.02-.39-1.41 0l-6.59 6.59c-.39.39-.39 1.02 0 1.41l6.59 6.59c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L7.83 13H19c.55 0 1-.45 1-1s-.45-1-1-1z"
                  ></path>
                </svg>
                <span>Back to Dashboard</span>
              </div>
            </Link>
            <div className="flex flex-col gap-4">
              <div className="flex shrink-0 w-[130px] h-[100px] rounded-[14px] bg-[#D9D9D9] overflow-hidden">
                <img
                  src="/assets/images/thumbnails/th-1.png"
                  className="w-full h-full object-cover"
                  alt="thumbnail"
                />
              </div>
              <h2 className="font-bold text-xl leading-[34px] text-white">
                {course?.name}
              </h2>
            </div>
            <ul className="flex flex-col gap-4">
              {course?.details?.map((item) => (
                <li key={item._id}>
                  <button
                    type="button"
                    className="w-full text-left"
                    onClick={() => handleChangeContent(item)}
                  >
                    <div className={getContentItemClasses(item)}>
                      <img
                        src={`/assets/images/icons/${
                          item.type === "text"
                            ? "note-white.svg"
                            : "video-play-white.svg"
                        }`}
                        className="w-6 h-6"
                        alt="icon"
                      />
                      <span className="w-full font-semibold text-white line-clamp-1 transition-all duration-300 hover:line-clamp-none">
                        {item.title}
                      </span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <img
          src="/assets/images/backgrounds/sidebar-glow.png"
          className="absolute object-contain object-bottom bottom-0"
          alt="background"
        />
      </aside>
      <main className="flex flex-col flex-1 gap-[30px] p-[30px] ml-[340px]">
        <Header isAdmin={isAdmin} />
        <div className="relative flex flex-col gap-[26px]">
          {activeContent?.type === "text" ? (
            <ContentText
              content={activeContent}
              handleNext={handleNextContent}
            />
          ) : (
            <ContentVideo
              content={activeContent}
              handleNext={handleNextContent}
            />
          )}
        </div>
      </main>
    </div>
  );
}
