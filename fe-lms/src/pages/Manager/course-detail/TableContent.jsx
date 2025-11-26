import React from "react";
import { Link } from "react-router-dom";
import ContentItem from "./ContentItem";
import PropTypes from "prop-types";
import { Plus, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TableContent({ details, courseId }) {
  console.log(details.length);
  return (
    <div className="mt-8">
      <section id="CourseList" className="glass-card rounded-2xl p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Course Content
            </h2>
            <p className="text-muted-foreground">
              Manage your course materials and lessons
            </p>
          </div>
          <Button asChild variant="gradient">
            <Link to={`/manager/courses/${courseId}/create`}>
              <Plus className="w-4 h-4 mr-2" />
              Add Content
            </Link>
          </Button>
        </div>
        {details.length !== 0 ? (
          details?.map((content, i) => (
            <ContentItem
              key={content._id}
              type={content.type}
              title={content.title}
              id={content._id}
              index={i + 1}
              courseId={courseId}
              imageUrl="/assets/images/thumbnails/cover-video.png"
            />
          ))
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No content yet
            </h3>
            <p className="text-muted-foreground mb-4">
              Start by adding your first lesson or material
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

TableContent.propTypes = {
  details: PropTypes.array,
  courseId: PropTypes.string,
};
