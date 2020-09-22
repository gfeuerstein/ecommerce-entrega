import React, { useEffect, useState } from 'react';
import Item from '../item/Item'
import Loader from 'react-loader-spinner' 
import M from "materialize-css/dist/js/materialize.min.js";
import {useParams, Link} from 'react-router-dom';
import ItemList from '../item/ItemList';
import { getFirestore } from '../../firebase';

/* function Item({min, max, producName, productDescription, productImg})  */

/*
function getFromRemote() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res([{ id: '200', cat: 'Electronica',min:1, max:4, producName:'Dron', productImg:'https://http2.mlstatic.com/drone-holy-stone-hs100-fpv-1080p-120-full-hd-wifi-gps-amv-D_NQ_NP_654946-MLU32030675139_082019-F.webp',productDescription:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae risus felis. Sed eleifend sem eu odio laoreet aliquet. Ut dapibus vel nibh et pellentesque. In eget commodo nisi. Etiam sed molestie ex. ", cantidad: 0}
          ,{ id: '300', cat: 'Electronica',min:1, max:6, producName:'Laptop', productImg:'https://http2.mlstatic.com/notebook-lenovo-intel-15-i3-8va-gen-1tb-12gb-ram-gtia-1-ano-D_NQ_NP_872026-MLU41489122501_042020-F.webp',productDescription:"Pellentesque quis consequat mi, quis auctor sem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae", cantidad: 0}
          ,{ id: '500', cat: 'Juguetes',min:1, max:15, producName:'Spinner', productImg:'https://http2.mlstatic.com/D_NQ_NP_979608-MLU31242775267_062019-V.webp' ,productDescription:"Pellentesque quis consequat mi, quis auctor sem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae", cantidad: 0}
          ,{ id: '501', cat: 'Juguetes',min:1, max:15, producName:'Car', productImg:'https://http2.mlstatic.com/D_NQ_NP_968475-MLU42937140146_072020-V.webp' ,productDescription:"Pellentesque quis consequat mi, quis auctor sem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae", cantidad: 0}
      
      ]);
    }, 2000);
  });
 
}
*/

function ProductList({ products }) {
  return <ul>
    {products.map((p, idx) => <li key={p.id}>
        <Item min={p.min} max={p.max} producName={p.producName} productImg={p.productImg} productDescription={p.productDescription}/>
    </li>)}
  </ul>
}


function ProductsHome({products}){
  return(
      <>
       <ul className="collection">

      {products.map((p, idx) =>

          <li key={p.id} className="collection-item avatar">
              <img src={p.productimg} alt="" className="circle"/>
              <span className="title">{`${p.nombre}`}</span>
               <Link to={`/item/${p.id}`} className ="secondary-content collection-item">
               {/*<a href="#!" className="secondary-content" >*/}
               <i class="material-icons">add_shopping_cart</i>
              
               {/*</a>*/}
               
              </Link>
             
          </li>

      )}

      </ul>
      </>
  );
}

function Home() {
  const{pcat}=useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  // Ejecutar un hola al inicio
  useEffect(() => {

    const db = getFirestore();

    const itemCollection = db.collection('items'); // Esta es la coleccion que creamos en firebase 

    let itemSelectd = pcat ?  itemCollection.where('categoria', '==', `${pcat}`) : itemCollection;

    /* Si seleccionamos todas las categorias la select es itemCollection */
    if(`${pcat}`==='Todas'){
      itemSelectd = itemCollection;
    }
      
    itemSelectd.get().then((result, reject)=>{ // devuelve una Promise 
        if(result.size===0){

          //debugger;  // Esto para poner un break y debuguear 
          return  M.toast( {html: 'No existen items.'}  );

        }

        setLoading(false);
        setProducts(result.docs.map (doc=> ({...doc.data(), id: doc.id }) )); // Aca seteamos los products 
        //debugger; // Esto para poner un break y debuguear 
        let a = result.docs.map (doc=> ({...doc.data(), id: doc.id }) );
        console.log(a);

        

    }, reject => {

      return  M.toast( {html: 'Ha ocurrido un error en la carga de productos'}  );

    }).catch( err => {

      return  M.toast( {html: 'Ha ocurrido un error inesperado'}  );

    });

  }, [pcat]);


  return <>

  { loading && <p><Loader type="Audio" color="#00BFFF" height={80} width={80} /></p>}
     <ItemList products={products} /> 
   
  </>;
}

export default Home;
