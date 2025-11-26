import React, { useState } from "react";
import { postForgotPassword } from "../../services/authService";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPassSchema } from "../../utils/zodSchema";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import Navbar from "../../components/Navbar";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
import { Loader2 } from "lucide-react";

function ForgotPasswordPage({ type = "manager" }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPassSchema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data) => postForgotPassword(data),
  });

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      if (!data) {
        return;
      }
      const response = await mutateAsync(data);
      toast.success("Email has been sent! Please check your email.", {
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
      if (type === "manager") {
        navigate("/manager/sign-in");
      } else if (type === "student") {
        navigate("/student/sign-in");
      }
    } catch (error) {
      const errMsg = error.response.data.message;
      toast.error(errMsg, {
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
  return (
    <div className="relative flex flex-col flex-1 h-screen">
      <div className="fixed w-full h-full gradient-background -z-10"></div>
      <nav className="flex items-center justify-between p-[30px]">
        <Navbar />
        <div className="flex items-center gap-3">
          <Link
            to={type === "manager" ? "/manager/sign-in" : "/student/sign-in"}
          >
            <div
              className={`flex items-center gap-3 w-fit rounded-full border p-[10px_20px] transition-all duration-300 hover:bg-[#420ecf] hover:border-[#8661EE] hover:shadow-[-10px_-6px_10px_0_#7F33FF_inset] ${
                location.pathname.includes("/sign-in")
                  ? "bg-[#420ecf] shadow-[-10px_-6px_10px_0_#7F33FF_inset]"
                  : "bg-[#070B24] border-[#24283E] shadow-[-10px_-6px_10px_0_#181A35_inset]"
              }`}
            >
              <span className="font-semibold text-white">Sign In</span>
            </div>
          </Link>
        </div>
      </nav>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-[500px] h-fit rounded-[20px] p-[30px] gap-[30px]  m-auto"
      >
        <Card className="relative z-10 w-auto rounded-2xl  bg-white/10 border border-white/20 backdrop-blur-lg shadow-xl dark:bg-black/40 ">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white">
              Forgot Password
            </CardTitle>
            <CardDescription className="text-gray-400">
              Reset your password
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
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Button
              disabled={isPending}
              type="submit"
              className="w-full bg-blue-500 hover:bg-indigo-600 text-white font-semibold rounded-full flex items-center justify-center gap-2"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                "Send Reset Password Link"
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}

export default ForgotPasswordPage;
