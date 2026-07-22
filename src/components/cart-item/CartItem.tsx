import "./CartItem.css";
import { removeShoeFromCart } from "../../services/cartService";

type CartItemProps = {
  id: string;
  brand: string;
  model: string;
  imageLink: string;
  price: string;
  shoeSize: number;
  uid: string | null;
  update: () => Promise<void>;
};

function KoszykItem({
  id,
  brand,
  model,
  imageLink,
  price,
  shoeSize,
  uid,
  update,
}: CartItemProps) {
  const deleteShoe = async () => {
    if (!uid) {
      return;
    }

    try {
      await removeShoeFromCart(uid, id);
      update();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="item" key={id}>
      <div className="row">
        <div className="col-12 col-md-3">
          <img className="img-shoe" src={imageLink} alt={brand}></img>
        </div>
        <div className="col-6 col-md-3">
          <h1>{model}</h1>
          <h3>{brand}</h3>
        </div>
        <div className="col-6 col-md-3">
          <h4>Wybrany rozmiar: {shoeSize}</h4>
        </div>
        <div className="col-6 col-md-3">
          <img
            src="/images/delete.png"
            alt="Usuń produkt"
            onClick={deleteShoe}
          />
          <h3 className="cartPrice">{price}</h3>
        </div>
      </div>
    </div>
  );
}

export default KoszykItem;
