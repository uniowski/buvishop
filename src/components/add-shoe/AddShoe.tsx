import "./AddShoe.css";
import { addDoc, collection } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firestore } from "../../firebaseConfig";
import type { FormEvent } from "react";

function AddShoe() {
  const addNewShoe = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;

    const checkedSizes = form.querySelectorAll<HTMLInputElement>(
      'input[name="rozmiar"]:checked'
    );
    const availableSize = Array.from(checkedSizes)
      .map((input) => Number(input.value))
      .filter(Number.isFinite);

    const shoeImageInput = form.elements.namedItem("shoeImage") as
      | HTMLInputElement
      | null;
    const shoeImage = shoeImageInput?.files?.[0];

    if (!shoeImage) {
      alert("Wybierz zdjęcie produktu.");
      return;
    }

    const storage = getStorage();
    const brand =
      (form.elements.namedItem("brand") as HTMLInputElement | null)?.value ??
      "";
    const model =
      (form.elements.namedItem("model") as HTMLInputElement | null)?.value ??
      "";
    const fabric =
      (form.elements.namedItem("fabric") as HTMLInputElement | null)?.value ??
      "";
    const price =
      (form.elements.namedItem("price") as HTMLInputElement | null)?.value ??
      "";

    try {
      const storageRef = ref(storage, `shoes/${shoeImage.name}`);
      await uploadBytes(storageRef, shoeImage);
      const downloadURL = await getDownloadURL(storageRef);

      const colRef = collection(firestore, "shoes");
      const docRef = await addDoc(colRef, {
        brand,
        model,
        size: availableSize,
        fabric,
        price,
        imageLink: downloadURL,
      });

      console.log("ID nowo dodanego dokumentu: ", docRef.id);
    } catch (error) {
      console.error("Błąd przy dodawaniu dokumentu: ", error);
      alert("Wystąpił błąd przy dodawaniu butów.");
    }

    form.reset();
  };

  const allSizes = [36, 37, 38, 39, 40, 41, 42, 43, 44, 45];

  const allSizesForm = allSizes.map((possibleSize) => {
    return (
      <div key={possibleSize} className="possible-size">
        <input
          className="form-check-input"
          type="checkbox"
          value={possibleSize}
          name="rozmiar"
          id={`rozmiar${possibleSize}`}
        ></input>
        <label className="form-check-label" htmlFor={`rozmiar${possibleSize}`}>
          {possibleSize}
        </label>
      </div>
    );
  });

  return (
    <div className="adding-shoe-container col-sm-12 col-md-8 col-lg-6 m-2">
      <h3>Dodaj ofertę buta</h3>
      <form id="shoeAddForm" name="shoeAddForm" onSubmit={addNewShoe}>
        <div className="form-group">
          <label htmlFor="formFile" className="form-label">
            Dodaj zdjęcie oferty
          </label>
          <input
            className="form-control"
            type="file"
            id="formFile"
            name="shoeImage"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="brand">Producent</label>
          <input
            type="text"
            name="brand"
            id="brand"
            className="form-control"
            placeholder="Producent"
            required
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="model">Model</label>
          <input
            type="text"
            name="model"
            id="model"
            className="form-control"
            placeholder="Model"
            required
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="fabric">Materiał</label>
          <input
            type="text"
            name="fabric"
            id="fabric"
            className="form-control"
            placeholder="Materiał"
            required
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="price">Cena</label>
          <input
            type="number"
            step={0.01}
            name="price"
            id="price"
            className="form-control"
            placeholder="Cena"
            pattern="[0-9]+([.,][0-9]+)?"
            required
          ></input>
        </div>
        <div className="form-group">
          <label>Rozmiar</label>
          {allSizesForm}
        </div>
        <div className="form-group">
          <input type="submit" value={"Dodaj"} className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
}

export default AddShoe;
