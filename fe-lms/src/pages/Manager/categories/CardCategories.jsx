import React from "react";
import { Edit, Trash2, FolderTree } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { deleteCategories } from "@/services/courseService";
import { Link, useRevalidator } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

export default function CardCategories(props) {
  const { isLoading, mutateAsync } = useMutation({
    mutationFn: () => deleteCategories(props.id),
  });

  const revalidator = useRevalidator();

  const handleDelete = async () => {
    try {
      await mutateAsync();
      revalidator.revalidate();
      toast.success(
        `Category "${props.categoryName}" has been deleted successfully!`,
        { position: "top-center", theme: "dark" }
      );
    } catch (error) {
      const message =
        error?.data?.message ||
        "Failed to delete category. Please try again. Make sure the category has no courses.";
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
          <FolderTree size={24} className="text-primary" />
        </div>
        <div className="flex gap-2">
          <Button
            size="icon"
            variant="ghost"
            asChild
            className="h-8 w-8 hover:bg-white/10 transition-all duration-200"
          >
            <Link to={`/manager/categories/edit/${props.id}`}>
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
        <h3 className="text-xl font-semibold text-foreground">
          {props.categoryName}
        </h3>
        <div className="pt-3 border-t border-white/10">
          <span className="text-sm font-medium text-primary">
            {props.totalCourses} courses
          </span>
        </div>
      </div>
    </div>
  );
}
