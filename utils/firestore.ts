import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../config";
import { uploadFile } from "./uploadFile";
import { UserDetails } from "../types/UserType";
import { addPostType, getPostType, PostType } from "../types/PostType";
import { AppDispatch } from "../store/store";
import { updateUserInfo } from "../store/authSlice/userSlice";
import { CommentType } from "../types/CommentType";

const docPostsRef = collection(db, "posts");

export const addUser = async (userId: string, userData: UserDetails) => {
  try {
    await setDoc(doc(db, "users", userId), userData, {
      merge: true,
    });
    console.log("User added:", userId);
  } catch (error) {
    console.log("Error adding user:", error);
  }
};

export const getUser = async (uid: string) => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("Error load user");

    return null;
  }
};

export const updateUserAvatar = async (
  uid: string,
  photoURL: string,
  dispatch: AppDispatch
) => {
  let avatarUrl = "";

  if (photoURL) {
    avatarUrl = await uploadFile(photoURL, "user_photo");
  }

  await updateDoc(doc(db, "users", uid), { photoURL: avatarUrl });
  dispatch(updateUserInfo({ photoURL: avatarUrl }));
};

export const addPost = async (
  uid: string,
  { title, photoURL, coordinates, country: country }: addPostType
) => {
  const url = await uploadFile(photoURL, "postsImages", title);
  const post = {
    user: uid,
    title,
    photoURL: url,
    coordinates: coordinates,
    country: country,
    likes: [],
    comments: [],
  };

  try {
    const res = await addDoc(docPostsRef, post);

    return res.id;
  } catch (error) {
    console.error("Error adding doc", error);
    return null;
  }
};

export const getPosts = async () => {
  try {
    const querySnapshot = await getDocs(docPostsRef);
    const posts: PostType[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      posts.push({
        id: doc.id,
        user: data.user,
        title: data.title || "",
        photoURL: data.photoURL || "",
        coordinates: data.coordinates || null,
        country: data.country || "",
        comments: data.comments || [],
        likes: data.likes || [],
      });
    });

    return posts;
  } catch (error) {
    console.error("Error fetching posts: ", error);
    return [];
  }
};

export const getUserPosts = async (uid: string) => {
  try {
    const q = query(docPostsRef, where("user", "==", uid));
    const querySnapshot = await getDocs(q);
    const posts: PostType[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      posts.push({
        id: doc.id,
        user: data.user,
        title: data.title || "",
        photoURL: data.photoURL || "",
        coordinates: data.coordinates || null,
        country: data.country || "",
        comments: data.comments || [],
        likes: data.likes || [],
      });
    });

    return posts;
  } catch (error) {
    console.error("Error fetching posts: ", error);
    // return [];
  }
};

export const getPost = async (id: string): Promise<getPostType | undefined> => {
  try {
    const querySnapshot = await getDoc(doc(db, "posts", id));
    const post = querySnapshot.data();
    if (post) {
      const data: getPostType = {
        comments: post.comments,
        user: post.user,
        photoURL: post.photoURL,
      };

      return data;
    }
  } catch (error) {
    console.error("Error fetching posts: ", error);
  }
};

export const updatePostComment = async (
  id: string,
  uid: string,
  text: string
): Promise<string | undefined> => {
  try {
    const now = new Date();
    await updateDoc(doc(db, "posts", id), {
      comments: arrayUnion({ uid, text, date_comment: now }),
    });

    return "Update comments.";
  } catch (error) {
    console.error("Error fetching posts: ", error);
  }
};
