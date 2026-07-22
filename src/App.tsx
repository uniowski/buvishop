import "./bootstrap.css";
import "./App.css";
import { useState, useEffect, type ReactNode } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StoreOffer from "./components/store-offer/StroreOffer";
import Layout from "./components/layout/Layout";
import Main from "./components/main/Main";
import LoginPage from "./components/login-page/LoginPage";
import Contact from "./components/contact/Contact";
import Cart from "./components/cart/Cart";
import AddShoe from "./components/add-shoe/AddShoe";
import { getUserProfile } from "./services/shopService";

function App() {
  const accessCode = import.meta.env.VITE_ADMIN_ACCESS_CODE;

  if (!accessCode) {
    throw new Error("Missing required environment variable: VITE_ADMIN_ACCESS_CODE");
  }

  const [userStatus, setUserStatus] = useState("");
  const [currentUserRank, setCurrentUserRank] = useState<string | null>(null);
  const [uid, setUid] = useState<string | null>(null);
  const [currentEmail, setCurrentEmail] = useState("");

  const [showWelocomeScreen, setWelocomeScreen] =
    useState<ReactNode>(undefined);
  useEffect(() => {
    if (uid) {
      const ttload = async () => {
        try {
          const userProfile = await getUserProfile(uid);

          if (userProfile) {
            const welcomeSentence =
              "Witaj " + userProfile.firstName + " " + userProfile.lastName;

            setUserStatus(
              userProfile.rank + ": " + userProfile.firstName + " " + userProfile.lastName
            );
            const letters = welcomeSentence
              .split(" ")
              .map((word) => word.split(""));

            setWelocomeScreen(
              <div id="welcomeDiv">
                {letters.map((word, indexa) => (
                  <div className="testerowski" key={indexa}>
                    <p className="fs-1 fs-md-2 fs-lg-3">
                      {word.map((letter, indexb) => (
                        <span className="spanWelcome" key={indexb}>
                          {letter}
                        </span>
                      ))}
                    </p>
                  </div>
                ))}
              </div>
            );

            setCurrentUserRank(userProfile.rank || null);

            setTimeout(() => {
              setWelocomeScreen(undefined);
            }, 2000);
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : String(error);
          console.error("Error getting document:", errorMessage);
        }
      };

      ttload();
    }
  }, [uid]);

  function logout() {
    setUid(null);
  }

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
            element={<StoreOffer uid={uid} currentUserRank={currentUserRank} />}
          ></Route>
          <Route path="dodaj" element={<AddShoe />}></Route>
          <Route path="kontakt" element={<Contact />}></Route>
          <Route
            path="koszyk"
            element={<Cart uid={uid} currentUserRank={currentUserRank} />}
          ></Route>
          <Route
            path="zaloguj"
            element={
              <LoginPage
                logout={logout}
                accessCode={accessCode}
                showWelocomeScreen={showWelocomeScreen}
                onSetUid={setUid}
                uid={uid}
                currentEmail={currentEmail}
                setCurrentEmail={setCurrentEmail}
              />
            }
          ></Route>
          <Route
            path="*"
            element={<StoreOffer uid={uid} currentUserRank={currentUserRank} />}
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
