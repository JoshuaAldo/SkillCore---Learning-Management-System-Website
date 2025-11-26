import React, { useState } from "react";
import { Link, useLoaderData, useParams } from "react-router-dom";
import { ArrowLeft, UserPlus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import StudentItem from "./StudentItem";

export default function StudentCourseList() {
  const { id } = useParams();
  const course = useLoaderData();
  const [searchQuery, setSearchQuery] = useState("");
  const students = course?.students || [];

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  console.log(course);

  return (
    <div className="p-6">
      <div
        id="Breadcrumb"
        className="flex items-center mb-6 text-sm *:after:content-['/'] *:after:ml-2 *:after:mr-2"
      >
        <Link
          to="/manager"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          Dashboard
        </Link>
        <Link
          to="/manager/courses"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          Manage Course
        </Link>
        <Link
          to={`/manager/courses/${id}`}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          Details
        </Link>
        <span className="last-of-type:after:content-[''] text-foreground">
          Students
        </span>
      </div>

      <Link to={`/manager/courses/${id}`}>
        <Button
          variant="ghost"
          className="mb-6 -ml-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Course Details
        </Button>
      </Link>

      <header className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Manage Students
          </h1>
          <p className="text-muted-foreground">
            Keep your employee or student happy
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            asChild
            variant="gradient"
            className="bg-[#420ecf] hover:bg-indigo-600 shadow-[-10px_-6px_10px_0_#7F33FF_inset] text-sm rounded-lg"
          >
            <Link to={`/manager/courses/students/${id}/add`}>
              <UserPlus className="w-4 h-4 mr-2" />
              Add Student
            </Link>
          </Button>
        </div>
      </header>

      <div className="glass-card rounded-2xl p-6 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            placeholder="Search course, student, other file..."
            className="pl-10 bg-background/50 border-border/20"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="glass-card rounded-2xl p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-1">
              {course.name}
            </h2>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-foreground">
              {course.students.length}
            </p>
            <p className="text-sm text-muted-foreground">Total Students</p>
          </div>
        </div>
      </div>

      <section id="CourseList" className="glass-card rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-foreground mb-6">
          Enrolled Students
        </h2>
        {filteredStudents.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserPlus className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {searchQuery ? "No students found" : "No students enrolled yet"}
            </h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery
                ? "Try adjusting your search"
                : "Start by adding students to this course"}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredStudents.map((student) => (
              <StudentItem
                key={student._id}
                id={student._id}
                imageUrl={student.photo_url}
                name={student.name}
                email={student.email}
                category={student.category}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
