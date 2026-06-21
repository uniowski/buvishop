import "./ButGuzikAdd.css";
import { firestore } from "../../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

function ButGuzikAdd({ size, uid, shoeID }) {
  const add = async () => {
    try {
      const shoeRef = addDoc(collection(firestore, "users", uid, "cart"), {
        shoeID: shoeID,
        shoeSize: size,
      });
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
