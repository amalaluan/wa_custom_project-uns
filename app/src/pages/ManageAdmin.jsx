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

const ManageAdmin = () => {
  const { userData } = useAuth();

  const [admin, setAdmin] = useState([]);

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
        setAdmin(adminList);
      } catch (error) {
        console.error("Error fetching admins: ", error);
      }
    };

    fetchAdmins();
  }, []);

  const handleValueChange = async (value, index, idval) => {
    setAdmin((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index] = { ...updatedItems[index], status: value };

      return updatedItems;
    });

    try {
      await updateDoc(doc(db, "users", idval), {
        status: value,
      });
      console.log(`User status updated to: ${value}`);
    } catch (error) {
      console.error("Error updating user status: ", error);
    }
  };

  return (
    <div>
      <Navigation />

      <main className="max-w-[1140px] px-4 py-8 min-h-[65dvh] mx-auto">
        <p className="text-3xl font-medium">Manage Admins</p>

        <table className="w-full mt-4">
          <thead>
            <tr className="text-xs text-left border-y-2">
              <th className="px-2 py-2 font-normal">ID</th>
              <th className="font-normal">Full name</th>
              <th className="font-normal">Email</th>
              <th className="px-2 font-normal">Status</th>
              <th className="px-2 font-normal">Action</th>
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
                        handleValueChange(value, index, item.id)
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
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>

      <Footer />
    </div>
  );
};

export default ManageAdmin;
