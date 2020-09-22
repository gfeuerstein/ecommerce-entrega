import React, {useEffect, useState} from "react";
import ItemCount from '../itemcount/ItemCount'
import M from "materialize-css/dist/js/materialize.min.js";
import Loader from 'react-loader-spinner' ;
import {useParams, Link} from 'react-router-dom' 
import {useCartContext, CartContextProvider, CartContext} from '../CartContext'
import { getFirestore } from '../../firebase'

function ItemDetail() {
    const {pid} = useParams();
    const [product, setProduct] = useState();
    const [loading, setLoading] = useState(true);
    const [productoActual, setProductoActual] = useState({});
    const [cantBoton, setCantboton] = useState(0);
    const [compro, setComporo] = useState(false);

    useEffect(() => {
   
      const db = getFirestore();

      const itemCollection = db.collection('items'); // Esta es la coleccion que creamos en firebase 
  
      //let itemSelectd = pcat ?  itemCollection.where('categoria', '==', `${pcat}`) : itemCollection;
      itemCollection.get().then((result, reject)=>{ // devuelve una Promise 

        if(result.size===0){
          return  M.toast( {html: 'No existen item seleccionado.'}  );
        }
        else{
          let lstProducFilter = result.docs.filter( p=> p.id ===`${pid}`);
          let lstProductos = lstProducFilter.map( p => ({...p.data(), id: p.id}));
          setProductoActual(lstProductos[0]);

          if(productoActual){

            if(lstProductos[0].cantstk<1)
            {
              return  M.toast( {html: 'Actualmente no tenemos disponible en stock.'}  );
            }
          }else{
            return  M.toast( {html: 'Producto seleccionado no es válido'}  );
          }

        }
 
      }, reject => {
  
        return  M.toast( {html: 'Ha ocurrido un error en la carga de productos'}  );
  
      }).catch( error => {
        
        console.log(error);
         return  M.toast( {html: 'Producto no válido'}  );
  
      });

      setTimeout(() => {
        setLoading(false);

      }, 500)
     
      
    }, [pid]);
 
    function btmSumarCont(cantidad){

      if(cantidad<=productoActual.cantstk && cantidad>=productoActual.mincompra){
        setCantboton(cantidad);
      }
    }

    function BtnCompra({texto}) {
      const { addCart, cantidad, setCantidad} = useCartContext();

      
            function fnBotonOnclik(){

              console.log('Producto actual: ');
              console.log(productoActual);
              productoActual.cantidad = cantBoton;
              addCart(new Object(productoActual));
              setComporo(true);

              /* sumamos la cantidad del carrito */
              let cantAux = cantidad;
              setCantidad(cantAux+cantBoton);
  
              return  M.toast({ html: `Compra Agregada (${cantBoton})` });
            }

      return (
        <button value={cantBoton} type="button" class="waves-effect waves-light btn blue" onClick={fnBotonOnclik} disabled={!(!compro && productoActual.cantstk>0)}>
          {`Agregar Cant: ${cantBoton}`}
        </button>
      );
    }




  return (
    <>
            { loading ? <p><Loader type="Audio" color="#00BFFF" height={80} width={80} /></p>
            : /*HASTA QUE NO CARGUE EL ITEM NO TRAEMOS LA DATA  */
            !productoActual ? <h2>Producto no existe</h2>
            :
            <>

            
            <div className="row">

            <div className="col s12 m7" >
            <h2 className="header">{productoActual.nombre}</h2> {/*  */}
            <div className="card horizontal">
                <div className="card-image">
                <img src={productoActual.productimg} alt="" style={{resize:'inline'}}/>
                </div>
                <div className="card-stacked">
                <div className="card-content">
                  <p>
                   <h5> { `Precio $ ${productoActual.precio}`}</h5>
                  </p>
                    <p>
                    {productoActual.descripcion}
                    </p>
                </div>
                <div className="card-action">

                <ItemCount  fnSumaBoton={btmSumarCont}  min={productoActual.mincompra} max={productoActual.cantstk} disable={compro} />

                <BtnCompra min={productoActual.mincompra} max={productoActual.cantstk}></BtnCompra>

                </div>
                </div>
                
            </div>
            </div>
            </div>

            <div className="row">
              <div className="col s12 m7" >
                <span class="new badge pink" data-badge-caption="">
                  <Link to='/home' style={{color:'white'}} > Sigue Comprando!</Link> 
                </span>
              </div>
            </div>
            
            </>
            
            
            
            
            }
           

    </>
  );
}

export default ItemDetail;