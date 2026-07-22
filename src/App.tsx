import "./bootstrap.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StoreOffer from "./components/store-offer/StroreOffer";
import Layout from "./components/layout/Layout";
import Main from "./components/main/Main";
import LoginPage from "./components/login-page/LoginPage";
import Contact from "./components/contact/Contact";
import Cart from "./components/cart/Cart";
import AddShoe from "./components/add-shoe/AddShoe";
import WelcomeScreen from "./components/welcome-screen/WelcomeScreen";
import { useUserSession } from "./hooks/useUserSession";

function App() {
  const accessCode = import.meta.env.VITE_ADMIN_ACCESS_CODE;

  if (!accessCode) {
    throw new Error("Missing required environment variable: VITE_ADMIN_ACCESS_CODE");
  }

  const {
    session,
    userStatus,
    currentUserRank,
    welcomeText,
    hideWelcome,
    handleLogin,
    logout,
  } = useUserSession();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout status={userStatus} currentUserRank={currentUserRank} />
          }
        >
          <Route index element={<Main />}></Route>
          <Route
            path="oferta"
            element={
              <StoreOffer uid={session.uid} currentUserRank={currentUserRank} />
            }
          ></Route>
          <Route path="dodaj" element={<AddShoe />}></Route>
          <Route path="kontakt" element={<Contact />}></Route>
          <Route
            path="koszyk"
            element={<Cart uid={session.uid} currentUserRank={currentUserRank} />}
          ></Route>
          <Route
            path="zaloguj"
            element={
              <LoginPage
                logout={logout}
                accessCode={accessCode}
                showWelocomeScreen={
                  <WelcomeScreen
                    welcomeText={welcomeText}
                    onHide={hideWelcome}
                  />
                }
                onLogin={handleLogin}
                uid={session.uid}
                currentEmail={session.email}
              />
            }
          ></Route>
          <Route
            path="*"
            element={
              <StoreOffer uid={session.uid} currentUserRank={currentUserRank} />
            }
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
