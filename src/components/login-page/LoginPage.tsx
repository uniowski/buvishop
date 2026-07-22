import "./LoginPage.css";
import { useEffect, useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import {
  loginWithEmailAndPassword,
  registerAccount,
  sendResetPasswordEmail,
} from "../../services/authService";

type LoginFormValues = {
  email: string;
  password: string;
};

type RegisterFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  rank: "Klient" | "Administrator";
  accessCodeInput: string;
};

type LoginPageProps = {
  accessCode: string;
  onLogin: (user: { uid: string; email: string }) => void;
  uid: string | null;
  logout: () => void;
  showWelocomeScreen: ReactNode;
  currentEmail: string;
};

function LoginPage({
  accessCode,
  onLogin,
  uid,
  logout,
  showWelocomeScreen,
  currentEmail,
}: LoginPageProps) {
  const [resetPasswordButton, setResetPasswordButton] =
    useState("Zresetuj hasło");
  const [registerForm, setRegisterForm] = useState(true);

  const {
    register: registerLoginField,
    handleSubmit: handleLoginSubmit,
    watch: watchLogin,
    setValue: setLoginValue,
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    register: registerRegisterField,
    handleSubmit: handleRegisterSubmit,
    watch: watchRegister,
    reset: resetRegisterForm,
    setValue: setRegisterValue,
  } = useForm<RegisterFormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      rank: "Klient",
      accessCodeInput: "",
    },
  });

  const selectedRank = watchRegister("rank");

  const loginToAccount = async (data: LoginFormValues) => {
    try {
      const user = await loginWithEmailAndPassword(data.email, data.password);
      onLogin({
        uid: user.uid,
        email: user.email ?? "",
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error("Błąd logowania:", errorMessage);
      alert(errorMessage);
    }
  };

  const registerNewAccount = async (data: RegisterFormValues) => {
    if (data.rank === "Administrator" && data.accessCodeInput !== accessCode) {
      alert("Błędny kod dostępu");
      setRegisterValue("rank", "Klient");
      setRegisterValue("accessCodeInput", "");
      return;
    }

    try {
      await registerAccount({
        firstName: data.firstName,
        email: data.email,
        lastName: data.lastName,
        rank: data.rank,
        password: data.password,
      });

      window.scroll({
        top: 0,
        behavior: "smooth",
      });
      setRegisterForm(false);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error("Błąd rejestracji:", errorMessage);
      alert(errorMessage);
    }

    resetRegisterForm();
  };

  useEffect(() => {
    if (selectedRank === "Administrator") {
      alert(
        "Kod dostępu może być wysłany na pocztę pracowniczą:\n" + accessCode
      );
    }
  }, [selectedRank, accessCode]);

  const loginAsDemoAccount = (email: string, password: string) => {
    logoutHandle();
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
    setLoginValue("email", email);
    setLoginValue("password", password);
  };
  const logoutHandle = () => {
    logout();
  };

  const resetPassword = async () => {
    const loginEmail = watchLogin("email") ?? "";

    if (loginEmail.includes("@") && loginEmail.includes(".")) {
      try {
        await sendResetPasswordEmail(loginEmail);
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
              onSubmit={handleLoginSubmit(loginToAccount)}
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
                    {...registerLoginField("email", { required: true })}
                  />
                </div>
                <div className="form-group col-12">
                  <label htmlFor="password">Hasło</label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    placeholder="********"
                    {...registerLoginField("password", { required: true })}
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
              onSubmit={handleRegisterSubmit(registerNewAccount)}
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
                    {...registerRegisterField("firstName", { required: true })}
                  />
                </div>
                <div className="form-group col-sm-12 col-md-6">
                  <label htmlFor="nazwisko">Nazwisko</label>
                  <input
                    type="text"
                    id="nazwisko"
                    className="form-control"
                    placeholder="Nazwisko"
                    {...registerRegisterField("lastName", { required: true })}
                  />
                </div>
                <div className="form-group col-sm-12 col-md-6">
                  <label htmlFor="emailRegistry">Login</label>
                  <input
                    type="email"
                    id="emailRegistry"
                    className="form-control"
                    placeholder="adres@przyklad.pl"
                    {...registerRegisterField("email", { required: true })}
                  />
                </div>
                <div className="form-group col-sm-12 col-md-6">
                  <label htmlFor="passwordRegistry">Hasło</label>
                  <input
                    type="password"
                    id="passwordRegistry"
                    className="form-control"
                    placeholder="********"
                    {...registerRegisterField("password", { required: true })}
                  />
                </div>
                <div className="form-group col-sm-12 col-md-6">
                  <label htmlFor="selectranga">Typ konta:</label>
                  <br />
                  <select
                    id="selectranga"
                    className="form-select"
                    {...registerRegisterField("rank")}
                  >
                    <option value="Klient">Klient</option>
                    <option value="Administrator">Administrator</option>
                  </select>
                </div>
                {selectedRank === "Administrator" ? (
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
                      {...registerRegisterField("accessCodeInput", {
                        required: selectedRank === "Administrator",
                      })}
                    />
                  </div>
                ) : null}
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
