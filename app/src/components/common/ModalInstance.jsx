import { AlertDialog } from "../ui/alert-dialog";
import React from "react";

const ModalInstance = ({ children, label }) => {
  return <AlertDialog>{children}</AlertDialog>;
};

export default ModalInstance;
