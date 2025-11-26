import {
  useLoaderData,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCategorySchema, updateCategorySchema } from "@/utils/zodSchema";
import { useForm } from "react-hook-form";
import { createCategory, updateCategory } from "@/services/courseService";
import { toast } from "react-toastify";

export default function ManageCreateCategoriesPage() {
  const category = useLoaderData();
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const isEditMode = category !== undefined;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(
      isEditMode ? updateCategorySchema : createCategorySchema
    ),
    defaultValues: {
      name: category?.name,
    },
  });

  const mutateCreate = useMutation({
    mutationFn: (data) => createCategory(data),
  });

  const mutateUpdate = useMutation({
    mutationFn: (data) => updateCategory(data, id),
  });

  const onSubmit = async (values) => {
    try {
      const data = { name: values.name };
      console.log(data);
      if (category === undefined) {
        await mutateCreate.mutateAsync(data);
      } else {
        await mutateUpdate.mutateAsync({ ...data, id });
      }

      toast.success(
        `${
          currentPath.includes("edit")
            ? "Update Category Successfully!"
            : "Category Added Successfully!"
        }`,
        { position: "top-center", theme: "dark" }
      );
      navigate("/manager/categories");
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
            onClick={() => navigate("/manager/categories")}
            className="hover:bg-white/10"
          >
            <ArrowLeft size={20} />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {isEditMode ? "Update Category" : "Add New Category"}
            </h1>
            <p className="text-muted-foreground mt-2">
              {isEditMode
                ? "Update your category name"
                : "Create a new category to organize your courses"}
            </p>
          </div>
        </div>

        <div className="glass-card p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="categoryName">Category Name</Label>
              <Input
                id="categoryName"
                {...register("name")}
                placeholder="Enter category name"
                type="text"
                className="bg-white/5 border-white/10 focus:bg-white/10"
              />
              <span className="error-message text-[#FF435A]">
                {errors?.name?.message}
              </span>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate("/manager/categories")}
                className="hover:bg-white/5"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="gradient"
                disabled={
                  category === null
                    ? mutateCreate.isLoading
                    : mutateUpdate.isLoading
                }
                className="bg-[#420ecf] hover:hover:bg-indigo-600 shadow-[-10px_-6px_10px_0_#7F33FF_inset] text-sm rounded-lg"
              >
                {currentPath.includes("edit")
                  ? "Update Category"
                  : "Create Category"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
