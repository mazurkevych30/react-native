import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../config";
import { AppDispatch } from "../store/store";
import { uploadFile } from "./uploadFile";
import { addUser, getUser } from "./firestore";
import { removeUserInfo, setUserInfo } from "../store/authSlice/userSlice";

interface AuthCredentials {
  email: string;
  password: string;
  login?: string;
  photoURL?: string;
}

export const register = async (
  { email, password, login, photoURL }: AuthCredentials,
  dispatch: AppDispatch
) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user;

    let avatarUrl = "";
    if (photoURL) {
      avatarUrl = await uploadFile(photoURL, "user_photo");
    }

    const userData = {
      uid: user.uid,
      email: user.email || "",
      displayName: login || "",
      photoURL: avatarUrl,
    };

    await addUser(user.uid, userData);

    dispatch(setUserInfo(userData));
  } catch (error) {
    console.error("REGISTER ERROR:", error);
  }
};

export const login = async (
  { email, password }: AuthCredentials,
  dispatch: AppDispatch
) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const user = result.user;

    const userData = await getUser(user.uid);

    if (userData) {
      dispatch(
        setUserInfo({
          uid: user.uid,
          email: user.email || "",
          displayName: userData.displayName || "",
          photoURL: userData.photoURL || "",
        })
      );
    } else {
      console.error("User data not found in Firestore.");
    }
    return userData;
  } catch (error) {
    console.error("LOGIN ERROR:", error);
  }
};

export const logout = async (dispatch: AppDispatch) => {
  try {
    await signOut(auth);
    dispatch(removeUserInfo());
  } catch (error) {
    console.error("LOGOUT ERROR:", error);
  }
};

export const authStateChanged = (dispatch: AppDispatch) => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        const userData = await getUser(user.uid);

        if (userData) {
          dispatch(
            setUserInfo({
              uid: user.uid,
              email: user.email || "",
              displayName: userData.displayName || "",
              photoURL: userData.photoURL || "",
            })
          );
        } else {
          console.error("User data not found in Firestore.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    } else {
      dispatch(removeUserInfo());
    }
  });
};
