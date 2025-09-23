import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "../../utils/zodSchema";
import { useMutation } from "@tanstack/react-query";
import { postSignin } from "../../services/authService";
import secureLocalStorage from "react-secure-storage";
import { STORAGE_KEY } from "../../utils/const";
import { toast } from "react-toastify";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";
import { Label } from "@/components/ui/label.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Eye, EyeOff } from "lucide-react";

function SignInPage({ type = "manager" }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signInSchema),
  });

  const { isLoading, mutateAsync } = useMutation({
    mutationFn: (data) => postSignin(data),
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await mutateAsync(data);

      if (type === "manager") {
        if (response.data.role === "manager") {
          secureLocalStorage.setItem(STORAGE_KEY, response.data);
          navigate("/manager");
        } else {
          toast.error("Manager Account Not Found!", {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
            className: "bg-[#10131a]",
          });
        }
      } else if (type === "student") {
        if (response.data.role === "student") {
          secureLocalStorage.setItem(STORAGE_KEY, response.data);
          navigate("/student");
        } else {
          toast.error("Student Account Not Found!", {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
            className: "bg-[#10131a]",
          });
        }
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        className: "bg-[#10131a]",
      });
    }
  };
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative flex flex-col min-h-screen overflow-hidden bg-gradient-to-br from-[#10131a] via-[#303b9c] to-[#110225]">
      <div className="absolute -top-40 -left-40 h-96 w-96 bg-indigo-800/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 h-[500px] w-[500px] bg-violet-950-500/30 rounded-full blur-3xl pointer-events-none" />
      <nav className="flex items-center justify-between p-[30px]">
        <Navbar />
        <div className="flex items-center gap-3">
          <Link to="#">
            <div
              className={`flex items-center gap-3 w-fit rounded-full border p-[10px_20px] transition-all duration-300 hover:border-[#8661EE] hover:shadow-[-10px_-6px_10px_0_#7F33FF_inset] ${
                location.pathname.includes("/sign-in")
                  ? "bg-[#420ecf] hover:bg-indigo-600 border-[#8661EE] shadow-[-10px_-6px_10px_0_#7F33FF_inset]"
                  : "bg-[#070B24] shadow-[-10px_-6px_10px_0_#181A35_inset]"
              }`}
            >
              <span className="font-semibold text-white">My Dashboard</span>
            </div>
          </Link>
          {type === "manager" && (
            <Link
              to="/manager/sign-up"
              className={`flex items-center gap-3 w-fit rounded-full border p-[10px_20px] transition-all duration-300 hover:bg-[#420ecf] hover:border-[#8661EE] hover:shadow-[-10px_-6px_10px_0_#7F33FF_inset] ${
                location.pathname.includes("/sign-up")
                  ? "bg-[#420ecf] shadow-[-10px_-6px_10px_0_#7F33FF_inset]"
                  : "bg-[#070B24]  border-[#24283E] shadow-[-10px_-6px_10px_0_#181A35_inset]"
              }`}
            >
              <span className="font-semibold text-white">Sign Up</span>
            </Link>
          )}
        </div>
      </nav>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-[500px] h-fit rounded-[20px] p-[30px] gap-[30px] m-auto"
      >
        <Card className="relative z-10 w-auto rounded-2xl  bg-white/10 border border-white/20 backdrop-blur-lg shadow-xl dark:bg-black/40 ">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white">
              Welcome Back!
            </CardTitle>
            <CardDescription className="text-gray-400">
              Manage your employees easily
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Write your email address"
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                {...register("email")}
              />
              {errors.email?.message && (
                <p className="text-red-500 text-xs mt-[-20px] text-center">
                  {errors.email?.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">
                Password
              </Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Type your secure password"
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  {...register("password")}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:bg-white/0"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </Button>
              </div>
              {errors.password?.message && (
                <p className="text-red-500 text-xs mt-[10px] text-center">
                  {errors.password?.message}
                </p>
              )}
            </div>
            <div className="flex justify-end">
              <Link
                to={
                  type === "manager"
                    ? "/manager/forgot-password"
                    : "/student/forgot-password"
                }
                className="text-sm text-indigo-100 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Button
              disabled={isLoading}
              type="submit"
              className="w-full bg-blue-500 hover:bg-indigo-600 text-white font-semibold rounded-full"
            >
              Sign In {type === "manager" ? "to Manager" : ""}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}

export default SignInPage;
