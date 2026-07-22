import "./StroreOffer.css";
import But from "../store-offer-item/StoreItem";
import { useState, useEffect } from "react";
import { getAllShoes, type ShoeData } from "../../services/shoeService";

type OfertaProps = {
  uid: string | null;
  currentUserRank: string | null;
};

function Oferta({ uid, currentUserRank }: OfertaProps) {
  const [obuwie, setObuwie] = useState<ShoeData[]>([]);

  async function fetchAndDisplayAllDocuments() {
    try {
      const shoesData = await getAllShoes();
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
