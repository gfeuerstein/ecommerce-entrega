import React, {useEffect, useState} from 'react';
import { getFirestore } from '../../firebase';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner'; 
import M from "materialize-css/dist/js/materialize.min.js";

function OrderList(){
  const[lstOrdenes, setLstOrdenes] = useState([]);
  const[loading, setLoading] = useState(true);

  function getOrders(){

    const db = getFirestore();
    const orders = db.collection('orders');

    let ordersAux = []

    orders.get().then((result, reject)=>{ // devuelve una Promise 
      if(result.size===0){

        //debugger;  // Esto para poner un break y debuguear 
        return  M.toast( {html: 'No existen Ordenes.'}  );

      }

      setLoading(false);
      setLstOrdenes(result.docs.map (doc=> ({...doc.data(), id: doc.id }) )); // Aca seteamos los products 
      //debugger; // Esto para poner un break y debuguear 
      let a = result.docs.map(doc=> ({...doc.data(), id: doc.id }) );
      console.log(a);

      

  }, reject => {

    return  M.toast( {html: 'Ha ocurrido un error en la carga de productos'}  );

  }).catch( err => {

    return  M.toast( {html: 'Ha ocurrido un error inesperado'}  );

  });


    
    /*
    try {

      debugger;
      ordersAux = await ordersCollection.get();
      setLoading(false);

    } catch (error) {
      console.log(error);
    }finally{

      debugger;
      console.log('Orders Aux: ');
      console.log(ordersAux.docs[0]);
    }

    debugger;
    setLstOrdenes(ordersAux.docs.map( o => ({...o.data(), id: o.id})));
    const prueba = ordersAux.docs.map( o => ( { id: o.id} ));

    console.log(prueba);
    */
  }

  useEffect(()=>{
    /*Obtenemos Ordenes de firebase */
    getOrders();
  },[])

  const ListOrders = () => {
  
    return (
      <>
  
         <ul className="collection">
          {lstOrdenes.map((p, idx) => (
            <li key={p.id} className="collection-item avatar">
              <div className="row">
                {/*  <div className="col s3">
                  <img src={p.productimg} alt="" className="circle" />
                </div>*/}
                <div className="col s3">
                  <span className="title"> <h5> <b>{`${p.buyer.name}`}</b></h5></span>
                </div>
                <div className="col s3">
                  <span className="title">
                  { <h5>{`$ ${p.total}`}</h5>}
                  </span>
                </div>
                <div className="col s3">
                  <span className="title">
                    <span class="new badge" data-badge-caption="">
                      {p.id}
                    </span>
                   </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
  
  
      </>
    );
   
  
  }



  return (
    <>
      { loading && <p><Loader type="Audio" color="#00BFFF" height={80} width={80} /></p>}
      <ListOrders />

    </>
  );




}

export default OrderList;