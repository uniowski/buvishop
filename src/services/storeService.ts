import { collection, getCountFromServer } from "firebase/firestore";
import { firestore } from "../firebaseConfig";

export type StoreStats = {
  shoesCount: number;
  usersCount: number;
};

export async function getStoreStats(): Promise<StoreStats> {
  const collShoes = collection(firestore, "shoes");
  const snapshotShoes = await getCountFromServer(collShoes);

  const collUsers = collection(firestore, "users");
  const snapshotUsers = await getCountFromServer(collUsers);

  return {
    shoesCount: snapshotShoes.data().count,
    usersCount: snapshotUsers.data().count,
  };
}
