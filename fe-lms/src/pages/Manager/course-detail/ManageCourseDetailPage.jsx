import React from "react";
import { Link, useLoaderData, useParams } from "react-router-dom";
import TableContent from "./TableContent";
import { Users, BookOpen, Award, Edit, Eye, Plus, Tags } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ManageCourseDetailPage() {
  const { id } = useParams();

  const course = useLoaderData();

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
        <span className="last-of-type:after:content-[''] text-foreground">
          Details
        </span>
      </div>

      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-foreground">{course?.name}</h1>
        </div>
        <div className="flex items-center gap-3">
          <Button
            asChild
            variant="outline"
            className="glass-card border-border/20 hover:bg-white/10"
          >
            <Link to={`/manager/courses/edit/${id}`}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Course
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="glass-card border-border/20 hover:bg-white/10"
          >
            <Link to={`/manager/courses/students/${id}`}>
              <Users className="w-4 h-4 mr-2" />
              Students
            </Link>
          </Button>
          <Button asChild variant="gradient">
            <Link to={`/manager/courses/${id}/preview`}>
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Link>
          </Button>
        </div>
      </header>

      <section
        id="CourseInfo"
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        <div id="Thumbnail" className="lg:col-span-1">
          <div className="glass-card rounded-2xl overflow-hidden">
            <img
              src={course?.thumbnail_url}
              className="w-full aspect-[4/3] object-cover"
              alt="thumbnail"
            />
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card rounded-2xl p-6 transition-all duration-300 hover:bg-white/8">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-gradient-primary/10 text-indigo-400">
                  <Users size={24} />
                </div>
                <div className="flex-1">
                  <p className="text-2xl font-bold text-foreground mb-1">
                    {course?.students.length}
                  </p>
                  <p className="text-sm text-muted-foreground">Students</p>
                </div>
              </div>
            </div>
            <div className="glass-card rounded-2xl p-6 transition-all duration-300 hover:bg-white/8">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-gradient-primary/10 text-indigo-400">
                  <Tags size={24} />
                </div>
                <div className="flex-1">
                  <p className="text-2xl font-bold text-foreground mb-1">
                    {course?.category?.name}
                  </p>
                  <p className="text-sm text-muted-foreground">Category</p>
                </div>
              </div>
            </div>
            <div className="glass-card rounded-2xl p-6 transition-all duration-300 hover:bg-white/8">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-gradient-primary/10 text-indigo-400">
                  <BookOpen size={24} />
                </div>
                <div className="flex-1">
                  <p className="text-2xl font-bold text-foreground mb-1">
                    {course?.details.length}
                  </p>
                  <p className="text-sm text-muted-foreground">Contents</p>
                </div>
              </div>
            </div>
            <div className="glass-card rounded-2xl p-6 transition-all duration-300 hover:bg-white/8">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-gradient-primary/10 text-indigo-400">
                  <Award size={24} />
                </div>
                <div className="flex-1">
                  <p className="text-2xl font-bold text-foreground mb-1">
                    Certificate
                  </p>
                  <p className="text-sm text-muted-foreground">Certificate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TableContent details={course?.details ?? []} courseId={course._id} />
    </div>
  );
}
