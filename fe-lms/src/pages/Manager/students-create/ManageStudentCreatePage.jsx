import { zodResolver } from "@hookform/resolvers/zod";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import {
  createStudentSchema,
  updateStudentSchema,
} from "../../../utils/zodSchema";
import { useMutation } from "@tanstack/react-query";
import { createStudent, updateStudent } from "../../../services/studentService";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, User, Mail, Lock, ImagePlus, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ManageStudentCreatePage() {
  const student = useLoaderData();
  const location = useLocation();
  const currentPath = location.pathname;
  const isEditMode = student !== undefined;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(
      isEditMode ? updateStudentSchema : createStudentSchema
    ),
    defaultValues: {
      name: student?.name,
      email: student?.email,
      password: "",
    },
  });

  const navigate = useNavigate();

  const mutateCreate = useMutation({
    mutationFn: (data) => createStudent(data),
  });

  const mutateUpdate = useMutation({
    mutationFn: (data) => updateStudent(data, student?._id),
  });

  const [file, setFile] = useState(null);
  const inputFileRef = useRef(null);

  const onSubmit = async (values) => {
    try {
      const formData = new FormData();
      console.log(values);
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("avatar", file);

      if (isEditMode) {
        if (values.password && values.password.trim() !== "") {
          formData.append("password", values.password);
        }
      } else {
        formData.append("password", values.password);
      }

      if (student === undefined) {
        await mutateCreate.mutateAsync(formData);
      } else {
        await mutateUpdate.mutateAsync(formData);
      }

      toast.success(
        `${
          currentPath.includes("edit")
            ? "Update Student Successfully!"
            : "Student Added Successfully!"
        }`,
        { position: "top-center", theme: "dark" }
      );
      navigate("/manager/students");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong", {
        position: "top-center",
        theme: "dark",
      });
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/manager/students")}
            className="hover:bg-white/10"
          >
            <ArrowLeft size={20} />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {isEditMode ? "Update Student" : "Add New Student"}
            </h1>
            <p className="text-muted-foreground mt-2">
              {isEditMode
                ? "Update your student information"
                : "Create new student account"}
            </p>
          </div>
        </div>
        <div className="glass-card rounded-3xl p-8 md:p-12 backdrop-blur-xl border border-border/20">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-4">
              <Label
                htmlFor="thumbnail"
                className="text-foreground font-semibold text-base"
              >
                Add a Avatar
              </Label>
              <div className="flex items-center gap-6">
                <div
                  id="thumbnail-preview-container"
                  className="relative flex shrink-0 w-20 h-20 rounded-[20px]overflow-hidden"
                >
                  <button
                    type="button"
                    id="trigger-input"
                    onClick={() => inputFileRef?.current?.click()}
                    className="absolute top-0 left-0 w-full h-full flex justify-center items-center gap-3 z-0"
                  >
                    <Avatar
                      className={`w-24 h-24 border-2 border-border/30 ${
                        file !== null ? "hidden" : "block"
                      }`}
                    >
                      <AvatarImage />
                      <AvatarFallback className="bg-background/50">
                        <ImagePlus className="w-10 h-10 text-muted-foreground" />
                      </AvatarFallback>
                    </Avatar>
                  </button>
                  <img
                    id="thumbnail-preview"
                    src={file !== null ? URL.createObjectURL(file) : ""}
                    className={`w-full h-full object-cover ${
                      file !== null ? "block" : "hidden"
                    }`}
                    alt="thumbnail"
                  />
                </div>
                <button
                  type="button"
                  id="delete-preview"
                  onClick={() => {
                    setFile(null);
                    setValue("photo", null);
                    if (inputFileRef.current) {
                      inputFileRef.current.value = "";
                    }
                  }}
                  className={`bg-red-500 rounded-full h-12 w-12 z-10 flex items-center justify-center ${
                    file !== null ? "block" : "hidden"
                  }`}
                >
                  <Trash2 />
                </button>
                <div className={`${file !== null ? "hidden" : "block"}`}>
                  <Input
                    id="photo"
                    ref={inputFileRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        setFile(e.target.files[0]);
                        setValue("photo", e.target.files[0]);
                      } else {
                        setFile(null);
                        setValue("photo", null);
                        if (inputFileRef.current) {
                          inputFileRef.current.value = "";
                        }
                      }
                    }}
                    className="hidden"
                  />
                  <Label
                    htmlFor="photo"
                    className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-background/50 border border-border/30 hover:bg-background/70 cursor-pointer transition-all text-sm font-medium text-foreground"
                  >
                    Choose File
                  </Label>
                </div>
              </div>
              <span className="error-message text-[#FF435A]">
                {errors?.photo?.message}
              </span>
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="name"
                className="text-foreground font-semibold text-base"
              >
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground/60 w-5 h-5" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Write your name"
                  className="h-14 pl-12 bg-background/30 border-border/30 rounded-xl text-base focus:bg-background/50 transition-all"
                  {...register("name")}
                />
              </div>
              <span className="error-message text-[#FF435A]">
                {errors?.name?.message}
              </span>
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="email"
                className="text-foreground font-semibold text-base"
              >
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground/60 w-5 h-5" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Write your email address"
                  className="h-14 pl-12 bg-background/30 border-border/30 rounded-xl text-base focus:bg-background/50 transition-all"
                  {...register("email")}
                />
              </div>
              <span className="error-message text-[#FF435A]">
                {errors?.email?.message}
              </span>
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="password"
                className="text-foreground font-semibold text-base"
              >
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground/60 w-5 h-5" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Type password"
                  className="h-14 pl-12 bg-background/30 border-border/30 rounded-xl text-base focus:bg-background/50 transition-all"
                  {...register("password")}
                />
              </div>
              <span className="error-message text-[#FF435A]">
                {errors?.password?.message}
              </span>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate("/manager/students")}
                className="hover:bg-white/5"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="gradient"
                disabled={
                  student === null
                    ? mutateCreate.isLoading
                    : mutateUpdate.isLoading
                }
                className="bg-[#420ecf] hover:hover:bg-indigo-600 shadow-[-10px_-6px_10px_0_#7F33FF_inset] text-sm rounded-lg"
              >
                {currentPath.includes("edit") ? "Update Now" : "Create Now"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
