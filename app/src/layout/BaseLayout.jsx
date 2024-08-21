import React from "react";

const BaseLayout = ({ children }) => {
  return <div className="h-screen w-screen overflow-hidden">{children}</div>;
};

export default BaseLayout;
