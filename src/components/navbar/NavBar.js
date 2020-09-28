import React, { useEffect, useState } from "react";
import CartIcon from "./CartIcon";
import M from "materialize-css/dist/js/materialize.min.js";
import { Link, NavLink } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../home/Home";
import { getFirestore } from "../../firebase";

function NavBar({ children }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    var sidenav = document.querySelectorAll(".sidenav");
    M.Sidenav.init(sidenav, {});

    var collapsible = document.querySelectorAll(".collapsible");
    M.Collapsible.init(collapsible, {});

    const db = getFirestore();

    const itemCollection = db.collection("categorias").orderBy("name", "asc"); // Esta es la coleccion que creamos en firebase

    itemCollection
      .get()
      .then(
        (result, reject) => {
          // devuelve una Promise
          if (result.size === 0) {
            //debugger;  // Esto para poner un break y debuguear
            return M.toast({
              html: "No existen Categorias.",
              classes: "red darken-1 rounded",
            });
          }

          setCategories(
            result.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          ); // Aca seteamos los products
        },
        (reject) => {
          return M.toast({
            html: "Ha ocurrido un error en la carga de productos",
            classes: "red darken-1 rounded",
          });
        }
      )
      .catch((err) => {
        return M.toast({
          html: "Ha ocurrido un error inesperado",
          classes: "red darken-1 rounded",
        });
      });

    const style = {
      borderColor: "red",
    };
  }, []);

  const divStyle = {
    color: "red",
  };

  return (
    <>
      <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper indigo lighten-1">
            <Link
              to="#"
              data-target="slide-out"
              className="sidenav-trigger show-on-large"
            >
              <i className="material-icons">menu</i>
            </Link>
            <div className="container">
              <ul id="nav-mobile" classNameName="right hide-on-med-and-down">
                <li>
                  <NavLink to="/">Home</NavLink>
                </li>
                <li>
                  <Link to={"/orders"}> Ordenes</Link>
                </li>
                
                {/* <li>
                  <Link to="/cart">Cart</Link>
                </li>
                 */}

                <li>
                  <Link
                    to="/cart"
                    className="brand-logo right"
                    style={{ marginRight: 30 }}
                  >
                    {children}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>

      <ul id="slide-out" className="sidenav indigo lighten-4">
        <li>
          <span>Menu</span>
        </li>

        <ul className="collapsible indigo lighten-3">
          <li>
            <div class="collapsible-header">
              <i class="material-icons">inbox</i>Categorias
            </div>
            <div class="collapsible-body">
              <ul>
                {categories.map((cat, idx) => (
                  <li key={cat.idx}>
                    <NavLink to={`/categoria/${cat.name}`}>{cat.name}</NavLink>
                  </li>
                ))}

                {/* Agregamos categoria sin filtro */}
                <li key="todas">
                  <NavLink to={`/categoria/Todas`}>Todas</NavLink>
                </li>
              </ul>
            </div>
          </li>

          <li>
            <div class="collapsible-header">
              <i class="material-icons">local_offer</i>Ordenes
            </div>
            <div class="collapsible-body">
              <ul>
                <li key="cat">
                  <Link to={"/orders"}>Buscar Ordenes</Link>
                </li>
              </ul>
            </div>
          </li>

          <li>
            <div class="collapsible-header">
              <i class="material-icons">add_shopping_cart</i>Cart
            </div>
            <div class="collapsible-body">
              <ul>
                <li key="cat">
                  <Link to={"/cart"}>Compra Actual</Link>
                </li>
              </ul>
            </div>
          </li>


          {/* 
          <li>
            <div class="collapsible-header">
              <i class="material-icons">settings</i>Configuracion
            </div>
            <div class="collapsible-body">
              <span>Disponible en próxima versión.</span>
            </div>
          </li>
           */}
        </ul>
      </ul>
    </>
  );
}

export default NavBar;
