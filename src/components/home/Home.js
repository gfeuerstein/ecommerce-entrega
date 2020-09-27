import React, { useEffect, useState } from "react";
import Item from "../item/Item";
import Loader from "react-loader-spinner";
import M from "materialize-css/dist/js/materialize.min.js";
import { useParams, Link } from "react-router-dom";
import ItemList from "../item/ItemList";
import { getFirestore } from "../../firebase";

function ProductList({ products }) {
  return (
    <ul>
      {products.map((p, idx) => (
        <li key={p.id}>
          <Item
            min={p.min}
            max={p.max}
            producName={p.producName}
            productImg={p.productImg}
            productDescription={p.productDescription}
          />
        </li>
      ))}
    </ul>
  );
}

function Home() {
  const { pcat } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  // Ejecutar un hola al inicio
  useEffect(() => {
    const db = getFirestore();

    const itemCollection = db.collection("items"); // Esta es la coleccion que creamos en firebase

    let itemSelectd = pcat
      ? itemCollection.where("categoria", "==", `${pcat}`)
      : itemCollection;

    /* Si seleccionamos todas las categorias la select es itemCollection */
    if (`${pcat}` === "Todas") {
      itemSelectd = itemCollection;
    }

    itemSelectd
      .get()
      .then(
        (result, reject) => {
          // devuelve una Promise
          if (result.size === 0) {
            //debugger;  // Esto para poner un break y debuguear
            return M.toast({
              html: "Item o categoria seleccionada no es válida.",
              classes: "rounded",
            });
          }

          setLoading(false);
          setProducts(
            result.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          ); // Aca seteamos los products
          //debugger; // Esto para poner un break y debuguear
          let a = result.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
          console.log(a);
        },
        (reject) => {
          return M.toast({
            html: "Ha ocurrido un error en la carga de productos",
            classes: "red darken-1 rounded",
          });
        }
      )
      .catch((err) => {
        return M.toast({
          html: "Ha ocurrido un error inesperado",
          classes: "red darken-1 rounded",
        });
      });
  }, [pcat]);

  return (
    <>
      {loading && (
        <p>
          <Loader type="Audio" color="#00BFFF" height={80} width={80} />
        </p>
      )}
      <ItemList products={products} />
    </>
  );
}

export default Home;
