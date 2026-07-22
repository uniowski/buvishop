import "./Contact.css";
import GMap from "./GMap";

function Contact() {
  return (
    <div className="contakt-container col-10 col-md-8 col-lg-6">
      <h1>Kontakt</h1>
      <h3>Telefon: <a href="tel:+48793070996" className="link-light">+48 793 070 996</a></h3>
      <h3>E-mail: <a href="mailto:dawid.uniowski@gmail.com" className="link-light">dawid.uniowski@gmail.com</a></h3>
      <h4>Znajdź nas: </h4>
      <div className="col-12">{<GMap />}</div>
    </div>
  );
}
export default Contact;
