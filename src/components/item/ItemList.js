import React, {useState, useEffect} from 'react';
import { Link} from 'react-router-dom';


function getFromRemote(){
    return new Promise((res, rej) => {

        setTimeout(()=>{
            res([{ id: '200', cat: 'Electronica',min:1, max:4, producName:'Dron', productImg:'https://http2.mlstatic.com/drone-holy-stone-hs100-fpv-1080p-120-full-hd-wifi-gps-amv-D_NQ_NP_654946-MLU32030675139_082019-F.webp',productDescription:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae risus felis. Sed eleifend sem eu odio laoreet aliquet. Ut dapibus vel nibh et pellentesque. In eget commodo nisi. Etiam sed molestie ex. ", cantirad: 0}
            ,{ id: '300', cat: 'Electronica',min:1, max:6, producName:'Laptop', productImg:'https://http2.mlstatic.com/notebook-lenovo-intel-15-i3-8va-gen-1tb-12gb-ram-gtia-1-ano-D_NQ_NP_872026-MLU41489122501_042020-F.webp',productDescription:"Pellentesque quis consequat mi, quis auctor sem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae", cantirad: 0}
            ,{ id: '500', cat: 'Juguetes',min:1, max:15, producName:'Spinner', productImg:'https://http2.mlstatic.com/D_NQ_NP_979608-MLU31242775267_062019-V.webp',productDescription:"Pellentesque quis consequat mi, quis auctor sem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae", cantirad: 0}
            ,{ id: '501', cat: 'Juguetes',min:1, max:15, producName:'Car', productImg:'https://http2.mlstatic.com/D_NQ_NP_968475-MLU42937140146_072020-V.webp',productDescription:"Pellentesque quis consequat mi, quis auctor sem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae", cantirad: 0}
            ]);
        },1000)

    })

}


function ItemList({products}){

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

export default ItemList;