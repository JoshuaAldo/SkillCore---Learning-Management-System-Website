import { useMutation } from "@tanstack/react-query";
import PropTypes from "prop-types";
import React from "react";
import { Link, useRevalidator } from "react-router-dom";
import { deleteStudent } from "../../../services/studentService";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

export default function StudentItem(props) {
  const { isLoading, mutateAsync } = useMutation({
    mutationFn: () => deleteStudent(props.id),
  });

  const revalidator = useRevalidator();

  const handleDelete = async () => {
    try {
      await mutateAsync();
      revalidator.revalidate();
      toast.success(`Student "${props.name}" has been deleted successfully!`, {
        position: "top-center",
        theme: "dark",
      });
    } catch (error) {
      const message =
        error?.data?.message || "Failed to delete student. Please try again.";
      toast.error(message, { position: "top-center", theme: "dark" });
    }
  };

  return (
    <div
      key={props.id}
      className="glass-card p-6 hover:shadow-glow transition-all duration-300 group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 rounded-lg bg-gradient-primary/10 group-hover:shadow-glow transition-all duration-300">
          <img
            src={props.imageUrl}
            className="w-20 h-24 rounded-lg "
            alt="photo"
          />
        </div>
        <div className="flex gap-2">
          <Button
            size="icon"
            variant="ghost"
            asChild
            className="h-8 w-8 hover:bg-white/10 transition-all duration-200"
          >
            <Link to={`/manager/students/edit/${props.id}`}>
              <Edit size={16} />
            </Link>
          </Button>

          <Button
            size="icon"
            variant="ghost"
            onClick={handleDelete}
            disabled={isLoading}
            className="h-8 w-8 hover:bg-red-500/20 hover:text-red-400 transition-all duration-200"
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-foreground">{props.name}</h3>
        <p className="text-muted-foreground text-sm">{props.email}</p>
        <div className="pt-3 border-t border-white/10 space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Courses:</span>
            <p className="text-sm font-medium text-primary">
              {props.totalCourse} Course Joined
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

StudentItem.propTypes = {
  imageUrl: PropTypes.string,
  name: PropTypes.string,
  totalCourse: PropTypes.number,
  id: PropTypes.number,
};
