import { CommentType } from "./CommentType";

export type PostType = {
  id: string;
  title: string;
  photoURL: string;
  coordinates: { longitude: number; latitude: number } | undefined;
  country: string;
  user: string;
  comments?: CommentType[] | [];
  likes?: [];
};

export type addPostType = {
  title: string;
  photoURL: string;
  coordinates: { longitude: number; latitude: number } | undefined;
  country: string;
};

export type getPostType = {
  comments: CommentType[] | [];
  photoURL: string;
  user: string;
};
