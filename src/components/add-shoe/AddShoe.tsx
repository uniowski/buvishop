import "./AddShoe.css";
import { useForm } from "react-hook-form";
import { addNewShoeOffer } from "../../services/shoeService";

type AddShoeFormValues = {
  shoeImage: FileList;
  brand: string;
  model: string;
  fabric: string;
  price: number;
  size: string[];
};

function AddShoe() {
  const { register, handleSubmit, reset } = useForm<AddShoeFormValues>();

  const addNewShoe = async (data: AddShoeFormValues) => {
    const availableSize = (data.size ?? [])
      .map((size) => Number(size))
      .filter(Number.isFinite);

    const shoeImage = data.shoeImage?.[0];

    if (!shoeImage) {
      alert("Wybierz zdjęcie produktu.");
      return;
    }

    try {
      const newDocId = await addNewShoeOffer({
        shoeImage,
        brand: data.brand,
        model: data.model,
        size: availableSize,
        fabric: data.fabric,
        price: data.price,
      });

      console.log("ID nowo dodanego dokumentu: ", newDocId);
    } catch (error) {
      console.error("Błąd przy dodawaniu dokumentu: ", error);
      alert("Wystąpił błąd przy dodawaniu butów.");
    }

    reset();
  };

  const allSizes = [36, 37, 38, 39, 40, 41, 42, 43, 44, 45];

  const allSizesForm = allSizes.map((possibleSize) => {
    return (
      <div key={possibleSize} className="possible-size">
        <input
          className="form-check-input"
          type="checkbox"
          value={possibleSize}
          id={`rozmiar${possibleSize}`}
          {...register("size")}
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
      <form
        id="shoeAddForm"
        name="shoeAddForm"
        onSubmit={handleSubmit(addNewShoe)}
      >
        <div className="form-group">
          <label htmlFor="formFile" className="form-label">
            Dodaj zdjęcie oferty
          </label>
          <input
            className="form-control"
            type="file"
            id="formFile"
            {...register("shoeImage", { required: true })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="brand">Producent</label>
          <input
            type="text"
            id="brand"
            className="form-control"
            placeholder="Producent"
            {...register("brand", { required: true })}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="model">Model</label>
          <input
            type="text"
            id="model"
            className="form-control"
            placeholder="Model"
            {...register("model", { required: true })}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="fabric">Materiał</label>
          <input
            type="text"
            id="fabric"
            className="form-control"
            placeholder="Materiał"
            {...register("fabric", { required: true })}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="price">Cena</label>
          <input
            type="number"
            step={0.01}
            id="price"
            className="form-control"
            placeholder="Cena"
            pattern="[0-9]+([.,][0-9]+)?"
            {...register("price", {
              required: true,
              valueAsNumber: true,
              min: 0,
            })}
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
