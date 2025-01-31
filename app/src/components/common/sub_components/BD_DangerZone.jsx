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
import useProfileHook from "@/hooks/useProfileHook";
import useToastHook from "@/hooks/useToastHook";
import { deleteData } from "@/utils/f.realtime.helper";
import { deleteDocument } from "@/utils/firebase.helper";
import { getDatabase, push, ref, update } from "firebase/database";
import React, { useState } from "react";
import ModalInstance from "../ModalInstance";

const BD_DangerZone = ({ id, name }) => {
  const { showToast } = useToastHook();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenNew, setIsOpenNew] = useState(false);
  const [details, setDetails] = useState(false);
  const { state: stateProfile } = useProfileHook();

  const handleDelete = async () => {
    const rd_id = (parseInt(id) - 1).toString();
    try {
      await deleteDocument(`buildings_data`, id);
      await deleteData(`json_files/building/features/${rd_id}/properties`);

      const histodb = getDatabase();
      const h_dbref = ref(histodb, "history");
      const hrecord = {
        user: stateProfile?.name ?? stateProfile?.email,
        message: `User: <b><u>${
          stateProfile?.name ?? stateProfile?.email
        }</b></u> has deleted the <b><u>${name} </b></u>building record.`,
        targetOfChange: `Deletion of ${name} building record.`,
        time: new Date().valueOf(),
      };
      await push(h_dbref, hrecord);

      const d_dbref = ref(histodb, `buildings/info/${rd_id}`);
      await update(d_dbref, { name: "deleted_building" });

      setIsOpenNew(true);
      setDetails({
        isError: false,
        title: "Successfully Deleted",
        description: `Message: Building's record was removed successfully.`,
      });

      // showToast(
      //   "success",
      //   "Successfully deleted.",
      //   `Message: Building's record was removed successfully.`,
      //   3000
      // );
      setIsOpen(false);
    } catch (e) {
      // showToast(
      //   "destructive",
      //   "Attempt Unsuccessful",
      //   `Message: Error deleting the record. Please try again.`,
      //   3000
      // );
      setIsOpenNew(true);
      setDetails({
        isError: true,
        title: "Attempt Unsuccessful",
        description: `Message: Error deleting the record. Please try again.`,
      });
    }
  };

  return (
    <>
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
              This action cannot be undone. This will permanently delete
              building's data and remove the data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              className="bg-[#00413d] hover:bg-[#1B3409]"
              onClick={handleDelete}
            >
              Continue
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <ModalInstance
        isOpen={isOpenNew}
        details={details}
        setIsOpen={setIsOpenNew}
      />
    </>
  );
};

export default BD_DangerZone;
