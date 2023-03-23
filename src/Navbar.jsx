import { useState } from "react";
import { Link } from "react-router-dom";

import "./CSS/Navbar.css";

let Navbar = () => {
  let [select, setSelect] = useState("");

  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark  bg-dark">
        <div class="container-fluid">
          <Link
            class="navbar-brand"
            to="/"
            onClick={() => {
              setSelect("");
            }}
          >
            City Bike NYC
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse ms-4" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <Link
                  class={`${select === "Feature" ? "active" : ""} nav-link`}
                  aria-current="page"
                  to="./feature"
                  onClick={() => {
                    setSelect("Feature");
                  }}
                >
                  Feature
                </Link>
              </li>
              <li class="nav-item">
                <Link
                  class={`${select === "Search" ? "active" : ""} nav-link`}
                  to="../search"
                  onClick={() => {
                    setSelect("Search");
                  }}
                >
                  Search
                </Link>
              </li>
              <li class="nav-item">
                <Link
                  class={`${select === "Pricing" ? "active" : ""} nav-link`}
                  to="../pricing"
                  onClick={() => {
                    setSelect("Pricing");
                  }}
                >
                  Pricing
                </Link>
              </li>
              <li class="nav-item">
                <Link
                  class={`${select === "Login" ? "active" : ""} nav-link`}
                  to="../login"
                  onClick={() => {
                    setSelect("Login");
                  }}
                >
                  Login
                </Link>
              </li>
              <li class="nav-item">
                <Link
                  class={`${select === "About" ? "active" : ""} nav-link`}
                  to="../about"
                  onClick={() => {
                    setSelect("About");
                  }}
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
