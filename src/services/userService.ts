import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebaseConfig";

export type UserProfile = {
  email: string;
  firstName: string;
  lastName: string;
  rank: string;
};

export async function getUserProfile(
  uid: string | null
): Promise<UserProfile | null> {
  if (!uid) {
    return null;
  }

  const userSnap = await getDoc(doc(firestore, "users", uid));

  if (!userSnap.exists()) {
    return null;
  }

  const userData = userSnap.data();

  return {
    email: typeof userData.email === "string" ? userData.email : "",
    firstName: typeof userData.firstName === "string" ? userData.firstName : "",
    lastName: typeof userData.lastName === "string" ? userData.lastName : "",
    rank: typeof userData.rank === "string" ? userData.rank : "",
  };
}
