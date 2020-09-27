import React, { useEffect, useState } from "react";
import { CartContextProvider, useCartContext } from "../components/CartContext";
import { Link, Redirect } from "react-router-dom";
import { getFirestore } from "../firebase";
import * as firebase from "firebase/app";
import "firebase/firestore";
import M from "materialize-css/dist/js/materialize.min.js";
import { unstable_renderSubtreeIntoContainer } from "react-dom";
import Loader from "react-loader-spinner";
/*  import Checkbox from './Checkbox';*/

function Cart() {
  const { cantidad } = useCartContext();
  const { cart, getTotalAmount } = useCartContext();
  const [total, setTotal] = useState(0);
  const [agregarOrden, setAgregarOrden] = useState(false);
  const { idUltimaOrden, setIdUltimaOrden } = useCartContext();
  const [stockOk, setStockOk] = useState(true);
  const [lstProductosSinStock, setLstProductosSinStock] = useState([]);
  const { resetCart } = useCartContext();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("En Cart Principal");
    setTotal(() => getTotalAmount());
  }, []);

  const Totales = () => {
    return (
      <>
        <div className="card indigo lighten-4">
          <div className="card-image waves-effect waves-block waves-light">
            {/* <img className="activator" src="images/office.jpg"/>  */}
          </div>
          <div className="card-content" style={{ height: 100 }}>
            <span className="card-title activator grey-text text-darken-4">
              {`Total $${total}`}
              <i className="material-icons right">more_vert</i>
            </span>

            {/*  <Link to='/home' style={{color:'bule'}} > Agregar orden!</Link> */}
            {/*  <button onClick={()=>createOrder(cart,total)}>Agregar Orden!</button> ESTE ES EL POSTA!*/}
            <p>
              <label>
                <input
                  id="789"
                  type="checkbox"
                  checked={agregarOrden}
                  onChange={() => setAgregarOrden(!agregarOrden)}
                />
                <span style={{ color: "black" }}>Agregar Orden</span>
              </label>
            </p>
          </div>
        </div>
      </>
    );
  };

  const ListProductos = () => {
    const { cart } = useCartContext();

    return (
      <>
        <ul className="collection">
          {cart.map((p, idx) => (
            <li key={p.id} className="collection-item avatar">
              <div className="row">
                <div className="col s3">
                  <img
                    src={"../../assets/images/" + p.productimg}
                    alt=""
                    className="circle"
                  />
                </div>
                <div className="col s3">
                  <span className="title">
                    {" "}
                    <h6>
                      {" "}
                      <b>{`${p.nombre}`}</b>
                    </h6>
                  </span>
                </div>
                <div className="col s3">
                  <span className="title">
                    {<h5>{`$ ${p.cantidad * p.precio}`}</h5>}
                  </span>
                </div>
                <div className="col s3">
                  <span className="title">
                    <span class="new badge" data-badge-caption="">
                      {p.cantidad}
                    </span>
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </>
    );
  };

  const ListProductosSinStock = () => {
    return (
      <>
        <ul className="collection">
          {lstProductosSinStock.map((p, idx) => (
            <li key={p.id} className="collection-item avatar">
              <div className="row">
                <div className="col s3">
                  <img
                    src={"../../assets/images/" + p.productimg}
                    alt=""
                    className="circle"
                  />
                </div>
                <div className="col s5">
                  <span className="title">
                    {" "}
                    <h6>
                      {" "}
                      <b>{`${p.nombre}`}</b>
                    </h6>
                  </span>
                </div>
                <div className="col s4">
                  <span className="title">
                    {<h6>{`Cantidad en Stock: ${p.cantstk}`}</h6>}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </>
    );
  };

  const FormBuyer = () => {
    /*variables formulario*/
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [emailConfirm, setEmailConfirm] = useState("");
    const [telefono, setTelefono] = useState("");
    const { setIdUltimaOrden } = useCartContext();
    const [mailValid, setMailvalid] = useState(true);

    useEffect(() => {
      console.log("En Form Buyer");
    }, []);

    const handlerNombre = (e) => {
      setNombre(e.target.value);
    };

    const handlerEmail = (e) => {
      setEmail(e.target.value);
    };

    const handlerTelefono = (e) => {
      setTelefono(e.target.value);
    };

    const handlerConfEmail = (e) => {
      setEmailConfirm(e.target.value);
    };

    async function actualizarStock() {
      const db = getFirestore();

      /*tomamos los items de la coleccion de firebase que estan en el cart (por id)*/
      const itemsToUpdate = db.collection("items").where(
        firebase.firestore.FieldPath.documentId(),
        "in",
        cart.map((i) => i.id)
      );

      setIsLoading(true);

      const query = await itemsToUpdate.get();
      const batch = db.batch();

      const outOfStock = [];

      query.docs.forEach((docSnapshot, idx) => {
        /*Para cada uno de los items comparamos la cantidad en stock con la cantidad compra*/
        const itemAux = cart.find((i) => i.id === docSnapshot.id);

        if (docSnapshot.data().cantstk >= itemAux.cantidad) {
          batch.update(docSnapshot.ref, {
            cantstk: docSnapshot.data().cantstk - itemAux.cantidad,
          });
        } else {
          outOfStock.push({ ...docSnapshot.data(), id: docSnapshot.id });
        }
      });

      setLstProductosSinStock(outOfStock);

      if (outOfStock.length === 0) {
        /* Si no hay ninguno fuera de stk actualizamos */
        await batch.commit();
      } else {
        /* Seteamos que el stk queda en negativo para que no genere la orden */
        //resetCart(); /* Vaciamos el Cart */
        setStockOk(false);

        //return M.toast( {html: 'Uno o mas items no queda en stock, no se puede realizar orden', classes: 'red darken-1 rounded'}  );
      }
    }

    async function createOrder(e, newOrder, ptotal) {
      e.preventDefault();

      if (email === emailConfirm) {
        let buyerAux = {
          name: nombre,
          phone: telefono,
          email: email,
        };

        const items = cart.map((cartItem) => ({
          nombre: cartItem.nombre,
          precio: cartItem.precio,
          categoria: cartItem.categoria,
          cantidad: cartItem.cantidad,
        }));

        const date = firebase.firestore.FieldValue.serverTimestamp(); //ASI CREAMOS UNA FECHA

        const order = {
          buyer: buyerAux,
          items: items,
          total: ptotal,
          fecha: date,
        };

        const db = getFirestore();
        const orders = db.collection("orders"); // Esta es la coleccion que creamos en firebase

        /*const itemsToUpdate = db.collection('items', 
                                        firebase.firestore.FieldPath.documentId(), 'in', items.map(i=> i.id));
    */

        /* Verificamos Stock y actualizamos */
        await actualizarStock();

        if (stockOk) {
          try {
            const { id } = await orders.add(order);
            setIdUltimaOrden(id);
          } catch (error) {
            console.log(error);
          } finally {
            setIsLoading(false);
          }
        } else {
          setIsLoading(false);
        }
      } /* IF mail confirm ok*/ else {
        /* Cambiamos el stle para remarcar los mails en rojo */
        setMailvalid(false);

        return M.toast({
          html: "Mails deben coincidir para agregar la orden",
          classes: "red darken-1 rounded",
        });
      }
    }

    return (
      <>
        <div>
          <form onSubmit={(e) => createOrder(e, cart, total)}>
            <div className="row">
              <div className="input-field col s8">
                <i className="material-icons prefix">account_circle</i>
                <input
                  id="icon_prefix"
                  type="text"
                  className="validate"
                  required="required"
                  onInput={handlerNombre}
                  input={nombre}
                ></input>
                <label for="icon_prefix">Nombre</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s8">
                <i className="material-icons prefix">email</i>
                <input
                  id="email"
                  required="required"
                  type="email"
                  className={mailValid ? "validate" : "validate invalid"}
                  onInput={handlerEmail}
                  value={email}
                />
                <label for="email">Email</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s8">
                <i className="material-icons prefix">email</i>
                <input
                  id="emailConfirm"
                  required="required"
                  type="email"
                  className={mailValid ? "validate" : "validate invalid"}
                  onInput={handlerConfEmail}
                  value={emailConfirm}
                />
                <label for="emailConfirm">Confirmar Email</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s6">
                <i className="material-icons prefix">phone</i>
                <input
                  id="icon_telephone"
                  required="required"
                  type="tel"
                  className="validate"
                  onInput={handlerTelefono}
                  value={telefono}
                ></input>
                <label for="icon_telephone">Telefono</label>
              </div>
            </div>
            {/*  <button className="waves-effect waves-light btn" onClick={()=>createOrder(cart,total)}>Agregar</button>*/}
            <button
              className="waves-effect waves-light btn"
              /*  onClick={(e) => createOrder(e, cart, total)}*/
            >
              Agregar
            </button>
          </form>
        </div>
      </>
    );
  };

  const ListCart = () => {
    return (
      <>
        <div className="row">
          <div className="col s9">
            <ListProductos />
          </div>

          <div className="col s3">
            <Totales />
          </div>
        </div>
      </>
    );
  };

  const OrdenAgregada = () => {
    const { resetCart } = useCartContext();

    useEffect(() => {
      /*Seteamos en false, para que deje de mostrar el formulario. */
      setAgregarOrden(false);
    }, []);

    return (
      <>
        <h4>
          Se agrego orden Id: <b>{idUltimaOrden}</b>
        </h4>
        <Link to="/home" onClick={() => resetCart()}>
          Sigue Comprando!
        </Link>
      </>
    );
  };

  const OrdenDenegada = () => {
    useEffect(() => {
      /*Seteamos en false, para que deje de mostrar el formulario. */
      setAgregarOrden(false);
    }, []);

    return (
      <>
        <h4>
          No se pudo ingresar orden, los siguientes articulos no alcanza el
          stock para el pedido.
        </h4>

        <ListProductosSinStock />

        <Link to="/home" onClick={() => resetCart()}>
          Vuelve a comprar!
        </Link>
      </>
    );
  };

  return (
    <>
      {isLoading ? (
        <p>
          <Loader type="Audio" color="#00BFFF" height={80} width={80} />
        </p>
      ) : cantidad === 0 ? (
        <p>
          <h3>No hay elementos en el carrito!</h3>{" "}
          <Link to="/home">Haz click para continuar!</Link>
        </p>
      ) : !stockOk ? (
        <OrdenDenegada />
      ) : idUltimaOrden != 0 ? (
        <OrdenAgregada />
      ) : (
        <ListCart />
      )}

      {agregarOrden && <FormBuyer />}
    </>
  );
}

export default Cart;
