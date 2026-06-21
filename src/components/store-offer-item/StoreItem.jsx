import "./StoreItem.css";
import ButGuzikAdd from "../store-offer-item-size/ButGuzikAdd";
import { deleteDoc, doc } from "firebase/firestore";
import { firestore } from "../../firebaseConfig";

function But({ shoeData, uid, currentUserRank, fetchAndDisplayAllDocuments }) {
  const listaRozmiarow = shoeData.size.map((size, index) => {
    if (size != null) {
      return (
        <ButGuzikAdd key={index} size={size} uid={uid} shoeID={shoeData.id} />
      );
    } else {
      return "Brak w magazynie";
    }
  });

  const deleteOffer = async () => {
    window.confirm(
      "Czy na pewno chcesz usunąć tą ofertę?\nTej operacji NIE MOŻNA cofnać."
    );
    await deleteDoc(doc(firestore, "shoes", shoeData.id));
    fetchAndDisplayAllDocuments();
  };

  return (
    <div className="col-12 col-sm-6 col-md-4 col-xl-3 shoe-container" key={shoeData.id}>
      <div className="ofertaButa">
        <div className="imgButaContainer">
          <img
            className="imgButa"
            src={shoeData.imageLink}
            alt={shoeData.brand}
          />
        </div>
        <div className="infoBut">
          <p className="price">{shoeData.price}</p>
          <h1>{shoeData.model} </h1>
          <h5 className="modeltext">{shoeData.brand}</h5>
          <h4>Materiał: {shoeData.fabric}</h4>
          {currentUserRank === "Administrator" ? (
            <>
              <button className="btn btn-danger" onClick={deleteOffer}>
                USUŃ
              </button>
              <button
                className="btn btn-outline-info"
                onClick={() => {
                  alert(
                    shoeData.brand +
                      " " +
                      shoeData.model +
                      " \nID: " +
                      shoeData.id +
                      "\nID zostało skopiowane do schowka."
                  );
                  navigator.clipboard.writeText(shoeData.id);
                }}
              >
                Pokaż ID
              </button>
            </>
          ) : (
            <>
              <h5 className="rozmiar-holder">Rozmiar:</h5>
              {listaRozmiarow}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default But;
