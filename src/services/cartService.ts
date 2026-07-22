import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { firestore } from "../firebaseConfig";
import { getAllShoes } from "./shoeService";

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
