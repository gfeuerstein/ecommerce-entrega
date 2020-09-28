import React, { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import { getFirestore } from "../../firebase";
import * as firebase from "firebase/app";
import { Link } from "react-router-dom";
import M from "materialize-css/dist/js/materialize.min.js";


function Order() {
    const [nroOrder, setNroOrder] = useState("");

    const handlerNroOrden = (e) => {
        setNroOrder(e.target.value);
      };
 
  const [sinResultado, setSinResultado] = useState(false);
  const [order, setOrder] = useState(false);
  const [isLoading, setIsLoading] = useState(false);



  const consultarOrder = async (e, nroOrder) => {
    e.preventDefault();
    let noEncontrada= false;

    setIsLoading(true);

    debugger;
    const db = getFirestore();

    const orderSelected = db
      .collection("orders")
      .where(firebase.firestore.FieldPath.documentId(), "==", nroOrder);

    const query = await orderSelected.get();

    if (query.docs.length > 0) {
      setOrder(query.docs[0].data());
    } else {
      //setSinResultado(true);
      noEncontrada=true;
    }

    setIsLoading(false);

    if(noEncontrada){
        return M.toast({
            html: "Nro de orden seleccionada no es válida.",
            classes: "red darken-1 rounded",
          });
    }


  };

  const Totales = () => {
    return (
      <>
        <div className="card indigo lighten-4">
          <div className="card-image waves-effect waves-block waves-light">
            {/* <img className="activator" src="images/office.jpg"/>  */}
          </div>
          <div className="card-content" style={{ height: 100 }}>
            <span className="card-title activator grey-text text-darken-4">
              {`Total $${order.total}`}
              <i className="material-icons right">more_vert</i>
            </span>

          </div>
        </div>
      </>
    );
  };

  const ListProductos = () => {

    return (
      <>
        <ul className="collection">
          {order.items.map((p, idx) => (
            <li key={p.id} className="collection-item avatar">
              <div className="row">
                <div className="col s3">
                  <img
                    src={"../../../assets/images/" + p.productimg}
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

  const ListOrder = () => {
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

        <div>
        <button className="waves-effect waves-light btn-small" onClick={()=>{setOrder(null); setNroOrder(null)}} >
              <i class="material-icons right">search</i>
              Nueva Busqueda
            </button>
        </div>
      </>
    );
  };

  return (
    <>
      {isLoading ? (
        <p>
          <Loader type="Audio" color="#00BFFF" height={80} width={80} />
        </p>
      ) : order ? (
        <ListOrder />
      )
      :(
        <>
        <div>
          <form onSubmit={(e) => consultarOrder(e, nroOrder)}>
            <div className="row">
              <div className="input-field col s7">
                <i className="material-icons prefix">local_offer</i>
                <input
                  id="icon_prefix"
                  type="text"
                  className="validate"
                  required="required"
                  onInput={handlerNroOrden}
                  input={nroOrder}
                ></input>
                <label for="icon_prefix">Nro Orden</label>
              </div>
            </div>
            <button
              className="waves-effect waves-light btn-small"
              /*  onClick={(e) => createOrder(e, cart, total)}*/
            >
             
              <i class="material-icons right">search</i>
              Buscar
            </button>

          </form>
        </div>
      </>
      )
      }
    </>
  );
}

export default Order;
