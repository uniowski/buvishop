import "./CartItem.css";
import { useState } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { firestore } from "../../firebaseConfig";

function KoszykItem({ id, brand, model, imageLink, price, shoeSize, uid, update }) {
  const deleteShoe = async () => {
    try {
      await deleteDoc(doc(firestore, "users", uid, "cart", id));
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
