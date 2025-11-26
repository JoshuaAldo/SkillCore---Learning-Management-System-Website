import { zodResolver } from "@hookform/resolvers/zod";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  useLoaderData,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  createCourseSchema,
  updateCourseSchema,
} from "../../../utils/zodSchema";
import { useMutation } from "@tanstack/react-query";
import { createCourse, updateCourse } from "../../../services/courseService";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Upload, X } from "lucide-react";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-toastify";
import { Label } from "@/components/ui/label";

export default function ManageCreateCoursePage() {
  const data = useLoaderData();
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(
      data.course === null ? createCourseSchema : updateCourseSchema
    ),
    defaultValues: {
      name: data?.course?.name,
      tagline: data?.course?.tagline,
      categoryId: data?.course?.category?._id,
      description: data?.course?.description,
    },
  });
  const location = useLocation();
  const currentPath = location.pathname;

  const [file, setFile] = useState(null);
  const inputFileRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setValue("thumbnail", selectedFile, { shouldValidate: true });
    }
    e.target.value = "";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setValue("thumbnail", droppedFile, { shouldValidate: true });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const navigate = useNavigate();

  const mutateCreate = useMutation({
    mutationFn: (data) => createCourse(data),
  });

  const mutateUpdate = useMutation({
    mutationFn: (data) => updateCourse(data, id),
  });

  const onSubmit = async (values) => {
    try {
      const formData = new FormData();

      formData.append("name", values.name);
      formData.append("thumbnail", file);
      formData.append("tagline", values.tagline);
      formData.append("categoryId", values.categoryId);
      formData.append("description", values.description);

      if (data.course === null) {
        await mutateCreate.mutateAsync(formData);
      } else {
        await mutateUpdate.mutateAsync(formData);
      }

      toast.success(
        `${
          currentPath.includes("edit")
            ? "Update Course Successfully!"
            : "Course Added Successfully!"
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
      navigate("/manager/courses");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <header className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="hover:bg-accent"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {currentPath.includes("edit") ? "Edit Course" : "Create New Course"}
          </h1>
          <p className="text-muted-foreground">
            {currentPath.includes("edit")
              ? "Edit the course details"
              : "Fill in the details to create a new course"}
          </p>
        </div>
      </header>

      <div className="glass-card p-6">
        <Form>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 w-[500px]"
          >
            <div className="flex flex-col gap-[10px]">
              <Label htmlFor="title" className="text-foreground">
                Course Name
              </Label>
              <Input
                {...register("name")}
                type="text"
                id="title"
                className="bg-background/50"
                placeholder="e.g., Advanced React Development"
              />
              <span className="error-message text-[#FF435A]">
                {errors?.name?.message}
              </span>
            </div>

            <div className="space-y-3">
              <Label htmlFor="thumbnail" className="text-foreground">
                Course Thumbnail
              </Label>
              <div
                id="thumbnail-preview-container"
                className="relative w-full h-48 rounded-lg overflow-hidden border border-border"
              >
                <button
                  type="button"
                  id="trigger-input"
                  className="absolute top-0 left-0 w-full h-full flex justify-center items-center gap-3 z-0"
                  onClick={() => inputFileRef?.current?.click()}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  <label
                    htmlFor="thumbnail-upload"
                    className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-border rounded-lg cursor-pointer ${
                      file !== null ? "" : "bg-background/50"
                    }  hover:bg-accent/50 transition-colors`}
                  >
                    <Upload
                      className={`w-10 h-10 text-muted-foreground mb-2 ${
                        file !== null ? "hidden" : "block"
                      }`}
                    />
                    <p
                      className={`text-sm text-muted-foreground ${
                        file !== null ? "hidden" : "block"
                      }`}
                    >
                      Click to upload or drag and drop
                    </p>
                    <p
                      className={`text-xs text-muted-foreground ${
                        file !== null ? "hidden" : "block"
                      }`}
                    >
                      PNG, JPG up to 5MB
                    </p>
                  </label>
                </button>
                <img
                  id="thumbnail-preview"
                  src={file ? URL.createObjectURL(file) : ""}
                  className={`w-full h-full object-cover ${
                    file !== null ? "block" : "hidden"
                  }`}
                  alt="thumbnail"
                />
                <button
                  type="button"
                  id="delete-preview"
                  className="absolute right-[10px] bottom-[10px] w-12 h-12 rounded-full z-10 hidden"
                >
                  <img src="/assets/images/icons/delete.svg" alt="delete" />
                </button>
              </div>
              <input
                ref={inputFileRef}
                onChange={handleFileChange}
                type="file"
                id="thumbnail"
                accept="image/*"
                className="absolute bottom-0 left-1/4 -z-10 hidden"
              />
              <span className="error-message text-[#FF435A]">
                {errors?.thumbnail?.message}
              </span>
            </div>

            <div className="flex flex-col gap-[10px]">
              <Label htmlFor="tagline" className="text-foreground">
                Course Tagline
              </Label>
              <Input
                {...register("tagline")}
                type="text"
                id="tagline"
                className="bg-background/50"
                placeholder="Write tagline for the course"
              />
              <span className="error-message text-[#FF435A]">
                {errors?.tagline?.message}
              </span>
            </div>

            <div className="flex flex-col gap-[10px]">
              <Label htmlFor="category" className="text-foreground">
                Select Category
              </Label>
              <Select
                onValueChange={(val) =>
                  setValue("categoryId", val, { shouldValidate: true })
                }
                defaultValue={data?.course?.category?._id || ""}
              >
                <SelectTrigger className="bg-background/50">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {data?.categories?.data?.map((item) => (
                    <SelectItem key={item._id} value={item._id}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span className="error-message text-[#FF435A]">
                {errors?.categoryId?.message}
              </span>
            </div>

            <div className="flex flex-col gap-[10px]">
              <Label htmlFor="desc" className="text-foreground">
                Description
              </Label>
              <Textarea
                {...register("description")}
                id="desc"
                rows="5"
                className="min-h-[120px] bg-background/50 resize-none"
                placeholder="Explain what this course about"
              ></Textarea>
              <span className="error-message text-[#FF435A]">
                {errors?.description?.message}
              </span>
            </div>
            <div className="flex items-center gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/manager/courses")}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="gradient"
                disabled={
                  data?.course === null
                    ? mutateCreate.isLoading
                    : mutateUpdate.isLoading
                }
                className="bg-[#420ecf] hover:hover:bg-indigo-600 shadow-[-10px_-6px_10px_0_#7F33FF_inset] text-sm rounded-lg"
              >
                {currentPath.includes("edit")
                  ? "Update Course"
                  : "Create Course"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
