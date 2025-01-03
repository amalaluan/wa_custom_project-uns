import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import { signIn, signOutUser, signUp } from "@/utils/authentication";
import { get, getDatabase, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const useAuthHook = () => {
  const { toast } = useToast();
  const { pathname } = useLocation();
  const { authLoading, setAuthLoading } = useAuth();
  const [deniedEmails, setDeniedEmails] = useState([]);
  const [deletedEmails, setDeletedEmails] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [details, setDetails] = useState(false);

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
    // toast({ variant, title, description, duration: parseInt(duration) });
    // setIsOpen(true);
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
      setIsOpen(true);
      setDetails({
        isError: true,
        title: "Attempt Unsuccessful",
        description: `${errors.join(", ")} ${
          errors.length > 1 ? "are" : "is"
        } missing.`,
      });
    } else {
      try {
        let response;

        if (pathname == "/signup") {
          if (
            deniedEmails.includes(payload.email) ||
            deletedEmails.includes(payload.email)
          ) {
            setIsOpen(true);
            setDetails({
              isError: true,
              title: "Login failed",
              description:
                "Account is already taken. Please use another email.",
            });

            setAuthLoading(false);
            return;
          }

          response = await signUp(
            payload.email,
            payload.password,
            payload.fullname
          );
        } else {
          if (
            deniedEmails.includes(payload.email) ||
            deletedEmails.includes(payload.email)
          ) {
            setIsOpen(true);
            setDetails({
              isError: true,
              title: "Login failed",
              description: "Account login credentials is denied.",
            });

            setAuthLoading(false);
            return;
          }

          response = await signIn(payload.email, payload.password);
        }

        if (!response?.status) {
          setIsOpen(true);
          setDetails({
            isError: true,
            title: "Login failed",
            description: response?.message,
          });
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

  useEffect(() => {
    const fetchEmails = async () => {
      const rd_db = getDatabase();

      // Fetch both deleted and denied emails simultaneously
      const [snapshot_del, snapshot_den] = await Promise.all([
        get(ref(rd_db, "deleted_emails")),
        get(ref(rd_db, "denied_emails")),
      ]);

      // Check and log deleted emails
      if (snapshot_del.exists()) {
        const emails_del = Object.values(snapshot_del.val()).map(
          (item) => item.email
        );
        setDeletedEmails(emails_del);
      }

      if (snapshot_den.exists()) {
        const emails_den = Object.values(snapshot_den.val()).map(
          (item) => item.email
        );
        setDeniedEmails(emails_den);
      }
    };

    fetchEmails();
  }, []);

  return {
    handleChange,
    handleSubmit,
    setPayload,
    payload,
    signupFields,
    signinFields,
    handleLogout,
    isOpen,
    setIsOpen,
    details,
  };
};

export default useAuthHook;
