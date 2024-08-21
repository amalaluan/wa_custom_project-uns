// src/components/LoadingScreen.jsx
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { ReloadIcon } from "@radix-ui/react-icons";

const LoadingScreen = () => {
  const { authLoading } = useAuth();

  if (!authLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-screen h-screen bg-black bg-opacity-75">
      <ReloadIcon className="w-6 h-6 text-white animate-spin" />
    </div>
  );
};

export default LoadingScreen;
