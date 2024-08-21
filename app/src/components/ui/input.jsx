import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "./button";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  const [showP, setShowP] = React.useState(false);

  const handleShowPassword = (e) => {
    e.preventDefault();
    setShowP((prev) => !prev);
  };

  return (
    <div className="relative">
      <input
        type={type != "password" ? type : showP ? "text" : "password"}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
      {type == "password" && (
        <Button
          variant="ghost"
          size="icon"
          type="button"
          className="absolute inset-y-0 right-0"
          onClick={handleShowPassword}
        >
          {showP ? (
            <EyeOpenIcon className="w-4 h-4" />
          ) : (
            <EyeClosedIcon className="w-4 h-4" />
          )}
        </Button>
      )}
    </div>
  );
});
Input.displayName = "Input";

export { Input };
