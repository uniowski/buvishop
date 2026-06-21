import "./LoginPage.css";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, firestore } from "../../firebaseConfig";
import { useEffect, useState } from "react";

function LoginPage({
  accessCode,
  onSetUid,
  uid,
  logout,
  showWelocomeScreen,
  currentEmail,
  setCurrentEmail,
}) {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [rank, setRank] = useState("Klient");
  const [accessCodeInput, setAccessCodeInput] = useState();
  const [askForVerify, setAskForVerify] = useState("");
  const [resetPasswordButton, setResetPasswordButton] =
    useState("Zresetuj hasło");
  const [registerForm, setRegisterForm] = useState(true);

  const loginToAccount = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      const user = userCredential.user;
      onSetUid(user.uid);
      setCurrentEmail(user.email);
    } catch (error) {
      console.error("Błąd logowania:", error.message);
      alert(error.message);
    }
  };

  const registerNewAccount = async (event) => {
    event.preventDefault();
    if (rank === "Administrator" && accessCodeInput !== accessCode) {
      alert("Błędny kod dostępu");
      setRank("Klient");
      setAskForVerify("");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      const user = userCredential.user;

      await setDoc(doc(firestore, "users", user.uid), {
        email: registerEmail,
        firstName,
        lastName,
        rank,
      });

      setAskForVerify("");
      window.scroll({
        top: 0,
        behavior: "smooth",
      });
      setRegisterForm(false);
    } catch (error) {
      console.error("Błąd rejestracji:", error.message);
      alert(error.message);
    }

    setRegisterEmail("");
    setRegisterPassword("");
    setFirstName("");
    setLastName("");
    setRank("Klient");
    setAccessCodeInput("");
    setAskForVerify("");
  };

  useEffect(() => {
    if (rank === "Administrator") {
      alert(
        "Kod dostępu może być wysłany na pocztę pracowniczą:\n" + accessCode
      );
      setAskForVerify(
        <div className="form-group col-6">
          <label htmlFor="accessCodeInput">Kod dostępu</label>
          <input
            type="number"
            id="accessCodeInput"
            className="form-control"
            placeholder="****"
            pattern="[0-9]{4}"
            min={1000}
            max={9999}
            value={accessCodeInput}
            onChange={(e) => setAccessCodeInput(e.target.value)}
          />
        </div>
      );
    } else {
      setAskForVerify("");
    }
  }, [rank]);

  const loginAsDemoAccount = (email, password) => {
    logoutHandle();
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
    setLoginEmail(email);
    setLoginPassword(password);
  };
  const logoutHandle = () => {
    setCurrentEmail();
    logout();
  };

  const resetPassword = async () => {
    if (loginEmail.includes("@") && loginEmail.includes(".")) {
      try {
        await sendPasswordResetEmail(auth, loginEmail);
        setResetPasswordButton("Wysłano maila, sprawdź pocztę: " + loginEmail);
      } catch (error) {
        console.log("Nie można wysłać maila do odzyskania hasła:");
        setResetPasswordButton(
          "Nie znaleziono adresu e-mail, spróbuj jeszce raz"
        );
      }
    }
  };

  return (
    <div className="logowaniePage">
      {showWelocomeScreen}
      <div className="logowanienastrone">
        {uid ? (
          <>
            <h2>Zalogowano na konto: {currentEmail}</h2>
            <section className="loginAsButton" onClick={logoutHandle}>
              Wyloguj
            </section>
          </>
        ) : (
          <>
            <h2>Zaloguj się do konta</h2>
            <form
              id="loginForm"
              onSubmit={loginToAccount}
              className="container"
            >
              <div className="row">
                <div className="form-group col-12">
                  <label htmlFor="email">Login</label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    placeholder="adres@przyklad.pl"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group col-12">
                  <label htmlFor="password">Hasło</label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    placeholder="********"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <input
                type="submit"
                value="Zaloguj"
                className="btn btn-primary login-button"
              />
            </form>
            <div className="container">
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  resetPassword();
                }}
              >
                {resetPasswordButton}
              </button>
            </div>
          </>
        )}

        {registerForm ? (
          <>
            <h2 className="mt-3">Nie masz konta? Zarejestruj się</h2>
            <form
              id="registerForm"
              onSubmit={registerNewAccount}
              className="container"
            >
              <div className="row">
                <div className="form-group col-sm-12 col-md-6">
                  <label htmlFor="imie">Imię</label>
                  <input
                    type="text"
                    id="imie"
                    className="form-control"
                    placeholder="Imię"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group col-sm-12 col-md-6">
                  <label htmlFor="nazwisko">Nazwisko</label>
                  <input
                    type="text"
                    id="nazwisko"
                    className="form-control"
                    placeholder="Nazwisko"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group col-sm-12 col-md-6">
                  <label htmlFor="emailRegistry">Login</label>
                  <input
                    type="email"
                    id="emailRegistry"
                    className="form-control"
                    placeholder="adres@przyklad.pl"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group col-sm-12 col-md-6">
                  <label htmlFor="passwordRegistry">Hasło</label>
                  <input
                    type="password"
                    id="passwordRegistry"
                    className="form-control"
                    placeholder="********"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group col-sm-12 col-md-6">
                  <label htmlFor="selectranga">Typ konta:</label>
                  <br />
                  <select
                    id="selectranga"
                    className="form-select"
                    value={rank}
                    onChange={(e) => {
                      setRank(e.target.value);
                    }}
                  >
                    <option value="Klient">Klient</option>
                    <option value="Administrator">Administrator</option>
                  </select>
                </div>
                {askForVerify}
              </div>
              <input
                type="submit"
                value="Zarejestruj"
                className="btn btn-success login-button"
              />
            </form>
          </>
        ) : (
          <div className="container mt-3">
            <div className="row">
              <h2 className="text-center">Konto zostało utworzone</h2>
              <img
                src="images/confirm_registry.png"
                alt="Potwierdzenie rejestracji"
                className="confirm-icon"
              ></img>
              <h2 className="text-center">Możesz się teraz zalogować</h2>
            </div>
          </div>
        )}
      </div>

      <div className="opcjeLogowania">
        <h1>Konta DEMO:</h1>
        <section
          className="loginAsButton"
          onClick={() => loginAsDemoAccount("admin@buvi.com", "admin123#")}
        >
          Administrator
        </section>
        <section
          className="loginAsButton"
          onClick={() => loginAsDemoAccount("user1@gmail.com", "qwerty12#")}
        >
          Użytkownik1
        </section>
        <section
          className="loginAsButton"
          onClick={() => loginAsDemoAccount("user2@gmail.com", "jnh@s21331sSA")}
        >
          Użytkownik2
        </section>
        <section
          className="loginAsButton"
          onClick={() => {
            loginAsDemoAccount("user3@gmail.com", "pONdfjkjcz#@!");
          }}
        >
          Użytkownik3
        </section>
      </div>
    </div>
  );
}

export default LoginPage;
