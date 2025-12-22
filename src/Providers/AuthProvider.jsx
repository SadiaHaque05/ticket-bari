import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { AuthContext } from "./AuthContext";
import { auth } from "../Firebase/firebase.config";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Track auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          // Fetch user from backend and normalize email
          const res = await fetch(
            `http://localhost:3000/users/${currentUser.email.toLowerCase()}`
          );
          const data = await res.json();

          const role = (data?.role || "buyer").toLowerCase();
          setUser({ ...currentUser, role });
        } catch (error) {
          console.log("Failed to fetch role:", error);
          setUser({ ...currentUser, role: "buyer" });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Auth functions
  const createUser = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const signIn = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

  const logOut = () => signOut(auth);

  const updateUserProfile = (displayName, photoURL) =>
    updateProfile(auth.currentUser, { displayName, photoURL });

  const authInfo = {
    user,
    loading,
    setUser,
    createUser,
    signIn,
    signInWithGoogle,
    logOut,
    updateUserProfile,
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
