import React from "react";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { postSignUp } from "../../services/authService";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";

export default function Pricing({ data, onChangeMode }) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: () => postSignUp(data),
  });

  const submitData = async () => {
    try {
      if (!data) {
        return;
      }
      const response = await mutateAsync();
      window.location.replace(response.data.midtrans_payment_url);
    } catch (error) {
      console.log(error);
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
  return (
    <div className="relative flex flex-col flex-1 min-h-screen bg-gradient-to-br from-[#10131a] via-[#303b9c] to-[#110225]">
      <nav className="flex items-center justify-between p-[30px]">
        <Navbar />
        <div className="flex items-center gap-3">
          <Link to="/manager/sign-in">
            <div
              className={`flex items-center gap-3 w-fit rounded-full border p-[10px_20px] transition-all duration-300 hover:bg-[#420ecf] hover:border-[#8661EE] hover:shadow-[-10px_-6px_10px_0_#7F33FF_inset] ${
                location.pathname.includes("/sign-in")
                  ? "bg-[#420ecf] shadow-[-10px_-6px_10px_0_#7F33FF_inset]"
                  : "bg-[#070B24] border-[#24283E] shadow-[-10px_-6px_10px_0_#181A35_inset]"
              }`}
            >
              <span className="font-semibold text-white">My Dashboard</span>
            </div>
          </Link>
          <button
            type="button"
            onClick={() => onChangeMode && onChangeMode("AUTH")}
            className={`flex items-center gap-3 w-fit rounded-full border p-[10px_20px] transition-all duration-300 hover:bg-[#420ecf] hover:border-[#8661EE] hover:shadow-[-10px_-6px_10px_0_#7F33FF_inset] ${
              location.pathname.includes("/sign-up")
                ? "bg-[#420ecf] hover:bg-indigo-600 border-[#8661EE] shadow-[-10px_-6px_10px_0_#7F33FF_inset]"
                : "bg-[#070B24] border-[#24283E] shadow-[-10px_-6px_10px_0_#181A35_inset]"
            }`}
          >
            <span className="font-semibold text-white">Sign Up</span>
          </button>
        </div>
      </nav>
      <header className="flex flex-col items-center gap-5 text-center mt-[50px]">
        <h1 className="font-extrabold text-[46px] leading-[69px] text-white">
          Best Pricing For Everyone
          <br />
          Who Wants to Grow Business
        </h1>
        <p className="text-lg leading-[27px] text-white">
          We delivery robust features to anyone unconditionally.
        </p>
      </header>
      <div className="grid gap-8 max-w-full mx-auto mt-16 pb-4">
        <Card className="flex flex-col rounded-2xl bg-black/20 border border-white/20 backdrop-blur-lg shadow-xl dark:bg-black/40 p-8 gap-8 ">
          {/* Header */}
          <CardHeader className="space-y-4">
            <img
              src="/assets/images/icons/note-favorite-white.svg"
              className="w-14 h-14"
              alt="icon"
            />
            <div>
              <CardTitle className="text-4xl font-extrabold text-white">
                Rp 280.000
              </CardTitle>
              <CardDescription className="text-gray-400 mt-2">
                Billed every single month
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="flex flex-col gap-5">
            {[
              "Access gigantic features company",
              "Students analytics and export",
              "Life support 24/7 maintenances",
              "Export and analyze data real time",
              "More big features coming soon",
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <img
                  src="/assets/images/icons/tick-circle-white.svg"
                  className="w-6 h-6 shrink-0"
                  alt="tick"
                />
                <p className="font-semibold text-white">{feature}</p>
              </div>
            ))}
          </CardContent>

          {/* Footer with buttons */}
          <CardFooter className="flex flex-col gap-3">
            <Button
              type="button"
              onClick={submitData}
              disabled={isPending}
              className="w-full rounded-full bg-[#662FFF] border border-[#8661EE] shadow-[-10px_-6px_10px_0_#7F33FF_inset] hover:bg-[#5620d1]"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                "Choose This Plan"
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
