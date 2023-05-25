import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBell } from "@fortawesome/free-solid-svg-icons";
const Navbar = () => {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const getCartItems = async () => {
      await fetch("http://localhost:5000/api/cart")
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setCart(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getCartItems();
  }, []);

  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark row p-3">
        <div className="navbar-brand col-sm-1">
          <a href="/">
            <img height={60} src="logo192.png" alt="GiftShop" />
          </a>
        </div>
        <div className="collapse navbar-collapse col-sm-6" id="navbarCollapse">
          <div className="navbar-nav col-sm-8 m-auto">
            <div className="input-group">
              <input
                className="form-control flex-grow-1"
                type="search"
                placeholder="Enter items name"
                aria-label="Search"
              ></input>
              <div className="input-group-append">
                <button className="btn btn-outline-success" type="submit">
                  <FontAwesomeIcon
                    icon={faSearch}
                    style={{ fontSize: "25px" }}
                  />
                  &nbsp; Search
                </button>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center">
            <Link to="/cart">
              <FontAwesomeIcon
                icon="fas fa-shopping-cart"
                style={{ fontSize: "25px" }}
              />
              {cart.length > 0 ? (
                <span className="badge rounded-pill badge-notification bg-danger">
                  {cart.reduce(
                    (accumulator, item) => accumulator + item.count,
                    0
                  )}
                </span>
              ) : null}
            </Link>

            <Link to="/notifications">
              <FontAwesomeIcon
                icon={faBell}
                shake={false}
                style={{ fontSize: "25px" }}
              />
              <span className="badge rounded-pill badge-notification bg-danger">
                1
              </span>
            </Link>
            <div className="dropdown">
              <a
                className="nav-link dropdown-toggle d-flex align-items-center hidden-arrow"
                href="#"
                id="navbarDropdownMenuAvatar"
                role="button"
                data-bs-toggle="dropdown"
                data-mdb-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="images/user.png"
                  className="rounded-circle"
                  height="25"
                  loading="lazy"
                />
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdownMenuAvatar"
              >
                <li>
                  <Link
                    className="dropdown-item"
                    to="http://localhost:5000/getUserData"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/">
                    Orders
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/">
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
