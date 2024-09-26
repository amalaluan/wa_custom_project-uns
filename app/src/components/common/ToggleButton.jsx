import React from "react";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";

const ToggleButton = ({ name, id, defaultValue, handleChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="airplane-mode"
        checked={defaultValue}
        onClick={() => handleChange(id)}
      />
      <Label htmlFor="airplane-mode" className="text-sm font-normal">
        {name}
      </Label>
    </div>
  );
};

export default ToggleButton;
