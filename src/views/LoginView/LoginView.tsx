import { useContext } from "react";
import firebase from "firebase";
import { LoginPage } from "@antonlazurko/auth_form_package";

import { FirebaseContext } from "../../index";

const LoginView: React.FC = () => {
  const { auth } = useContext(FirebaseContext);
  const handleAuthorize = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await auth.signInWithPopup(provider);
  };
  return <LoginPage onSubmit={handleAuthorize} />;
};
export default LoginView;
