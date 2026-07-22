import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, firestore } from "../firebaseConfig";

export async function loginWithEmailAndPassword(
  email: string,
  password: string
): Promise<{ uid: string; email: string | null }> {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);

  return {
    uid: userCredential.user.uid,
    email: userCredential.user.email,
  };
}

export async function registerAccount(input: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  rank: "Klient" | "Administrator";
}): Promise<void> {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    input.email,
    input.password
  );
  const user = userCredential.user;

  await setDoc(doc(firestore, "users", user.uid), {
    email: input.email,
    firstName: input.firstName,
    lastName: input.lastName,
    rank: input.rank,
  });
}

export async function sendResetPasswordEmail(email: string): Promise<void> {
  await sendPasswordResetEmail(auth, email);
}
