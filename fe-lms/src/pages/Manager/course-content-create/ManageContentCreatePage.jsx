import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { mutateContentSchema } from "../../../utils/zodSchema";
import { useMutation } from "@tanstack/react-query";
import {
  createContentCourse,
  updateContentCourse,
} from "../../../services/courseService";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { ChevronRight, Video, FileText, Crown, Youtube } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function ManageContentCreatePage() {
  const content = useLoaderData();
  const { id, contentId } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(mutateContentSchema),
    defaultValues: {
      title: content?.title || "",
      type: content?.type || "",
      youtubeId: content?.youtubeId || "",
      text: content?.text || "",
    },
  });

  const mutateCreate = useMutation({
    mutationFn: (data) => createContentCourse(data),
  });

  const mutateUpdate = useMutation({
    mutationFn: (data) => updateContentCourse(data, contentId),
  });

  const type = watch("type");

  const onSubmit = async (values) => {
    try {
      if (content === undefined) {
        await mutateCreate.mutateAsync({
          ...values,
          courseId: id,
        });
      } else {
        await mutateUpdate.mutateAsync({
          ...values,
          courseId: id,
        });
      }
      toast.success(
        `${
          content === undefined
            ? "Content Added Successfully!"
            : "Update Content Successfully!"
        }`,
        {
          position: "top-center",
          autoClose: 3500,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        }
      );
      navigate(`/manager/courses/${id}`);
    } catch (error) {
      toast.error("Error Occured! Please Contact Admin!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const extractYouTubeId = (url) => {
    const regex =
      /(?:youtube\.com\/(?:.*v=|v\/|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/;
    const match = url.match(regex);
    console.log("Extracted YouTube ID:", match ? match[1] : null);
    return match ? match[1] : null;
  };

  return (
    <div className="p-8 space-y-6">
      <div
        id="Breadcrumb"
        className="flex items-center gap-2 text-sm text-muted-foreground"
      >
        <Link
          to="/manager/courses"
          className="hover:text-foreground transition-colors"
        >
          Manage Course
        </Link>
        <ChevronRight className="w-4 h-4" />
        <Link
          to={`/manager/courses/${id}`}
          className="hover:text-foreground transition-colors"
        >
          Course
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="last-of-type:after:content-[''] text-foreground">
          {content === undefined ? "Add" : "Edit"} Content
        </span>
      </div>

      <header className="flex items-center gap-4">
        <div className="w-24 h-24 rounded-2xl bg-gradient-primary/20 border-2 border-primary/30 flex items-center justify-center shadow-glow">
          <div className="text-center">
            <Video className="w-8 h-8 text-primary mx-auto mb-1" />
            <FileText className="w-6 h-6 text-primary/60 mx-auto" />
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {content === undefined ? "Add" : "Edit"} Content
          </h1>
          <p className="text-muted-foreground">
            Give a best content for the course
          </p>
        </div>
      </header>

      <div className="glass-card rounded-2xl p-8 max-w-3xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col gap-[10px]">
            <Label
              htmlFor="title"
              className="text-sm font-medium text-foreground"
            >
              Content Title
            </Label>
            <div className="relative">
              <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                {...register("title")}
                type="text"
                id="title"
                className="pl-12 bg-background/50 border-border/20 focus:bg-white/8"
                placeholder="Write better name for your course"
              />
            </div>
            <span className="error-message text-[#FF435A] text-sm">
              {errors?.title?.message}
            </span>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="type"
              className="text-sm font-medium text-foreground"
            >
              Select Type
            </Label>
            <div className="flex items-center w-full">
              <Select
                onValueChange={(value) => setValue("type", value)}
                defaultValue={type}
              >
                <SelectTrigger id="type">
                  <div className="flex items-center gap-2">
                    <Crown className="w-4 h-4 text-primary" />
                    <SelectValue placeholder="Select content type" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="video">
                    <div className="flex items-center gap-2">
                      <Video className="w-4 h-4 text-primary" />
                      Video
                    </div>
                  </SelectItem>
                  <SelectItem value="text">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-primary" />
                      Text
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <span className="error-message text-[#FF435A] text-sm">
              {errors?.type?.message}
            </span>
          </div>

          {type === "video" && (
            <div className="flex flex-col gap-[10px]">
              <Label
                htmlFor="video"
                className="text-sm font-medium text-foreground"
              >
                Youtube Video ID
              </Label>
              <div className="relative">
                <Youtube className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  {...register("youtubeId")}
                  type="text"
                  id="video"
                  className="pl-12 bg-background/50 border-border/20 focus:bg-white/8"
                  placeholder="Write Youtube Video ID"
                />
              </div>
              <span className="error-message text-[#FF435A] text-sm">
                {errors?.youtubeId?.message}
              </span>
            </div>
          )}

          {type === "text" && (
            <div className="flex flex-col gap-[10px] z-0">
              <Label
                htmlFor="text"
                className="text-sm font-medium text-foreground"
              >
                Content Text
              </Label>
              <Editor
                apiKey="febvpzidj7iitu3zfo3qed99wq43qum4glsuho9agt1gp143"
                init={{
                  plugins:
                    "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
                  toolbar:
                    "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
                }}
                initialValue={content?.text}
                onEditorChange={(content, editor) => {
                  setValue("text", content);
                }}
              />
              <span className="error-message text-[#FF435A] text-sm">
                {errors?.text?.message}
              </span>
            </div>
          )}
          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(`/manager/courses/${id}`)}
              className="flex-1 border-border/20"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="gradient"
              disabled={
                content === undefined
                  ? mutateCreate.isLoading
                  : mutateUpdate.isLoading
              }
              className="bg-[#420ecf] hover:hover:bg-indigo-600 shadow-[-10px_-6px_10px_0_#7F33FF_inset] text-sm rounded-lg flex-1"
            >
              {content === undefined ? "Add" : "Edit"} Content Now
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
