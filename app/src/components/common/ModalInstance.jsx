import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import React from "react";

const ModalInstance = ({ details, isOpen, setIsOpen }) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent
        className={`border-none ${
          details?.isError ? "bg-[#EF4444]" : "bg-[#008517]"
        }`}
      >
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl text-white">
            {details?.title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-white">
            {details?.description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Okay</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModalInstance;
