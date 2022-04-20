import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../images/logo-app.png";

export const NavBar = () => {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  return (
    <>
      <header className="header">
        <div className="container">
          <img
            className="container__img"
            src={logo}
            alt="Logo de la aplicación"
          />
        </div>

        <nav className="header__navegation">
          <div className="header__icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className="nav" className={click ? "nav active" : "nav"}>
            <li className="nav__item">
              <NavLink
                to="/vocabulary"
                className={({ isActive }) =>
                  `nav__links ${isActive ? "nav__links--active" : ""}`
                }
              >
                Vocabulary
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink
                to="/activity"
                className={({ isActive }) =>
                  `nav__links ${isActive ? "nav__links--active" : ""}`
                }
              >
                Actividad
              </NavLink>
            </li>

            <li className="nav__item">
              <a className="nav__links" href="#">
                {" "}
                Nosotros
              </a>
            </li>

            <li className="nav__item">
              <a className="nav__links" href="#">
                {" "}
                Contacto
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};
