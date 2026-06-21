import "./StroreOffer.css";
import But from "../store-offer-item/StoreItem";
import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { firestore } from "./../../firebaseConfig";

function Oferta({ uid, currentUserRank }) {
  const [obuwie, setObuwie] = useState([]);

  async function fetchAndDisplayAllDocuments() {
    try {
      const colRef = collection(firestore, "shoes");
      const querySnapshot = await getDocs(colRef);

      const shoesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

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
