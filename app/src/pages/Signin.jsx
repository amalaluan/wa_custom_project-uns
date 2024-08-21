import React from "react";
import BaseLayout from "../layout/BaseLayout";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import logo from "@/assets/rsu-logo.png";
import { Button } from "@/components/ui/button";
import useAuthHook from "@/hooks/useAuthHook";

const Signin = () => {
  const { handleChange, handleSubmit, signinFields } = useAuthHook();

  return (
    <BaseLayout>
      <div className="flex flex-col justify-center h-screen px-8 m-auto text-center w-100 lg:w-1/3 md:w-2/4 lg:px-12 sm:px-0 sm:w-2/3">
        <img src={logo} className="h-[100px] mb-2 mx-auto w-[100px]" alt="" />
        <p className="mb-1 text-3xl">Hola Admin!</p>
        <p className="text-sm text-gray-500">Sign in to continue</p>

        <form
          className="flex flex-col justify-center gap-2 my-12"
          action="POST"
          onSubmit={handleSubmit}
        >
          {signinFields.map((item, index) => {
            return (
              <Input
                key={index}
                className="focus-visible:ring-transparent"
                placeholder={item.placeholder}
                type={item.type}
                autoComplete={item.autoComplete}
                onChange={(e) => handleChange(e, item.name)}
              />
            );
          })}

          <a
            href=""
            className="text-sm text-right text-[#3d9f7f] font-medium hover:underline"
          >
            Forgotten password?
          </a>

          <Button className="mt-6 hover:bg-[#2c745c] bg-[#3d9f7f]">
            Sign in
          </Button>
        </form>

        <p className="text-sm text-center text-gray-500">
          Not yet a member?{" "}
          <Link
            to="/signup"
            className="text-[#3d9f7f] font-medium hover:underline"
          >
            Create Account
          </Link>
        </p>
      </div>
    </BaseLayout>
  );
};

export default Signin;
