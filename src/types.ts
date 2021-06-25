import firebase from "firebase";
export type TAdminCredentials = {
  question: string;
  answer: string;
};
export type TMovies = { id: string; name: string; title: string };
export type FirebaseContextProps = {
  firebase: typeof firebase;
  firestore: firebase.firestore.Firestore | undefined;
  auth?: firebase.User | any;
};
export type TParams = { movieId: string };
export type LocationState = {
  state: string;
  from: string;
};
