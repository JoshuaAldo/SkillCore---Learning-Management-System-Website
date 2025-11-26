import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import StudentItem from "./StudentItem";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function ManageStudentsPage() {
  const students = useLoaderData();
  return (
    <div className="p-6 space-y-6">
      <header className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
        <div>
          <h1 className="font-extrabold text-[28px] leading-[42px] text-white">
            Students
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage student accounts and track their progress
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            asChild
            variant="gradient"
            className="bg-[#420ecf] hover:bg-indigo-600 shadow-[-10px_-6px_10px_0_#7F33FF_inset] text-sm rounded-lg"
          >
            <Link to="/manager/students/create">
              <Plus className="w-4 h-4 mr-2" />
              Add Student
            </Link>
          </Button>
        </div>
      </header>
      <section
        id="StudentList"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {students?.map((item) => (
          <StudentItem
            key={item._id}
            id={item._id}
            imageUrl={item.photo_url}
            name={item.name}
            email={item.email}
            totalCourse={item.courses.length}
          />
        ))}
      </section>
    </div>
  );
}
