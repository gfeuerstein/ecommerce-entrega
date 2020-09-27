import React, {useState, useEffect} from 'react';
import { Link} from 'react-router-dom';

/* '../../../public/assets/images/dron.png' */

function ItemList({products}){

    return(
        <>
         <ul className="collection">

        {products.map((p, idx) =>

            <li key={p.id} className="collection-item avatar">
                <img src={'../../assets/images/' + p.productimg} alt="" className="circle"/>
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

export default ItemList;