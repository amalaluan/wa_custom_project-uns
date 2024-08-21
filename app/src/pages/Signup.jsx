import React from "react";
import BaseLayout from "../layout/BaseLayout";
import logo from "@/assets/rsu-logo.png";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useAuthHook from "@/hooks/useAuthHook";

const Signup = () => {
  const { handleChange, handleSubmit, setPayload, signupFields, payload } =
    useAuthHook();

  return (
    <BaseLayout>
      <div className="flex flex-col justify-center h-screen px-8 m-auto text-center w-100 lg:px-12 lg:w-1/3 md:w-2/4 sm:px-0 sm:w-2/3">
        <img src={logo} className="h-[100px] mb-2 mx-auto w-[100px]" alt="" />
        <p className="mb-1 text-3xl">Hola Admin!</p>
        <p className="text-sm text-gray-500">
          Fill up the following to create an account.
        </p>

        <form
          className="flex flex-col justify-center gap-2 my-12"
          action=""
          onSubmit={handleSubmit}
        >
          {signupFields.map((item, index) => {
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

          <div className="flex items-center mt-4 mb-4 space-x-2 text-left">
            <Checkbox
              id="terms"
              className=""
              onClick={() => {
                setPayload((prev) => ({
                  ...prev,
                  agree: !prev["agree"],
                }));
              }}
            />
            <label
              htmlFor="terms"
              className="text-xs leading-none text-gray-500 select-none"
            >
              I agree to the{" "}
              <a href="" className="text-[#3d9f7f] font-medium hover:underline">
                Terms and conditions
              </a>{" "}
              and{" "}
              <a href="" className="text-[#3d9f7f] font-medium hover:underline">
                Privacy policy.
              </a>
            </label>
          </div>

          <Button
            className="mt-6 hover:bg-[#2c745c] bg-[#3d9f7f]"
            disabled={!payload.agree}
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

export default Signup;
