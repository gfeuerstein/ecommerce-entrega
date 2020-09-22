import React, { Component, useEffect, useState } from 'react';
import Item from "../components/item/Item"
import Loader from 'react-loader-spinner' 


/* function Item({min, max, producName, productDescription, productImg})  */

function getFromRemote() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res([{ id: 200, min:0, max:4, producName:'Dron', productImg:'https://http2.mlstatic.com/drone-holy-stone-hs100-fpv-1080p-120-full-hd-wifi-gps-amv-D_NQ_NP_654946-MLU32030675139_082019-F.webp',productDescription:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae risus felis. Sed eleifend sem eu odio laoreet aliquet. Ut dapibus vel nibh et pellentesque. In eget commodo nisi. Etiam sed molestie ex. "}
          ,{ id: 300, min:0, max:6, producName:'Laptop', productImg:'https://http2.mlstatic.com/notebook-lenovo-intel-15-i3-8va-gen-1tb-12gb-ram-gtia-1-ano-D_NQ_NP_872026-MLU41489122501_042020-F.webp',productDescription:"Pellentesque quis consequat mi, quis auctor sem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae"}
      
      ]);
    }, 2000);
  });
 
}

function ProductList({ products }) {
  return <ul>
    {products.map((p, idx) => <li key={p.id}>
        <Item min={p.min} max={p.max} producName={p.producName} productImg={p.productImg} productDescription={p.productDescription}/>
    </li>)}
  </ul>
}

function Home2() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  // Ejecutar un hola al inicio
  useEffect(() => {
    console.log('Hola');
    getFromRemote().then(res => {
      setProducts(res); // Set state -> Render
      setLoading(false); // Set state -> Render
    });
  }, []);


  return <>
  { loading && <p><Loader type="Audio" color="#00BFFF" height={80} width={80} /></p>}
  <ProductList products={products}></ProductList>
  </>;
}

function App2() {
  return <Home2 />
}


export default App2;