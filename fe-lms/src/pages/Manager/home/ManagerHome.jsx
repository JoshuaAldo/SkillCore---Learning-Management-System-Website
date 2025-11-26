import React from "react";
import Students from "./Students";
import Courses from "./Courses";
import { useLoaderData } from "react-router-dom";
import { Users, BookOpen, Play, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import CardStat from "@/components/CardStat";

function ManagerHome() {
  const data = useLoaderData();
  const activePercentage = data?.studentEngagement?.activePercentage;
  const inactivePercentage = data?.studentEngagement?.inactivePercentage;
  return (
    <div className="p-6 space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="font-extrabold text-[28px] leading-[42px] text-white">
            Overview
          </h1>
          <p className="text-muted-foreground">Grow your company quickly</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="gradient"
            className="bg-black rounded-lg hover:hover:bg-indigo-600 hover:shadow-[-10px_-6px_10px_0_#7F33FF_inset]"
          >
            Customize
          </Button>
          <Button
            variant="gradient"
            className="bg-[#420ecf] hover:hover:bg-indigo-600 shadow-[-10px_-6px_10px_0_#7F33FF_inset] text-sm rounded-lg"
          >
            Export Data
          </Button>
        </div>
      </header>

      <section id="Stats" className="rounded-[30px] gap-[30px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <CardStat
            label="Total Students"
            value={data?.overviews?.totalStudents}
            icon={Users}
          />
          <CardStat
            label="Total Courses"
            value={data?.overviews?.totalCourses}
            icon={BookOpen}
          />
          <CardStat
            label="Video Content"
            value={data?.overviews?.totalVideos}
            icon={Play}
          />
          <CardStat
            label="Text Content"
            value={data?.overviews?.totalCourseTexts}
            icon={FileText}
          />
        </div>
      </section>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="stat-card">
            <div className="text-center space-y-6">
              <div className="relative w-48 h-48 mx-auto">
                <div className="w-full h-full rounded-full bg-gradient-primary p-1">
                  <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-lg font-bold text-foreground">
                        Student
                      </p>
                      <p className="text-lg font-bold text-foreground">
                        Engagement
                      </p>
                    </div>
                  </div>
                </div>

                <svg
                  className="absolute inset-0 w-full h-full -rotate-90"
                  viewBox="0 0 100 100"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="hsl(var(--muted))"
                    strokeWidth="8"
                    opacity="0.2"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="8"
                    strokeDasharray={`${activePercentage * 2.51} 251`}
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                    <span className="text-sm font-medium">
                      Active Students {activePercentage}%
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-muted"></div>
                    <span className="text-sm font-medium">
                      Inactive Students {inactivePercentage}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Courses />
        <Students />
      </div>
    </div>
  );
}

export default ManagerHome;
