import { useAuth } from "@/context/AuthContext";
import {
  changePassword,
  updateData,
  uploadFile,
} from "@/utils/firebase.helper";
import React, { useEffect, useReducer, useState } from "react";
import useToastHook from "./useToastHook";
import { useNavigate } from "react-router-dom";

const reducer = (state, action) => {
  switch (action.type) {
    case "init-values": {
      return {
        ...state,
        ...action.payload,
      };
    }

    case "change-value": {
      if (action?.key == "contact_number") {
        if (action.data[action.key].length <= 11) {
          return { ...state, ...action.data };
        } else {
          return { ...state };
        }
      } else if (action?.key == "landline_number") {
        if (action.data[action.key].length <= 10) {
          return { ...state, ...action.data };
        } else {
          return { ...state };
        }
      } else {
        return { ...state, ...action.data };
      }
    }
  }
};

const useProfileHook = () => {
  const { userData, setUserData, currentUser, setAuthLoading } = useAuth();
  const { showToast } = useToastHook();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [details, setDetails] = useState();

  const [state, dispatch] = useReducer(reducer, {
    email: "",
    username: "",
    name: "",
    address: "",
    contact_number: "",
    landline_number: "",
    profile: null,
    old_password: "",
    new_password: "",
    confirm_pass: "",
    profileUrl:
      "https://i.pinimg.com/170x/17/57/1c/17571cdf635b8156272109eaa9cb5900.jpg",
  });

  const infoFields = [
    {
      label: "Email",
      placeholder: "aedrian.ben@gmail.com",
      type: "text",
      name: "email",
      id: "email",
      autoComplete: "off",
      value: state.email,
      disabled: true,
    },
    {
      label: "Username",
      placeholder: "e.g. abr_",
      type: "text",
      name: "username",
      id: "username",
      autoComplete: "off",
      value: state.username,
      disabled: false,
    },
    {
      label: "Full name",
      placeholder: "e.g. Aedrian Benito Romulo",
      type: "text",
      name: "name",
      id: "name",
      autoComplete: "off",
      value: state.name,
      disabled: false,
    },
    {
      label: "Address",
      placeholder: "e.g. Romblon",
      type: "text",
      name: "address",
      id: "address",
      autoComplete: "off",
      value: state.address,
      disabled: false,
    },
    {
      label: "Contact Number",
      placeholder: "e.g. 09xx xxx xxxx",
      type: "number",
      name: "contact_number",
      id: "contact_number",
      autoComplete: "off",
      value: state.contact_number,
      disabled: false,
    },
    {
      label: "Landline Number",
      placeholder: "e.g. 042 xxx xxxx",
      type: "number",
      name: "landline_number",
      id: "landline_number",
      autoComplete: "off",
      value: state.landline_number,
      disabled: false,
    },
  ];

  const passFields = [
    {
      label: "Old Password",
      placeholder: "Type here your old password",
      type: "password",
      name: "old_password",
      id: "old_password",
      autoComplete: "off",
      value: state.old_password,
      disabled: false,
    },
    {
      label: "New Password",
      placeholder: "Type here your new password",
      type: "password",
      name: "new_password",
      id: "new_password",
      autoComplete: "off",
      value: state.new_password,
      disabled: false,
    },
    {
      label: "Repeat your new password",
      placeholder: "Retype here your new password",
      type: "password",
      name: "confirm_pass",
      id: "confirm_pass",
      autoComplete: "off",
      value: state.confirm_pass,
      disabled: false,
    },
  ];

  useEffect(() => {
    setAuthLoading(true);

    if (userData && currentUser) {
      dispatch({
        type: "init-values",
        payload: {
          ...userData,
          profileUrl: currentUser.photoURL || state.profileUrl,
        },
      });

      setAuthLoading(false);
    } else {
      setAuthLoading(false);
    }
  }, [userData]);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      dispatch({
        type: "change-value",
        data: {
          profileUrl: URL.createObjectURL(e.target.files[0]),
          profile: e.target.files[0],
        },
      });
    }
  };

  const handleChange = (e, name) => {
    const { value } = e.target;
    dispatch({ type: "change-value", data: { [name]: value }, key: name });
  };

  const handleUpdateProfile = async () => {
    const stamp = new Date().valueOf();

    try {
      const res = await uploadFile(
        currentUser,
        state.profile,
        "display_photo",
        setAuthLoading
      );

      navigate(`?uploaded=${stamp}`, { replace: false });
      sessionStorage.setItem("profile", res);
    } catch (e) {
      console.log(e);
    }
  };

  const handleUpdateInfo = async () => {
    if (
      state.contact_number.length != "" &&
      state.contact_number.length != 11
    ) {
      // showToast(
      //   "destructive",
      //   "Attempt Unsuccessful",
      //   `Message: Contact Number is invalid. Please double check.`,
      //   3000
      // );
      setIsOpen(true);
      setDetails({
        isError: true,
        title: "Attempt Unsuccessful",
        description: `Message: Contact Number is invalid. Please double check.`,
      });
      return;
    }

    if (
      state.landline_number.length != "" &&
      state.landline_number.length != 10
    ) {
      // showToast(
      //   "destructive",
      //   "Attempt Unsuccessful",
      //   `Message: Landline Number is invalid. Please double check.`,
      //   3000
      // );
      setIsOpen(true);
      setDetails({
        isError: true,
        title: "Attempt Unsuccessful",
        description: `Message: Landline Number is invalid. Please double check.`,
      });
      return;
    }

    const payload = {
      address: state.address,
      contact_number: state.contact_number,
      name: state.name,
      username: state.username,
      landline_number: state.landline_number,
    };

    const updateUserData = {
      address: state.address,
      contact_number: state.contact_number,
      email: state.email,
      name: state.name,
      role: state.role,
      username: state.username,
      landline_number: state.landline_number,
    };

    const response = await updateData(
      "users",
      currentUser.uid,
      payload,
      setAuthLoading
    );

    if (response.response) {
      // showToast(
      //   "success",
      //   "Successful.",
      //   `Message: User's profile was updated successfully.`,
      //   3000
      // );
      setIsOpen(true);
      setDetails({
        isError: false,
        title: "Successful",
        description: `Message: User's profile was updated successfully.`,
      });
    } else {
      // showToast(
      //   "destructive",
      //   "Attempt Unsuccessful",
      //   `Message: Error updating the record. Please try again.`,
      //   3000
      // );
      setIsOpen(true);
      setDetails({
        isError: true,
        title: "Attempt Unsuccessful",
        description: `Message: Error updating the record. Please try again.`,
      });
    }

    setUserData(updateUserData);
  };

  const handleUpdatePass = async () => {
    if (state.new_password != state.confirm_pass) {
      // showToast(
      //   "destructive",
      //   "Attempt Unsuccessful",
      //   `Message: Your new password must matched. Please check what you typed.`,
      //   3000
      // );
      setIsOpen(true);
      setDetails({
        isError: true,
        title: "Attempt Unsuccessful",
        description: `Message: Your new password must matched. Please check what you typed.`,
      });
      return;
    }
    if (!state.new_password || !state.confirm_pass || !state.old_password) {
      // showToast(
      //   "destructive",
      //   "Attempt Unsuccessful",
      //   `Message: Old, New, and Repeat is required. Please fill it up.`,
      //   3000
      // );
      setIsOpen(true);
      setDetails({
        isError: true,
        title: "Attempt Unsuccessful",
        description: `Message: Old, New, and Repeat is required. Please fill it up.`,
      });
      return;
    }

    try {
      const response = await changePassword(
        state.old_password,
        state.new_password,
        setAuthLoading
      );

      if (response?.success) {
        dispatch({
          type: "change-value",
          data: {
            old_password: "",
            new_password: "",
            confirm_pass: "",
          },
        });

        // showToast(
        //   "success",
        //   "Successful.",
        //   `Message: Password was changed successfully.`,
        //   3000
        // );
        setIsOpen(true);
        setDetails({
          isError: false,
          title: "Successful",
          description: `Message: Password was changed successfully.`,
        });
      } else {
        // showToast(
        //   "destructive",
        //   "Attempt Unsuccessful",
        //   `Message: Error updating password. Please check what you typed.`,
        //   3000
        // );
        setIsOpen(true);
        setDetails({
          isError: true,
          title: "Attempt Unsuccessful",
          description: `Message: Error updating password. Please check what you typed.`,
        });
      }
    } catch (e) {
      // showToast(
      //   "destructive",
      //   "Attempt Unsuccessful",
      //   `Message: Error encountered. Try refreshing and try again.`,
      //   3000
      // );
      setIsOpen(true);
      setDetails({
        isError: true,
        title: "Attempt Unsuccessful",
        description: `Message: Error encountered. Try refreshing and try again.`,
      });
    }
  };

  return {
    state,
    handleFileChange,
    handleUpdateProfile,
    handleChange,
    infoFields,
    passFields,
    handleUpdateInfo,
    handleUpdatePass,
    isOpen,
    setIsOpen,
    details,
  };
};

export default useProfileHook;
