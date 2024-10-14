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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteData } from "@/utils/f.realtime.helper";
import { deleteDocument } from "@/utils/firebase.helper";
import React, { useState } from "react";

const BD_DangerZone = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = () => {
    const rd_id = (parseInt(id) - 1).toString();
    try {
      console.log("hello");
      deleteDocument("buildings_data", id);
      deleteData(`json_files/building/features/${rd_id}`);
    } catch (e) {
      console.log("hi");
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="mt-4">
          Delete Building
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button onClick={handleDelete}>Continue</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default BD_DangerZone;
