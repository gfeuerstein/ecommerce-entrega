import React, { useEffect ,useState, Link, useParams } from "react";
import "./App.css";
import NavBar from './components/navbar/NavBar'
import CartIcon from "./components/navbar/CartIcon";
import Home from './components/home/Home';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import ItemList from './components/item/ItemList'
import ItemDetail from "./components/item/ItemDetail";
import {CartContextProvider} from './components/CartContext'
import Cart from './components/Cart'
import OrderList from "./components/orders/OrderList";

function Contenido(){

 return <> <Router>

      <div className="App">
        <div className="row" >
          <div className="col s12 ">
            <NavBar>
              <CartIcon />
            </NavBar> 
          </div>
        </div>
        <div className="row" >
        <div className="col s2 "></div>
        <div className="col s8">
        <Switch>

        <Route path="/" exact>
          <Home />
        </Route>

        <Route path="/Home" exact>
          <Home />
        </Route>
    
        <Route path="/categoria/:pcat" exact>
          {/* <ItemList producName={null} />  */}
          <Home />
        </Route>

        <Route path="/item/:pid">
          
          <ItemDetail />
          
        </Route> 

        <Route path="/cart">

          <Cart />
        
        </Route>    
      
        <Route path="/orders">

          <OrderList />

        </Route>

        </Switch>
        <div className="col s2 "></div>
      
        </div>
        </div>
      </div>


    </Router>
    </>

}

function App() {
/*  const {pid3} =useParams();*/


  return (

      <CartContextProvider>
            
             <Contenido />

      </CartContextProvider>

 
   
  );
}

export default App;
