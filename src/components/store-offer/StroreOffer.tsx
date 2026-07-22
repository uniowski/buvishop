import "./StroreOffer.css";
import But from "../store-offer-item/StoreItem";
import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { firestore } from "./../../firebaseConfig";

type ShoeData = {
  id: string;
  brand: string;
  model: string;
  size: number[];
  fabric: string;
  price: string;
  imageLink: string;
};

type OfertaProps = {
  uid: string | null;
  currentUserRank: string | null;
};

function Oferta({ uid, currentUserRank }: OfertaProps) {
  const [obuwie, setObuwie] = useState<ShoeData[]>([]);

  async function fetchAndDisplayAllDocuments() {
    try {
      const colRef = collection(firestore, "shoes");
      const querySnapshot = await getDocs(colRef);

      const shoesData: ShoeData[] = querySnapshot.docs.map((docSnapshot) => {
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

      setObuwie(shoesData);
    } catch (error) {
      console.error("Błąd przy pobieraniu dokumentów: ", error);
    }
  }

  useEffect(() => {
    fetchAndDisplayAllDocuments();
  }, []);

  return (
    <div className="ofertaobuwia row no-margin-no-padding">
      {obuwie.map((shoeData) => (
        <But key={shoeData.id} shoeData={shoeData} uid={uid} currentUserRank={currentUserRank} fetchAndDisplayAllDocuments={fetchAndDisplayAllDocuments}/>
      ))}
    </div>
  );
}

export default Oferta;
