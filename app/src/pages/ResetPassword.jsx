import React, { useState } from "react";
import BaseLayout from "../layout/BaseLayout";
import logo from "@/assets/rsu-logo.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { resetPassword } from "@/utils/authentication";
import { useToast } from "@/components/ui/use-toast";

const ResetPassword = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState(null);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const showToast = (variant, title, description, duration) => {
    toast({ variant, title, description, duration: parseInt(duration) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await resetPassword(email);

    if (result?.status) {
      showToast("success", "Password reset email sent.", result?.message, 3000);
    } else {
      showToast(
        "destructive",
        "Attempt Unsuccessful",
        `${result?.message}.`,
        3000
      );
    }
  };

  return (
    <BaseLayout>
      <div className="flex flex-col justify-center h-screen px-8 m-auto text-center w-100 lg:px-12 lg:w-1/3 md:w-2/4 sm:px-0 sm:w-2/3">
        <img src={logo} className="h-[100px] mb-2 mx-auto w-[100px]" alt="" />
        <p className="mb-1 text-3xl">Reset your password</p>
        <p className="text-sm text-gray-500">
          Let us know your email so we can send the instructions.
        </p>

        <form
          className="flex flex-col justify-center gap-2 my-12"
          action=""
          onSubmit={handleSubmit}
        >
          <Input
            className="focus-visible:ring-transparent"
            placeholder={"Registered Email"}
            type={"email"}
            autoComplete={"off"}
            onChange={handleChange}
          />

          <Button
            className="mt-6 hover:bg-[#2c745c] bg-[#3d9f7f]"
            disabled={!email}
          >
            Create an account
          </Button>
        </form>

        <p className="text-sm text-center text-gray-500">
          Already have an account?{" "}
          <Link to="/" className="text-[#3d9f7f] font-medium hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </BaseLayout>
  );
};

export default ResetPassword;
