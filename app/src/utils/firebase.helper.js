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

    // Use async/await for updateProfile
    await updateProfile(currentUser, { photoURL });

    setAuthLoading(false);
    return photoURL; // Return photoURL after successful update
  } catch (e) {
    setAuthLoading(false);
    console.log(e);
  }
};

export const updateData = async (col_name, uid, payload, setAuthLoading) => {
  const docRef = doc(db, col_name, uid);
  setAuthLoading(true);

  try {
    await updateDoc(docRef, { ...payload });
    setAuthLoading(false);
    return { response: 1 };
  } catch (error) {
    console.error("Error updating document:", error);
    setAuthLoading(false);
    return { response: 0 };
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

      // Now update the password
      await updatePassword(user, newPassword);
      console.log("Password updated successfully!");
      setAuthLoading(false);

      // Return success message
      return { success: 1, message: "success" };
    } catch (error) {
      console.error("Error updating password:", error);
      setAuthLoading(false);

      // Return failure message
      return { success: 0, message: "failed" };
    }
  } else {
    console.log("No user is signed in.");
    setAuthLoading(false);

    // Return failure message if no user is signed in
    return { success: 0, message: "failed" };
  }
};

export const deleteDocument = async (path, id) => {
  try {
    const docRef = doc(db, path, id);
    await updateDoc(docRef, {
      status: "deleted",
    });
    console.log("Document marked as deleted successfully");
  } catch (error) {
    console.error("Error marking document as deleted: ", error);
  }
};
