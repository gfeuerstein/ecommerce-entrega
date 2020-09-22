import React, { useEffect, useState } from "react";
import CartIcon from "./CartIcon";
import M from "materialize-css/dist/js/materialize.min.js";
import { Link } from "react-router-dom";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from '../home/Home';
import { getFirestore } from '../../firebase';


function NavBar({children}) {
  const[categories, setCategories]=useState([]);

  useEffect(() => {
    var sidenav = document.querySelectorAll(".sidenav");
    M.Sidenav.init(sidenav, {});

    var collapsible = document.querySelectorAll(".collapsible");
    M.Collapsible.init(collapsible, {});

    const db = getFirestore();

    const itemCollection = db.collection('categorias'); // Esta es la coleccion que creamos en firebase 

    
    
    itemCollection.get().then((result, reject)=>{ // devuelve una Promise 
        if(result.size===0){

          //debugger;  // Esto para poner un break y debuguear 
          return  M.toast( {html: 'No existen Categorias.'}  );

        }

        setCategories(result.docs.map (doc=> ({...doc.data(), id: doc.id }) )); // Aca seteamos los products 

      }, reject => {

      return  M.toast( {html: 'Ha ocurrido un error en la carga de productos'}  );

    }).catch( err => {

      return  M.toast( {html: 'Ha ocurrido un error inesperado'}  );

    });

  }, []);

  return (
    <>
    <div>
      <nav>
        <div className="nav-wrapper indigo lighten-1">
          <a
            href="#"
            data-target="slide-out"
            className="sidenav-trigger show-on-large"
          >
            <i className="material-icons">menu</i>
          </a>
          <div className="container">
          <ul id="nav-mobile" classNameName="right hide-on-med-and-down">
            
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/cart'>Mis Compras</Link>
            </li>

            <li>
              <Link to='/cart' class="brand-logo right">{children}</Link>
            </li>
          </ul>
          </div>
        </div>
      </nav>

      <ul id="slide-out" className="sidenav indigo lighten-4">
        <li>
          <span >Menu</span>
        </li>
       
        <ul className="collapsible indigo lighten-3">
          <li>
            <div class="collapsible-header">
              <i class="material-icons">inbox</i>Categorias
            </div>
            <div class="collapsible-body">
            <ul>
              {categories.map((cat, idx) => 
                              <li key={cat.idx}>
                              <Link to={`/categoria/${cat.name}`} >{cat.name}</Link>                              
                              
                              </li>)}

                            
                  
              
                </ul>
            </div>
          </li>

          <li>
            <div class="collapsible-header">
              <i class="material-icons">inbox</i>Ordenes
            </div>
            <div class="collapsible-body">
            <ul>
                <li key='cat'>
                    <Link to={'/orders'} >Ver Ordenes</Link>

                </li>
                
            </ul>
            </div>
          </li>


          <li>
            <div class="collapsible-header">
              <i class="material-icons">whatshot</i>About
            </div>
            <div class="collapsible-body">
              <span>Lorem ipsum dolor sit amet.</span>
            </div>
          </li>
          <li>
            <div class="collapsible-header">
              <i class="material-icons">settings</i>Configuracion
            </div>
            <div class="collapsible-body">
              <span>Lorem ipsum dolor sit amet.</span>
            </div>
          </li>
        </ul>
      </ul> 
      
    </div>



</>

  );
}

export default NavBar;
