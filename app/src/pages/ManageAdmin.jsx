import Footer from "@/components/common/Footer";
import Navigation from "@/components/common/Navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { useAuth } from "@/context/AuthContext";
import { db } from "@/utils/firebase.config";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "@radix-ui/react-icons";
import useToastHook from "@/hooks/useToastHook";
import {
  set,
  ref,
  getDatabase,
  push,
  get,
  query as rdQuery,
  orderByChild,
  equalTo,
  remove,
} from "firebase/database";

const ManageAdmin = () => {
  const { userData } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(null);

  const [admin, setAdmin] = useState([]);
  const { showToast } = useToastHook();

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        // Create a query to get documents where "role" is "admin"
        const q = query(collection(db, "users"), where("role", "==", "admin"));
        const querySnapshot = await getDocs(q);

        // Map over query results to get data for each document
        const adminList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const list = adminList.filter((item) => item.status !== "delete");
        setAdmin(list);
      } catch (error) {
        console.error("Error fetching admins: ", error);
      }
    };

    fetchAdmins();
  }, []);

  const handleValueChange = async (value, index, idval, email) => {
    if (value == "delete") {
      setAdmin((prevItems) => {
        const updatedItems = [...prevItems];
        updatedItems.splice(index, 1);
        return updatedItems;
      });
    } else {
      setAdmin((prevItems) => {
        const updatedItems = [...prevItems];
        updatedItems[index]["status"] = value;
        return updatedItems;
      });
    }

    try {
      await updateDoc(doc(db, "users", idval), {
        status: value,
      });
      setIndex(null);

      const rd_db = getDatabase();

      const deleted_ref = ref(rd_db, "deleted_emails");
      const denied_ref = ref(rd_db, "denied_emails");

      if (value == "delete") {
        await push(deleted_ref, {
          email: email,
        });
        console.log("Data inserted successfully!");
      }
      if (value == "denied") {
        await push(denied_ref, {
          email: email,
        });
        console.log("Data inserted successfully!");
      }
      if (value != "denied" && value != "deleted") {
        const snapshot = await get(
          rdQuery(
            ref(rd_db, "denied_emails"),
            orderByChild("email"),
            equalTo(email)
          )
        );
        if (snapshot.val()) {
          const userKey = Object.keys(snapshot.val())[0];
          await remove(ref(rd_db, `denied_emails/${userKey}`));
          console.log("User deleted successfully.");
        } else {
          console.log("No user found");
        }
      }

      showToast(
        "success",
        "Successful.",
        `Message: ${
          value == "delete"
            ? `Admin's account was deleted successfully`
            : `User's request to change admin's status to ${value} was successful.`
        }`,
        3000
      );
      setIsOpen(false);
    } catch (error) {
      console.error("Error updating user status: ", error);
      setIndex(null);
      setIsOpen(false);

      showToast(
        "destructive",
        "Attempt Unsuccessful",
        `Message: Error deleting the record. Please try again.`,
        3000
      );
    }
  };

  return (
    <div>
      <Navigation />

      <main className="max-w-[1140px] px-4 py-8 min-h-[70dvh] mx-auto">
        <p className="text-3xl font-medium">Manage Admins</p>

        <table className="w-full mt-4">
          <thead>
            <tr className="text-xs text-left border-y-2">
              <th className="px-2 py-2 font-normal">ID</th>
              <th className="font-normal">Full name</th>
              <th className="font-normal">Email</th>
              <th className="px-2 font-normal">Status</th>
              <th className="px-2 font-normal">Action</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {admin.map((item, index) => {
              return (
                <tr key={index}>
                  <td className="px-2 py-2">{index + 1}</td>
                  <td>{item?.name}</td>
                  <td>{item?.email}</td>
                  <td>{item?.status}</td>
                  <td className="pr-2">
                    <Select
                      value={item?.status}
                      onValueChange={(value) =>
                        handleValueChange(value, index, item.id, item.email)
                      }
                    >
                      <SelectTrigger className="border-none shadow-none outline-none">
                        <SelectValue placeholder="Update User Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>User Status</SelectLabel>
                          <SelectItem value="allowed">Allowed</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="denied">Denied</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </td>
                  <td>
                    <Button
                      className="px-3 bg-[#00413d] hover:bg-red-500"
                      onClick={() => {
                        setIsOpen(true);
                        setIndex({
                          status: "delete",
                          index: index,
                          id: item.id,
                          email: item.email,
                        });
                      }}
                    >
                      <TrashIcon className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>

      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
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
            <Button
              onClick={() => {
                handleValueChange(
                  index.status,
                  index.index,
                  index.id,
                  index.email
                );
              }}
            >
              Continue
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Footer />
    </div>
  );
};

export default ManageAdmin;
