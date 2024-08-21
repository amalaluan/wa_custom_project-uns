import React from "react";
import ToggleButton from "./ToggleButton";

const Preferences = ({ show, handleSwitchChange }) => {
  return (
    <div className="mt-12">
      <p className="mb-2 text-base font-semibold">Preferences</p>
      <hr className="mb-4" />
      <div className="flex flex-col gap-2">
        <ToggleButton
          name="Show Boundary"
          id="boundary"
          defaultValue={show.boundary}
          handleChange={handleSwitchChange}
        />
        <ToggleButton
          name="Show Buildings"
          id="building"
          defaultValue={show.building}
          handleChange={handleSwitchChange}
        />
        <ToggleButton
          name="Show Paths"
          id="path"
          defaultValue={show.path}
          handleChange={handleSwitchChange}
        />
      </div>
    </div>
  );
};

export default Preferences;
