import React from "react";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SuccessCheckoutPage() {
  return (
    <div className="min-h-screen gradient-background flex flex-col">
      <nav class="flex items-center justify-between p-[30px]">
        <Navbar />
        <div class="flex items-center gap-3">
          <Link to="/manager/sign-in">
            <div class="flex items-center gap-3 w-fit rounded-full border p-[14px_20px] transition-all duration-300 hover:bg-[#662FFF] hover:border-[#8661EE] hover:shadow-[-10px_-6px_10px_0_#7F33FF_inset] bg-[#070B24] border-[#24283E] shadow-[-10px_-6px_10px_0_#181A35_inset]">
              <span class="font-semibold text-white">My Dashboard</span>
            </div>
          </Link>
          <Link to="/manager/sign-up">
            <div class="flex items-center gap-3 w-fit rounded-full border p-[14px_20px] transition-all duration-300 hover:bg-[#662FFF] hover:border-[#8661EE] hover:shadow-[-10px_-6px_10px_0_#7F33FF_inset] bg-[#662FFF] border-[#8661EE] shadow-[-10px_-6px_10px_0_#7F33FF_inset]">
              <span class="font-semibold text-white">Sign Up</span>
            </div>
          </Link>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-2xl mx-auto text-center space-y-8 animate-fade-in">
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 gradient-primary rounded-full blur-3xl opacity-50 animate-pulse"></div>
              <div className="relative glass-card rounded-full p-8 border border-white/10">
                <CheckCircle
                  size={80}
                  className="text-primary"
                  strokeWidth={1.5}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="font-extrabold text-5xl md:text-6xl leading-tight text-foreground">
              Success Checkout
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Please Login to Continue
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-white/10 max-w-lg mx-auto">
            <p className="text-muted-foreground leading-relaxed">
              Your purchase was successful! To access your course and start
              learning, please sign in to your account.
            </p>
          </div>

          <div className="pt-4">
            <Link to="/manager/sign-in">
              <Button
                size="lg"
                className="gradient-primary text-white hover:opacity-90 shadow-glow transition-all duration-300 group px-8 py-6 text-lg font-semibold rounded-full"
              >
                Sign In Now
                <ArrowRight
                  size={20}
                  className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
                />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-4xl h-64 gradient-primary opacity-10 blur-[120px] pointer-events-none"></div>
    </div>
  );
}
