import React, { useState } from "react";
import { Link, useLoaderData, useParams } from "react-router-dom";
import ContentText from "./ContentText";
import ContentVideo from "./ContentVideo";
import Header from "../../../components/Header";
import { ArrowLeft, Video, FileText } from "lucide-react";

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

  const getClasses = (item, type) => {
    let baseClasses;
    const isActive = activeContent && activeContent._id === item._id;

    if (type === "button") {
      baseClasses =
        "w-full text-left p-4 rounded-xl transition-all duration-300";
      return `${baseClasses} ${
        isActive
          ? "bg-primary/20 border border-primary/30" // Active styles
          : "glass-card hover:bg-white/5" // Inactive styles
      }`;
    } else if (type === "contentItem") {
      baseClasses =
        "flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0";
      return `${baseClasses} ${
        isActive
          ? "bg-primary/30" // Active styles
          : "bg-white/5" // Inactive styles
      }`;
    } else if (type === "icon") {
      baseClasses = "w-4 h-4";
      return `${baseClasses} ${
        isActive
          ? "text-primary" // Active styles
          : "text-muted-foreground" // Inactive styles
      }`;
    } else if (type === "header") {
      baseClasses = "font-medium text-sm mb-1 line-clamp-2";
      return `${baseClasses} ${
        isActive
          ? "text-primary" // Active styles
          : "text-foreground" // Inactive styles
      }`;
    }
  };

  return (
    <div className="min-h-screen gradient-background flex">
      <aside className="w-80 glass-card border-r border-border/20 flex flex-col px-2">
        <div className="p-6 border-b border-border/20">
          <Link
            to={isAdmin ? `/manager/courses/${id}` : "/student"}
            className="flex items-center gap-2 text-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Dashboard</span>
          </Link>

          <div className="glass-card rounded-xl overflow-hidden mb-4">
            <img
              src={course.thumbnail_url}
              alt={course.name}
              className="w-full aspect-video object-cover"
            />
          </div>

          <h2 className="text-lg font-bold text-foreground mb-1">
            {course.name}
          </h2>
          <p className="text-sm text-muted-foreground">
            {course.category.name}
          </p>
        </div>

        <ul className="flex flex-col gap-4">
          {course?.details?.map((item) => (
            <li key={item._id}>
              <button
                type="button"
                className={getClasses(item, "button")}
                onClick={() => handleChangeContent(item)}
              >
                <div className="flex items-start gap-3">
                  <div className={getClasses(item, "contentItem")}>
                    {item.type === "video" ? (
                      <Video className={getClasses(item, "icon")} />
                    ) : (
                      <FileText className={getClasses(item, "icon")} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={getClasses(item, "header")}>{item.title}</h3>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{item.type} course</span>
                    </div>
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <Header isAdmin={isAdmin} />
        <div className="flex-1 overflow-y-auto">
          {activeContent ? (
            activeContent.type === "text" ? (
              <ContentText
                content={activeContent}
                handleNext={handleNextContent}
              />
            ) : (
              <ContentVideo
                content={activeContent}
                handleNext={handleNextContent}
              />
            )
          ) : (
            <div className="text-white text-center py-10 bg-[#181A35] rounded-lg">
              There is no content available for this course. Please Contact your
              Manager.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
