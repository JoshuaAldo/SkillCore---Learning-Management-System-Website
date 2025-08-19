import React from "react";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";

export default function SuccessCheckoutPage() {
  return (
    <div className="relative flex flex-col flex-1 h-screen my-auto">
      <div className="fixed w-full h-full bg-[#060A23] -z-10">
        <img
          src="assets/images/backgrounds/background-glow.png"
          class="absolute bottom-0 transform -translate-x-1/2 left-1/2"
          alt=""
        />
      </div>
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
      <div className="my-[300px]">
        <h1 class="font-extrabold text-[46px] leading-[69px] text-white text-center m-auto">
          Success Checkout <br />
          Please Login to Continue
        </h1>
        <Link to="/manager/sign-in">
          <div className="flex items-center justify-center gap-3 w-max mx-auto my-auto rounded-full border p-[20px_50px] mt-5 transition-all duration-300 hover:bg-[#662FFF] hover:border-[#8661EE] hover:shadow-[-10px_-6px_10px_0_#7F33FF_inset] bg-[#662FFF] border-[#8661EE] shadow-[-10px_-6px_10px_0_#7F33FF_inset]">
            <span className="font-semibold text-white">Sign In Now</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
