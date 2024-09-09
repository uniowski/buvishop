import "./Main.css";
import { collection, getCountFromServer } from "firebase/firestore";
import { firestore } from "../../firebaseConfig";
import { useState } from "react";

function Main() {
  const [shoesCount, setShoesCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);

  async function getTotalCount() {
    try {
      const collShoes = collection(firestore, "shoes");
      const snapshotShoes = await getCountFromServer(collShoes);
      setShoesCount(snapshotShoes.data().count);

      const collUsers = collection(firestore, "users");
      const snapshotUsers = await getCountFromServer(collUsers);
      setUsersCount(snapshotUsers.data().count);
    } catch {
      console.log("error");
    }
  }

  getTotalCount();

  return (
    <>
      <div className="color-image-container">
        <img src="\images\Graphic_Design_Shoe_Alfa_B.png" className="color-image" alt="Obraz Logo"></img>
      </div>
      <div className="main-container">
        <h1>Witamy na Buvi, najmodniejszej stronie z obówiem w Polsce</h1>
        <div>
          <h3>Na stronie można wybierać spośród {shoesCount} ofert</h3>
        </div>
        <div>
          <h3>Zaufało nam już {usersCount} użytkowników</h3>
        </div>
      </div>
    </>
  );
}

export default Main;
