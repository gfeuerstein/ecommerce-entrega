import React from "react";
import { useCartContext } from "../CartContext";

function CartIcon() {
  const { cart, cantidad } = useCartContext();

  const realizarCompra = () => {
    //alert("Haciendo Compra!");
  };

  return (
    <div className="row s3">
      <div className="col s3 offset-s2">
        <i className="brand-logo right material-icons" onClick={realizarCompra}>
          add_shopping_cart
        </i>
      </div>

      <div className="col s3">
        <i className="new badge" data-badge-caption="">
          {!cart ? 0 : Number(cantidad)}
        </i>
      </div>
    </div>
  );
}

export default CartIcon;
