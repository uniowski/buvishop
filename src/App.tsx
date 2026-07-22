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
import { getUserProfile, type UserProfile } from "./services/shopService";

type SessionState = {
  uid: string | null;
  email: string;
  profile: UserProfile | null;
};

function App() {
  const accessCode = import.meta.env.VITE_ADMIN_ACCESS_CODE;

  if (!accessCode) {
    throw new Error("Missing required environment variable: VITE_ADMIN_ACCESS_CODE");
  }

  const [session, setSession] = useState<SessionState>({
    uid: null,
    email: "",
    profile: null,
  });

  const [showWelocomeScreen, setWelocomeScreen] =
    useState<ReactNode>(undefined);

  useEffect(() => {
    if (session.uid) {
      const ttload = async () => {
        try {
          const userProfile = await getUserProfile(session.uid);

          if (userProfile) {
            const welcomeSentence =
              "Witaj " + userProfile.firstName + " " + userProfile.lastName;
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

            setSession((prevSession) => ({
              ...prevSession,
              profile: userProfile,
            }));

            setTimeout(() => {
              setWelocomeScreen(undefined);
            }, 2000);
          } else {
            console.log("No such document!");
            setSession((prevSession) => ({
              ...prevSession,
              profile: null,
            }));
          }
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : String(error);
          console.error("Error getting document:", errorMessage);
        }
      };

      ttload();
    }
  }, [session.uid]);

  const userStatus = session.profile
    ? `${session.profile.rank}: ${session.profile.firstName} ${session.profile.lastName}`
    : "";
  const currentUserRank = session.profile?.rank || null;

  function logout() {
    setSession({
      uid: null,
      email: "",
      profile: null,
    });
  }

  function handleLogin(user: { uid: string; email: string }) {
    setSession({
      uid: user.uid,
      email: user.email,
      profile: null,
    });
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
                showWelocomeScreen={showWelocomeScreen}
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
