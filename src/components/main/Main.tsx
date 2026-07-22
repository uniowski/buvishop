import "./Main.css";
import { useEffect, useState } from "react";
import { getStoreStats } from "../../services/shopService";

function Main() {
  const [shoesCount, setShoesCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);

  async function getTotalCount() {
    try {
      const stats = await getStoreStats();
      setShoesCount(stats.shoesCount);
      setUsersCount(stats.usersCount);
    } catch {
      console.log("error");
    }
  }

  useEffect(() => {
    getTotalCount();
  }, []);

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
