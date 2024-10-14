import { getDownloadURL, list, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "./firebase.config";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";

export const uploadFile = async (currentUser, file, path, setAuthLoading) => {
  try {
    if (file == null) return;
    setAuthLoading(true);

    const timestamp = new Date().valueOf();
    const fileRef = ref(storage, `${path}/${timestamp}`);

    const snapshot = await uploadBytes(fileRef, file);
    const photoURL = await getDownloadURL(fileRef);

    updateProfile(currentUser, { photoURL })
      .then(() => {
        setAuthLoading(false);
      })
      .catch((error) => {
        setAuthLoading(false);
        console.log(error);
      });
  } catch (e) {
    console.log(e);
  }
};

export const updateData = async (col_name, uid, payload, setAuthLoading) => {
  const docRef = doc(db, col_name, uid);
  setAuthLoading(true);

  try {
    await updateDoc(docRef, { ...payload });
    setAuthLoading(false);
  } catch (error) {
    console.error("Error updating document:", error);
    setAuthLoading(false);
  }
};

export const changePassword = async (
  oldPassword,
  newPassword,
  setAuthLoading
) => {
  const user = auth.currentUser;
  setAuthLoading(true);

  if (user) {
    const credential = EmailAuthProvider.credential(user.email, oldPassword);

    try {
      // Reauthenticate the user
      await reauthenticateWithCredential(user, credential);
      console.log("Reauthentication successful!");
      setAuthLoading(false);

      // Now update the password
      await updatePassword(user, newPassword);
      console.log("Password updated successfully!");
    } catch (error) {
      console.error("Error updating password:", error);
      setAuthLoading(false);
    }
  } else {
    console.log("No user is signed in.");
    setAuthLoading(false);
  }
};

export const deleteDocument = async (path, id) => {
  try {
    const docRef = doc(db, path, id);
    await deleteDoc(docRef);
    console.log("Document deleted successfully");
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
};
