import "./ButGuzikAdd.css";
import { addShoeToCart } from "../../services/shopService";

type ButGuzikAddProps = {
  size: number;
  uid: string | null;
  shoeID: string;
};

function ButGuzikAdd({ size, uid, shoeID }: ButGuzikAddProps) {
  const add = async () => {
    if (!uid) {
      return;
    }

    try {
      await addShoeToCart(uid, shoeID, size);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button className="rozmiar" onClick={add}>
      <h5 className="m-0">{size}</h5>
    </button>
  );
}
export default ButGuzikAdd;
