import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { Link, useLocation } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "../../utils/zodSchema";
import { useForm } from "react-hook-form";
import Pricing from "./Pricing";
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

export default function SignUpPage() {
  const [dataSignUp, setDataSignUp] = useState(null);
  const [mode, setMode] = useState("AUTH");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
    setDataSignUp(data);
    setMode("PRICING");
  };
  const location = useLocation();
  return (
    <>
      {mode === "AUTH" ? (
        <div className="relative flex flex-col min-h-screen overflow-hidden bg-gradient-to-br from-[#10131a] via-[#303b9c] to-[#110225]">
          <div className="absolute -top-40 -left-40 h-96 w-96 bg-indigo-800/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 h-[500px] w-[500px] bg-violet-950-500/30 rounded-full blur-3xl pointer-events-none" />
          <div className="fixed w-full h-full bg-[#060A23] -z-10">
            <img
              src="/assets/images/backgrounds/background-glow.png"
              className="absolute bottom-0 transform -translate-x-1/2 left-1/2"
              alt=""
            />
          </div>
          <nav className="flex items-center justify-between p-[30px]">
            <Navbar />
            <div className="flex items-center gap-3">
              <Link to="/manager/sign-in">
                <div
                  className={`flex items-center gap-3 w-fit rounded-full border p-[10px_20px] transition-all duration-300 hover:bg-[#420ecf] hover:border-[#8661EE] hover:shadow-[-10px_-6px_10px_0_#7F33FF_inset] ${
                    location.pathname.includes("/sign-in")
                      ? "bg-[#420ecf] hover:bg-indigo-600 border-[#8661EE] shadow-[-10px_-6px_10px_0_#7F33FF_inset]"
                      : "bg-[#070B24] border-[#24283E] shadow-[-10px_-6px_10px_0_#181A35_inset]"
                  }`}
                >
                  <span className="font-semibold text-white">My Dashboard</span>
                </div>
              </Link>
              <Link to="#">
                <div
                  className={`flex items-center gap-3 w-fit rounded-full border p-[10px_20px] transition-all duration-300 hover:bg-[#420ecf] hover:border-[#8661EE] hover:shadow-[-10px_-6px_10px_0_#7F33FF_inset] ${
                    location.pathname.includes("/sign-up")
                      ? "bg-[#420ecf]  shadow-[-10px_-6px_10px_0_#7F33FF_inset]"
                      : "bg-[#070B24] border-[#24283E] shadow-[-10px_-6px_10px_0_#181A35_inset]"
                  }`}
                >
                  <span className="font-semibold text-white">Sign Up</span>
                </div>
              </Link>
            </div>
          </nav>
          <div className="flex items-center justify-center gap-[109px] my-auto">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col w-[400px] h-fit rounded-[20px]"
            >
              <Card className="relative z-10 w-auto rounded-2xl  bg-white/10 border border-white/20 backdrop-blur-lg shadow-xl dark:bg-black/40 ">
                <CardHeader>
                  <CardTitle className="text-[26px] leading-[39px] font-bold text-white">
                    Sign Up
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Manage your employees easily
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">
                      Name
                    </Label>
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      placeholder="Write your complete name"
                      {...register("name")}
                    />
                    {errors.name?.message && (
                      <p className="text-red-500 text-xs mt-[-20px] text-center">
                        {errors.name?.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-white">
                      Email
                    </Label>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Type your secure password"
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      {...register("email")}
                    />
                    {errors.email?.message && (
                      <p className="text-red-500 text-xs mt-[10px] text-center">
                        {errors.email?.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-white">
                      Password
                    </Label>
                    <Input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Type your secure password"
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      {...register("password")}
                    />
                    {errors.password?.message && (
                      <p className="text-red-500 text-xs mt-[10px] text-center">
                        {errors.password?.message}
                      </p>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-3">
                  <Button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-indigo-600 text-white font-semibold rounded-full"
                  >
                    Sign Up Now
                  </Button>
                </CardFooter>
              </Card>
            </form>
            <div className="flex flex-col gap-[30px]">
              <h1 className="font-extrabold text-[46px] leading-[69px] text-white">
                Sign Up & Enhance <br />
                Employees Skills
              </h1>
              <p className="text-lg leading-[32px] text-white">
                We delivery robust features to anyone <br />
                unconditionally so they can grow bigger.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <Pricing data={dataSignUp} onChangeMode={setMode} />
      )}
    </>
  );
}
