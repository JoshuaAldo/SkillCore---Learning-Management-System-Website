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

export default function StudentForm() {
  const data = useLoaderData();
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
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
        // Only run mutateAsync if the studentId does NOT exist
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
        // Optionally, you can show a user-friendly message here,
        // e.g., using a toast notification or updating a state variable.
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <header className="flex items-center justify-between gap-[30px]">
        <div>
          <h1 className="font-extrabold text-[28px] leading-[42px]">
            Add Student
          </h1>
          <p className="text-[#838C9D] mt-[1]">
            Create new future htmlFor company
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="#"
            className="w-fit rounded-full border border-[#060A23] p-[14px_20px] font-semibold text-nowrap"
          >
            Import from BWA
          </Link>
        </div>
      </header>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-[550px] rounded-[30px] p-[30px] gap-[30px] bg-[#F8FAFB]"
      >
        <div className="flex flex-col gap-[10px]">
          <label htmlFor="category" className="font-semibold">
            Select Category
          </label>
          <div className="flex items-center w-full rounded-full border border-[#CFDBEF] gap-3 px-5 transition-all duration-300 focus-within:ring-2 focus-within:ring-[#662FFF]">
            <img
              src="/assets/images/icons/bill-black.svg"
              className="w-6 h-6"
              alt="icon"
            />
            <select
              {...register("studentId")}
              id="studentId"
              className="appearance-none outline-none w-full py-3 px-2 -mx-2 font-semibold placeholder:font-normal placeholder:text-[#838C9D] !bg-transparent"
            >
              <option value="" hidden>
                Choose one student
              </option>
              {data?.students.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
            <img
              src="/assets/images/icons/arrow-down.svg"
              className="w-6 h-6"
              alt="icon"
            />
          </div>
          <span className="error-message text-[#FF435A]">
            {errors?.studentOd?.message}
          </span>
        </div>
        <div className="flex items-center gap-[14px]">
          <button
            type="button"
            className="w-full rounded-full border border-[#060A23] p-[14px_20px] font-semibold text-nowrap"
          >
            Save as Draft
          </button>
          <button
            disabled={isLoading}
            type="submit"
            className="w-full rounded-full p-[14px_20px] font-semibold text-[#FFFFFF] bg-[#662FFF] text-nowrap"
          >
            Add Now
          </button>
        </div>
      </form>
    </>
  );
}
