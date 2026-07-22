import { useState, useEffect } from "react";
import "./Cart.css";
import CartItem from "../cart-item/CartItem";
import { firestore } from "../../firebaseConfig";
import { getDocs, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

type DeliveryFormValues = {
  delivery: number;
};

type CartProps = {
  uid: string | null;
  currentUserRank: string | null;
};

type Shoe = {
  id: string;
  brand: string;
  model: string;
  price: string;
  imageLink: string;
};

type CartDocument = {
  id: string;
  shoeID: string;
  shoeSize: number;
};

type CartViewItem = {
  cartItemID: string;
  brand: string;
  model: string;
  price: string;
  imageLink: string;
  shoeSize: number;
};

function Cart({ uid, currentUserRank }: CartProps) {
  const [priceSum, setPriceSum] = useState(0);
  const [dataToShow, setDataToShow] = useState<CartViewItem[] | undefined>();
  const { register, watch } = useForm<DeliveryFormValues>({
    defaultValues: { delivery: 9.9 },
  });
  const cenaDostawy = watch("delivery");
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUserRank === "Klient") {
      fetchAndDisplayUsersCart();
    } else {
      navigate("/zaloguj");
    }
  }, [uid]);

  async function fetchAndDisplayUsersCart() {
    if (!uid) {
      setDataToShow(undefined);
      return;
    }

    try {
      const shoesRef = collection(firestore, "shoes");
      const shoesSnapshot = await getDocs(shoesRef);
      const shoesData: Shoe[] = shoesSnapshot.docs.map((docSnapshot) => {
        const data = docSnapshot.data();

        return {
          id: docSnapshot.id,
          brand: typeof data.brand === "string" ? data.brand : "",
          model: typeof data.model === "string" ? data.model : "",
          price:
            typeof data.price === "string" || typeof data.price === "number"
              ? String(data.price)
              : "0",
          imageLink: typeof data.imageLink === "string" ? data.imageLink : "",
        };
      });

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

      if (cartData.length > 0) {
        const data = cartData
          .map((cartItem) => {
            const shoeDetails = shoesData.find(
              (shoe) => shoe.id === cartItem.shoeID
            );
            return {
              cartItemID: cartItem.id,
              brand: shoeDetails?.brand || "Unknown",
              model: shoeDetails?.model || "Unknown",
              price: shoeDetails?.price || 0,
              imageLink: shoeDetails?.imageLink || "",
              shoeSize: cartItem.shoeSize,
            };
          })
          .filter((item) => item.brand !== "Unknown");
        setDataToShow(data);
        calculatePriceSum(data);
      } else {
        setDataToShow();
      }
    } catch (error) {
      console.error("Błąd przy pobieraniu dokumentów: ", error);
      alert("Wystąpił błąd.\nSpróbuj ponownie lub skontaktuj się z obsługą klienta.");
    }
  }

  function calculatePriceSum(data: CartViewItem[]) {
    const sum = data.reduce((total, item) => {
      return total + (parseFloat(item.price) || 0);
    }, 0);
    setPriceSum(sum);
  }

  return (
    <div className="cart-container">
      <div className="koszyk-container">
        {dataToShow ? (
          dataToShow.map((itemData, index) => (
            <CartItem
              key={index}
              id={itemData.cartItemID}
              brand={itemData.brand}
              model={itemData.model}
              imageLink={itemData.imageLink}
              price={itemData.price}
              shoeSize={itemData.shoeSize}
              uid={uid}
              update={fetchAndDisplayUsersCart}
            />
          ))
        ) : (
          <div className="empty-cart">
            <h3>Twój koszyk jest pusty</h3>
            <img src="images/empty_cart.png" alt="Puste pudełko"></img>
          </div>
        )}
      </div>
      {dataToShow ? (
        <div className="podsumowanie-container">
          <h1>Podsumowanie:</h1>
          <h3>Wartość produktów: {priceSum.toFixed(2)}</h3>
          <h5>Dostawa: {cenaDostawy.toFixed(2)} PLN</h5>
          <select
            id="dostawa"
            name="dostawa"
            className="form-select"
            {...register("delivery", { valueAsNumber: true })}
          >
            <option value={9.9}>InPost Paczkomat - 9.90 PLN</option>
            <option value={14.9}>InPost Wysyłka - 15.90 PLN</option>
            <option value={4.9}>Poczta Polska - 4.90 PLN</option>
            <option value={9.99}>ŻabPost - 9.99 PLN</option>
            <option value={12.9}>Orlen Paczka - 12.90 PLN</option>
          </select>
          <br />
          <h3>Razem z dostawą: {(priceSum + cenaDostawy).toFixed(2)} PLN</h3>
          <p>VAT-23%: {((priceSum + cenaDostawy) * 0.23).toFixed(2)} PLN</p>

          <hr />
          <button
            className="btn btn-success"
            onClick={() => {
              alert("Ten guzik będzie przekierowywał do strony z płatnościami");
            }}
          >
            Przejdź do płatności
          </button>
          <button
            className="btn btn-warning"
            onClick={() => {
              alert("Ten guzik będzie przekierowywał do strony z płatnościami");
            }}
          >
            Rozłóż na raty
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Cart;
