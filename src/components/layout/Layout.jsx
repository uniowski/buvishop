import { Link, Outlet } from "react-router-dom";
import "./Layout.css";
import { useState, useEffect } from "react";
import { FaTimes, FaBars } from "react-icons/fa";

function Layout({ status, currentUserRank }) {
  const [click, setClick] = useState(false);
  const handleClick = () => {
    setClick(!click);
  };
  const closeMenu = () => {
    setClick(false);
  };
  const [menu, setMenu] = useState(<></>);

  useEffect(() => {
    if (currentUserRank != null) {
      if (currentUserRank === "Administrator") {
        setMenu(
          <li>
            <Link to={"/dodaj"} onClick={closeMenu}>
              <p className="nav-item">Dodaj ofertę</p>
            </Link>
          </li>
        );
      } else if (currentUserRank === "Klient") {
        setMenu(
          <>
            <li>
              <Link to={"/koszyk"} onClick={closeMenu}>
                <p className="nav-item">Koszyk</p>
              </Link>
            </li>
            <li>
              <Link to={"/kontakt"} onClick={closeMenu}>
                <p className="nav-item">Kontakt</p>
              </Link>
            </li>
          </>
        );
      }
    } else {
      setMenu(<></>);
    }
  }, [currentUserRank]);

  return (
    <div className="App">
      <nav className="navigationbar">
        <h1>BUVI</h1>

        <div className="hamburger" onClick={handleClick}>
          {click ? (
            <FaTimes size={30} className="primary-font-color" />
          ) : (
            <FaBars size={30} className="primary-font-color" />
          )}
        </div>

        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li>
            <Link to={"/"} onClick={closeMenu}>
              <p className="nav-item">Strona główna</p>
            </Link>
          </li>
          <li>
            <Link to={"/oferta"} onClick={closeMenu}>
              <p className="nav-item">Oferta</p>
            </Link>
          </li>
          {menu}
          <li>
            <Link to={"/zaloguj"} onClick={closeMenu}>
              <div className="nav-item-user userStatus">
                {status ? (
                  <span className="userStatusSpan">{status}</span>
                ) : (
                  <></>
                )}
                <img src="/images/konto.png" alt="konto" />
              </div>
            </Link>
          </li>
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
