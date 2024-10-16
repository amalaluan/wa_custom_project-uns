import { useToast } from "@/components/ui/use-toast";
import React from "react";

const useToastHook = () => {
  const { toast } = useToast();

  const showToast = (variant, title, description, duration) => {
    toast({
      variant,
      title,
      description,
      duration: parseInt(duration),
    });
  };

  return { showToast };
};

export default useToastHook;
