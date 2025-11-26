import React from "react";
import CardCourse from "./CardCourse";
import { useLoaderData } from "react-router-dom";

export default function StudentPage() {
  const courses = useLoaderData();

  return (
    <section id="LatestCourse" className="p-6">
      <header className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
        <div>
          <h1 className="font-extrabold text-[28px] leading-[42px] text-white">
            Latest Courses
          </h1>
        </div>
      </header>

      <section
        id="CourseList"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {courses.map((item) => (
          <CardCourse
            key={item._id}
            id={item._id}
            imageUrl={item.thumbnail_url}
            title={item.name}
            category={item.category.name}
          />
        ))}
      </section>
    </section>
  );
}
