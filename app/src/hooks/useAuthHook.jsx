import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import { signIn, signOutUser, signUp } from "@/utils/authentication";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const useAuthHook = () => {
  const { toast } = useToast();
  const { pathname } = useLocation();
  const { authLoading, setAuthLoading } = useAuth();

  const signupFields = [
    { placeholder: "Email", type: "email", name: "email", autoComplete: "off" },
    {
      placeholder: "Full name",
      type: "text",
      name: "fullname",
      autoComplete: "off",
    },
    {
      placeholder: "Password",
      type: "password",
      name: "password",
      autoComplete: "new-password",
    },
    {
      placeholder: "Re-type your password here",
      type: "password",
      name: "confpass",
      autoComplete: "new-password",
    },
  ];

  const signinFields = [
    { placeholder: "Email", type: "email", name: "email", autoComplete: "off" },
    {
      placeholder: "Password",
      type: "password",
      name: "password",
      autoComplete: "new-password",
    },
  ];

  const [payload, setPayload] = useState(
    pathname === "/signup"
      ? { email: "", fullname: "", password: "", confpass: "", agree: false }
      : { email: "", password: "" }
  );

  const showToast = (variant, title, description, duration) => {
    toast({ variant, title, description, duration: parseInt(duration) });
  };

  const handleChange = (e, name) => {
    const { value } = e.target;
    setPayload((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let errors = [];

    if (pathname === "/signup") {
      const { email, fullname, password, confpass } = payload;
      if (!email) errors.push("Email");
      if (!fullname) errors.push("Full name");
      if (!password) errors.push("Password");
      if (!confpass) errors.push("Password confirmation");
      if (password !== confpass) errors.push("Passwords do not match");
    } else {
      const { email, password } = payload;
      if (!email) errors.push("Email");
      if (!password) errors.push("Password");
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    const errors = validateForm();

    if (errors.length > 0) {
      setAuthLoading(false);
      showToast(
        "destructive",
        "Attempt Unsuccessful",
        `${errors.join(", ")} ${errors.length > 1 ? "are" : "is"} missing.`,
        3000
      );
    } else {
      try {
        let response;

        if (pathname == "/signup") {
          response = await signUp(
            payload.email,
            payload.password,
            payload.fullname
          );
        } else {
          response = await signIn(payload.email, payload.password);
        }

        setAuthLoading(false);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleLogout = async (e) => {
    setAuthLoading(true);

    setTimeout(() => {
      try {
        signOutUser();
        setAuthLoading(false);
      } catch (e) {
        setAuthLoading(false);
        console.log(e);
      }
    }, 3000);
  };

  return {
    handleChange,
    handleSubmit,
    setPayload,
    payload,
    signupFields,
    signinFields,
    handleLogout,
  };
};

export default useAuthHook;
