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
import { auth, db } from "@/utils/firebase.config";
import { onAuthStateChanged, getAuth, signOut } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";
import { doc, getDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);
  const [userData, setUserData] = useState(null);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setLoading(false);

      if (user) {
        const userDoc = await getUserDocument(user.uid);
        setUserData(userDoc);
      } else {
        setUserData(null);
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const rd_db = getDatabase();

    const deletedEmailsRef = ref(rd_db, "deleted_emails");
    onValue(deletedEmailsRef, (snapshot) => {
      if (snapshot.exists()) {
        const emails = Object.values(snapshot.val()).map((item) => item.email);
        if (emails.includes(currentUser?.email)) {
          setIsOpen(true);
        } else {
          setIsOpen(false);
        }
      } else {
        // console.log("No deleted emails found");
      }
    });

    const deniedEmailsRef = ref(rd_db, "denied_emails");
    onValue(deniedEmailsRef, (snapshot) => {
      if (snapshot.exists()) {
        const emails = Object.values(snapshot.val()).map((item) => item.email);

        if (emails.includes(currentUser?.email)) {
          setIsOpen(true);
        } else {
          setIsOpen(false);
        }
      } else {
        // console.log("No denied emails found");
      }
    });

    return () => {
      // You can use off() to remove the listener if necessary
      // off(deletedEmailsRef);
      // off(deniedEmailsRef);
    };
  }, [currentUser?.email]);

  const handleOkay = async () => {
    try {
      // Sign out the user
      await signOut(auth);
      console.log("User logged out");

      // Optional: Redirect to the login page or home page
      history.push("/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const getUserDocument = async (docId) => {
    try {
      const docRef = doc(db, "users", docId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        console.log("No such document!");
        return null;
      }
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  };

  const value = {
    currentUser,
    loading,
    userData,
    setUserData,
    authLoading,
    setAuthLoading,
  };

  return (
    <>
      <AuthContext.Provider value={value}>
        {!loading && children}
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
          <AlertDialogTrigger asChild></AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Your account will be signed out
              </AlertDialogTitle>
              <AlertDialogDescription>
                This is to inform you that your access to the system has been
                denied. If you think there is a mistake, contact your supervisor
                and inform about the sudden changes.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Button
                onClick={handleOkay}
                className="bg-[#00413d] hover:bg-[#1B3409]"
              >
                Okay
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </AuthContext.Provider>
    </>
  );
};
