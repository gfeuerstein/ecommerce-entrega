import React, {useState, useEffect } from 'react';

function getProducto(){

    return [{ id: '200', min:0, max:4, producName:'Dron', productImg:'https://http2.mlstatic.com/drone-holy-stone-hs100-fpv-1080p-120-full-hd-wifi-gps-amv-D_NQ_NP_654946-MLU32030675139_082019-F.webp',productDescription:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae risus felis. Sed eleifend sem eu odio laoreet aliquet. Ut dapibus vel nibh et pellentesque. In eget commodo nisi. Etiam sed molestie ex. "}
           ,{ id: '300', min:0, max:6, producName:'Laptop', productImg:'https://http2.mlstatic.com/notebook-lenovo-intel-15-i3-8va-gen-1tb-12gb-ram-gtia-1-ano-D_NQ_NP_872026-MLU41489122501_042020-F.webp',productDescription:"Pellentesque quis consequat mi, quis auctor sem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae"}
    ];
}


function ItemDetail2(){
    const [productSelect, setProductSelect]=useState();

    useEffect(()=>{

        const products = getProducto();
        const produ = products.find(p => p.id==='200');
        setProductSelect(produ);


    },[])

    return(

    <h1>{productSelect.id}</h1>

    );
}

export default ItemDetail2;