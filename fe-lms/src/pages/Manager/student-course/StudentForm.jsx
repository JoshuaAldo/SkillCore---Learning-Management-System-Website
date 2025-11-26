import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  data,
  Link,
  useLoaderData,
  useNavigate,
  useParams,
} from "react-router-dom";
import { addStudentCourseSchema } from "../../../utils/zodSchema";
import { useMutation } from "@tanstack/react-query";
import { addStudentsCourse } from "../../../services/courseService";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Upload,
  UserPlus,
  Search,
  Mail,
  User,
  Trash2,
  Edit,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function StudentForm() {
  const data = useLoaderData();
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(addStudentCourseSchema),
  });

  const navigate = useNavigate();

  const { isLoading, mutateAsync } = useMutation({
    mutationFn: (data) => addStudentsCourse(data, id),
  });

  const onSubmit = async (values) => {
    try {
      const currentStudents = data?.course?.data?.students;
      const studentExists = currentStudents.includes(values.studentId);
      if (!studentExists) {
        await mutateAsync(values);
        toast.success("Student added successfully!", {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        navigate(`/manager/courses/students/${id}`);
      } else {
        toast.error("Student already exists in this course.", {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

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
        <Link
          to={`/manager/courses/${id}`}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          Details
        </Link>
        <Link
          to={`/manager/courses/students/${id}`}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          Students
        </Link>
        <span className="last-of-type:after:content-[''] text-foreground">
          Add Student
        </span>
      </div>

      <Link to={`/manager/courses/students/${id}`}>
        <Button
          variant="ghost"
          className="mb-6 -ml-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Manage Students
        </Button>
      </Link>

      <header className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Add Student
          </h1>
          <p className="text-muted-foreground">Create new future for company</p>
        </div>
      </header>

      <div className="max-w-2xl">
        <div className="glass-card rounded-2xl p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2 flex flex-col gap-[10px]">
              <Label
                htmlFor="studentId"
                className="text-foreground font-medium"
              >
                Student Name
              </Label>
              <Select
                onValueChange={(value) => setValue("studentId", value)}
                defaultValue={watch("studentId")}
              >
                <SelectTrigger className="border-0 shadow-none h-auto flex-1 bg-background/50">
                  <SelectValue placeholder="Choose one student" />
                </SelectTrigger>

                <SelectContent>
                  {data?.students?.map((item) => (
                    <SelectItem key={item._id} value={item._id}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span className="error-message text-[#FF435A]">
                {errors?.studentId?.message}
              </span>
            </div>

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(`/manager/courses/students/${id}`)}
                className="flex-1 h-12"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="gradient"
                disabled={isLoading}
                className="bg-[#420ecf] hover:hover:bg-indigo-600 shadow-[-10px_-6px_10px_0_#7F33FF_inset] text-sm rounded-lg flex-1 h-12"
              >
                Add Now
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
