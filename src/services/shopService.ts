import { auth, firestore, storage } from "../firebaseConfig";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export type UserProfile = {
  email: string;
  firstName: string;
  lastName: string;
  rank: string;
};

export type ShoeData = {
  id: string;
  brand: string;
  model: string;
  size: number[];
  fabric: string;
  price: string;
  imageLink: string;
};

type CartDocument = {
  id: string;
  shoeID: string;
  shoeSize: number;
};

export type CartViewItem = {
  cartItemID: string;
  brand: string;
  model: string;
  price: string;
  imageLink: string;
  shoeSize: number;
};

export type StoreStats = {
  shoesCount: number;
  usersCount: number;
};

export async function getUserProfile(uid: string | null): Promise<UserProfile | null> {
  if(!uid){
    return null
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

export async function getAllShoes(): Promise<ShoeData[]> {
  const colRef = collection(firestore, "shoes");
  const querySnapshot = await getDocs(colRef);

  return querySnapshot.docs.map((docSnapshot) => {
    const data = docSnapshot.data();

    return {
      id: docSnapshot.id,
      brand: typeof data.brand === "string" ? data.brand : "",
      model: typeof data.model === "string" ? data.model : "",
      size: Array.isArray(data.size)
        ? data.size.map((item) => Number(item)).filter(Number.isFinite)
        : [],
      fabric: typeof data.fabric === "string" ? data.fabric : "",
      price:
        typeof data.price === "string" || typeof data.price === "number"
          ? String(data.price)
          : "0",
      imageLink: typeof data.imageLink === "string" ? data.imageLink : "",
    };
  });
}

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

export async function getUserCartItems(uid: string): Promise<CartViewItem[]> {
  const shoesData = await getAllShoes();

  const usersCartRef = collection(firestore, "users", uid, "cart");
  const cartSnapshot = await getDocs(usersCartRef);

  const cartData: CartDocument[] = cartSnapshot.docs.map((docSnapshot) => {
    const data = docSnapshot.data();

    return {
      id: docSnapshot.id,
      shoeID: typeof data.shoeID === "string" ? data.shoeID : "",
      shoeSize: Number(data.shoeSize),
    };
  });

  return cartData
    .map((cartItem) => {
      const shoeDetails = shoesData.find((shoe) => shoe.id === cartItem.shoeID);

      return {
        cartItemID: cartItem.id,
        brand: shoeDetails?.brand || "Unknown",
        model: shoeDetails?.model || "Unknown",
        price: shoeDetails?.price || "0",
        imageLink: shoeDetails?.imageLink || "",
        shoeSize: cartItem.shoeSize,
      };
    })
    .filter((item) => item.brand !== "Unknown");
}

export async function addShoeToCart(
  uid: string,
  shoeID: string,
  size: number
): Promise<void> {
  await addDoc(collection(firestore, "users", uid, "cart"), {
    shoeID,
    shoeSize: size,
  });
}

export async function removeShoeFromCart(
  uid: string,
  cartItemID: string
): Promise<void> {
  await deleteDoc(doc(firestore, "users", uid, "cart", cartItemID));
}

export async function addNewShoeOffer(input: {
  shoeImage: File;
  brand: string;
  model: string;
  fabric: string;
  price: number;
  size: number[];
}): Promise<string> {
  const storageRef = ref(storage, `shoes/${input.shoeImage.name}`);
  await uploadBytes(storageRef, input.shoeImage);
  const downloadURL = await getDownloadURL(storageRef);

  const colRef = collection(firestore, "shoes");
  const docRef = await addDoc(colRef, {
    brand: input.brand,
    model: input.model,
    size: input.size,
    fabric: input.fabric,
    price: input.price,
    imageLink: downloadURL,
  });

  return docRef.id;
}

export async function removeShoeOffer(shoeID: string): Promise<void> {
  await deleteDoc(doc(firestore, "shoes", shoeID));
}

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
