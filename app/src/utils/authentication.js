import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  deleteUser,
} from "firebase/auth";
import { auth, db } from "./firebase.config";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const signIn = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    const userDocRef = doc(db, "users", user.uid);
    const userDocSnap = await getDoc(userDocRef);

    if (!user.emailVerified) {
      return {
        status: 2,
        message: "Redirecting in 2s.",
        approved: false,
        verified: false,
      };
    }

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();

      if (userData.status !== "pending") {
        return { status: 1, message: user };
      } else {
        return {
          status: 2,
          message: "Redirecting in 2s.",
          approved: false,
          verified: true,
        };
      }
    }
  } catch (error) {
    return {
      status: 0,
      message: "Please check your sign in credentials",
      additionalInfo: error.message,
    };
  }
};

export const signUp = async (email, password, fullname) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    try {
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        name: fullname,
        status: "pending",
      });
    } catch (docError) {
      await deleteUser(user);
      return {
        status: 0,
        message: "Failed to complete user setup. User has been deleted.",
        additionalInfo: docError.message,
      };
    }

    await sendEmailVerification(user);

    return { status: 1, message: "Email verification was sent" };
  } catch (error) {
    return {
      status: 0,
      message: "Error signing up",
      additionalInfo: error.message,
    };
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log("Error signing out:", error.message);
  }
};
