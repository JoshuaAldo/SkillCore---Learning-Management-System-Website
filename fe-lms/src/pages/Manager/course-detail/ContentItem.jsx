import { useMutation } from "@tanstack/react-query";
import React from "react";
import { Link, useRevalidator } from "react-router-dom";
import { deleteDetailContentCourse } from "../../../services/courseService";
import { BookOpen, Edit, FileText, Video, FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

export default function ContentItem(props) {
  const revalidator = useRevalidator();
  const { isLoading, mutateAsync } = useMutation({
    mutationFn: () => deleteDetailContentCourse(props.id),
  });

  const handleDelete = async () => {
    try {
      await mutateAsync();
      revalidator.revalidate();
      toast.success(`Content "${props.title}" has been deleted successfully!`, {
        position: "top-center",
        autoClose: 3500,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getContentIcon = (type) => {
    switch (type) {
      case "video":
        return Video;
      case "document":
        return FileText;
      case "quiz":
        return FileQuestion;
      default:
        return BookOpen;
    }
  };
  const ContentIcon = getContentIcon(props.type);
  return (
    <>
      <div className="glass-card rounded-2xl p-8 flex items-center m-4">
        <div className="flex items-center gap-4 text-left w-full">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/20">
            <span className="text-sm font-bold text-primary">
              {props.index}
            </span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <ContentIcon className="w-4 h-4 text-primary" />
              <h3 className="font-semibold text-foreground">{props.title}</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              {props.type === "text" ? "Text" : "Video"} Content
            </p>
          </div>
        </div>
        <div className="flex justify-end items-center gap-3">
          <Button asChild variant="gradient" size="sm">
            <Link to={`/manager/courses/${props.courseId}/edit/${props.id}`}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Content
            </Link>
          </Button>

          <Button
            type="button"
            disabled={isLoading}
            onClick={handleDelete}
            size="sm"
            className="bg-[#fd324a] hover:bg-[#7a0412]"
          >
            Delete
          </Button>
        </div>
      </div>
    </>
  );
}
