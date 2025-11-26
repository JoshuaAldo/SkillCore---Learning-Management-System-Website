import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import CardCourse from "./CardCourse";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function ManageCoursePage() {
  const courses = useLoaderData();

  return (
    <div className="p-6">
      <header className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
        <div>
          <h1 className="font-extrabold text-[28px] leading-[42px] text-white">
            Manage Courses
          </h1>
          <p className="text-muted-foreground">
            Give the best future for your great employees
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            asChild
            variant="gradient"
            className="bg-[#420ecf] hover:bg-indigo-600 shadow-[-10px_-6px_10px_0_#7F33FF_inset] text-sm rounded-lg"
          >
            <Link to="/manager/courses/create">
              <Plus className="w-4 h-4 mr-2" />
              New Course
            </Link>
          </Button>
        </div>
      </header>
      <section
        id="CourseList"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {courses?.data?.map((item) => (
          <CardCourse
            key={item._id}
            id={item._id}
            category={item.category.name}
            imageUrl={item.thumbnail_url}
            name={item.name}
            totalStudents={item.total_students + " Students"}
          />
        ))}
      </section>
    </div>
  );
}
