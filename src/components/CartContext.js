import React, { useContext, useState, useEffect, useDebugValue } from "react";

export const CartContext = React.createContext();

export const useCartContext = () => useContext(CartContext);

export function CartContextProvider({ initialValue = [], children }) {
  const [cart, setCart] = useState(initialValue);
  const [cantidad, setCantidad] = useState(0);
  const [idUltimaOrden, setIdUltimaOrden] = useState(0);

  function getCantItems(arrayItems) {
    let aux = 0;

    console.log("antes andtews");
    arrayItems.forEach((p) => {
      console.log("antes");
      console.log(aux);

      aux = Number(aux) + Number(p.cantidad);

      console.log(aux);
    });

    setCantidad(Number(aux));

    return Number(aux);
  }

  /*Dejamos el carrito limpio*/
  function resetCart() {
    setCantidad(0);
    setCart([]);
    setIdUltimaOrden(0);
  }

  function addCart(newItem) {
    //const cartSession = sessionStorage.getItem('cart') || []; /*Aca levanto del storage*/
    // const cartSessionAux = [...cartSession, newItem];

    //const itemsAux = [...cart, newItem];
    setCart([...cart, newItem]);

    //const cantAux = ()=> getCantItems(itemsAux);

    //sessionStorage.setItem('cart', cartSessionAux);
    console.log("insertando producto");
  }

  function getCartItems() {
    /* Esta no la utilizo... */
    const cartItems = sessionStorage.getItem("cart");

    return cartItems;
  }

  /*  cart.reduce((prev, e) => prev + e.cantidad*e.precio, 0)*/

  function getTotalAmount() {
    let precioTotal = 0;

    cart.forEach((e) => {
      precioTotal = precioTotal + e.cantidad * e.precio;
    });

    return precioTotal;
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addCart,
        getCartItems,
        cantidad,
        setCantidad,
        getTotalAmount,
        idUltimaOrden,
        setIdUltimaOrden,
        resetCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
