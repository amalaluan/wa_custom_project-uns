import { useAuth } from "@/context/AuthContext";
import {
  changePassword,
  updateData,
  uploadFile,
} from "@/utils/firebase.helper";
import React, { useEffect, useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "init-values": {
      return {
        ...state,
        ...action.payload,
      };
    }

    case "change-value": {
      return { ...state, ...action.data };
    }
  }
};

const useProfileHook = () => {
  const { userData, currentUser, setAuthLoading } = useAuth();

  const [state, dispatch] = useReducer(reducer, {
    email: "",
    username: "",
    name: "",
    address: "",
    contact_number: "",
    profile: null,
    old_password: "",
    new_password: "",
    confirm_pass: "",
    profileUrl:
      "https://i.pinimg.com/170x/17/57/1c/17571cdf635b8156272109eaa9cb5900.jpg",
  });

  const infoFields = [
    {
      placeholder: "Email",
      type: "text",
      name: "email",
      id: "email",
      autoComplete: "off",
      value: state.email,
      disabled: true,
    },
    {
      placeholder: "Username",
      type: "text",
      name: "username",
      id: "username",
      autoComplete: "off",
      value: state.username,
      disabled: false,
    },
    {
      placeholder: "Full name",
      type: "text",
      name: "name",
      id: "name",
      autoComplete: "off",
      value: state.name,
      disabled: false,
    },
    {
      placeholder: "Address",
      type: "text",
      name: "address",
      id: "address",
      autoComplete: "off",
      value: state.address,
      disabled: false,
    },
    {
      placeholder: "Contact Number",
      type: "text",
      name: "contact_number",
      id: "contact_number",
      autoComplete: "off",
      value: state.contact_number,
      disabled: false,
    },
  ];

  const passFields = [
    {
      placeholder: "Old Password",
      type: "password",
      name: "old_password",
      id: "old_password",
      autoComplete: "off",
      value: state.old_password,
      disabled: false,
    },
    {
      placeholder: "New Password",
      type: "password",
      name: "new_password",
      id: "new_password",
      autoComplete: "off",
      value: state.new_password,
      disabled: false,
    },
    {
      placeholder: "Repeat your new password",
      type: "password",
      name: "confirm_pass",
      id: "confirm_pass",
      autoComplete: "off",
      value: state.confirm_pass,
      disabled: false,
    },
  ];

  console.log(state);

  useEffect(() => {
    setAuthLoading(true);

    if (userData && currentUser) {
      delete userData.status;
      dispatch({
        type: "init-values",
        payload: {
          ...userData,
          profileUrl: currentUser.photoURL || state.profileUrl,
        },
      });

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
    dispatch({ type: "change-value", data: { [name]: value } });
  };

  const handleUpdateProfile = () => {
    uploadFile(currentUser, state.profile, "display_photo", setAuthLoading);
  };

  const handleUpdateInfo = () => {
    const payload = {
      address: state.address,
      contact_number: state.contact_number,
      name: state.name,
      username: state.username,
    };

    updateData("users", currentUser.uid, payload, setAuthLoading);
  };

  const handleUpdatePass = () => {
    if (state.new_password != state.confirm_pass) return;
    if (!state.new_password || !state.confirm_pass) return;

    changePassword(state.old_password, state.new_password, setAuthLoading);
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
  };
};

export default useProfileHook;
