import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
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
import { resetPasswordSchema } from "@/utils/zodSchema";
import { postResetPassword } from "@/services/authService";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ResetPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data) => postResetPassword(data),
  });

  const query = useQuery();
  const token = query.get("token");

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      if (!data) {
        return;
      }
      const response = await mutateAsync(data);
      toast.success("Password reset successful. Please login.", {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      if (response.role === "manager") {
        navigate("/manager/sign-in");
      } else {
        navigate("/student/sign-in");
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
        className: "bg-[#110225]",
      });
    }
  };

  if (!token) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500">Invalid or missing token.</p>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col flex-1 h-screen">
      <div className="fixed w-full h-full bg-gradient-to-br from-[#10131a] via-[#303b9c] to-[#110225] -z-10"></div>
      <nav className="flex items-center justify-between p-[30px]">
        <Navbar />
      </nav>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-[500px] h-fit rounded-[20px] p-[30px] gap-[30px]  m-auto"
      >
        <Card className="relative z-10 w-auto rounded-2xl  bg-white/10 border border-white/20 backdrop-blur-lg shadow-xl dark:bg-black/40 ">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white">
              Reset Password
            </CardTitle>
            <CardDescription className="text-gray-400">
              Enter your new password
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="newPassword" className="text-white">
                New Password
              </Label>
              <Input
                type="password"
                id="newPassword"
                placeholder="New password"
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                {...register("newPassword")}
              />
              {errors.newPassword?.message && (
                <p className="text-red-500 text-xs mt-[-20px] text-center">
                  {errors.newPassword?.message}
                </p>
              )}
            </div>
            <input type="hidden" value={token} {...register("token")} />
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
                "Reset Password"
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}

export default ResetPasswordPage;
