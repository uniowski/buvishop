import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { firestore, storage } from "../firebaseConfig";

export type ShoeData = {
  id: string;
  brand: string;
  model: string;
  size: number[];
  fabric: string;
  price: string;
  imageLink: string;
};

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
