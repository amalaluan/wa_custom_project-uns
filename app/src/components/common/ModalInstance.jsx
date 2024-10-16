import { AlertDialog } from "../ui/alert-dialog";
import React from "react";

const ModalInstance = ({ children, label, isOpen, setIsOpen }) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      {children}
    </AlertDialog>
  );
};

export default ModalInstance;
