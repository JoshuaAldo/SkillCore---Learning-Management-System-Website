import React from "react";
import { Link, useRevalidator } from "react-router-dom";
import PropTypes from "prop-types";
import { useMutation } from "@tanstack/react-query";
import { deleteCourse } from "../../../services/courseService";
import { Users, Settings, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

export default function CardCourse(props) {
  const { isLoading, mutateAsync } = useMutation({
    mutationFn: () => deleteCourse(props.id),
  });

  const revalidator = useRevalidator();

  const handleDelete = async () => {
    try {
      await mutateAsync();
      revalidator.revalidate();
      toast.success(`Course "${props.name}" has been deleted successfully!`, {
        position: "top-center",
        theme: "dark",
      });
    } catch (error) {
      const message =
        error?.data?.message ||
        "Failed to delete course. Please try again. Make sure the course has no content.";
      toast.error(message, { position: "top-center", theme: "dark" });
    }
  };
  return (
    <div className="glass-card rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:bg-white/8">
      <div className="aspect-video overflow-hidden">
        <img
          src={props.imageUrl}
          className="w-full h-full object-cover"
          alt="thumbnail"
        />
      </div>

      <div className="px-6 pt-6">
        <h3 className="text-lg font-semibold text-foreground mb-3">
          {props.name}
        </h3>
        <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <p className="text-[#838C9D]">{props.totalStudents}</p>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-accent rounded-full"></div>
            <p className="text-[#838C9D]">{props.category}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 px-4 pb-4">
        <Button
          type="button"
          onClick={handleDelete}
          disabled={isLoading}
          className="flex-1 bg-destructive/20 hover:bg-destructive/30 text-destructive border-destructive/20"
        >
          <Trash2 className="w-3 h-3 mr-1" />
          Delete
        </Button>

        <Button
          asChild
          variant="outline"
          className="flex-1 glass-card border-border/20 hover:bg-white/10"
        >
          <Link to={`/manager/courses/students/${props.id}`}>
            <Users className="w-3 h-3 mr-1" />
            Students
          </Link>
        </Button>

        <Button
          asChild
          variant="outline"
          className="flex-1 glass-card border-border/20 hover:bg-white/10"
        >
          <Link to={`/manager/courses/${props.id}`}>
            <Settings className="w-3 h-3 mr-1" />
            Manage
          </Link>
        </Button>
      </div>
    </div>
  );
}

CardCourse.propTypes = {
  id: PropTypes.number,
  imageUrl: PropTypes.string,
  totalStudents: PropTypes.string,
  category: PropTypes.string,
  name: PropTypes.string,
};
