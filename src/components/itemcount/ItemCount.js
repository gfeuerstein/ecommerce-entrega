import React, { useState, useEffect, Children } from "react";
import M from "materialize-css/dist/js/materialize.min.js";

function ItemCount({ min, max, fnSumaBoton, disable }) {
    const [cant, setCant] = useState(0);
    const [yaCompre, setYaCompre] = useState(false);


    const addCant = () => {

      let aux = cant + 1
      setCant(aux);
      fnSumaBoton(aux);

    };
  
    const removeCant = () => {

      let aux = cant - 1
      setCant(aux );
      fnSumaBoton(aux);
    };

  function BtnCompra({text, fnComprado}) {
    return (
      <button type="button" class="waves-effect waves-light btn blue" 
      disabled={cant < min && yaCompre}
       onClick={fnComprado}
       >
        {text}
      </button>
    );
  }

  function comprado(){
    
    setYaCompre(true);

      return  M.toast({ html: `Compra Agregada Cantidad: ${cant}` });
  }

  return (
    <>
      <div className="row">
        <div>
          <div className="row">
            <div className="col s2 "></div>

            <div className="col s3 " style={{ marginRight: 5 }}>
              <a
                id="mas"
                href="#!"
                class="btn-floating btn-small scale-transition waves-effect waves-light btn"
                onClick={removeCant}
                disabled={!((cant>=min )&& !disable)}
              >
                <i class="material-icons">remove</i>
              </a>
            </div>

            <div className="col s3 " style={{ alignItems: "center" }}>
              <span class="new badge" data-badge-caption="">
                {cant}
              </span>
            </div>

            <div className="col s3 ">
              <a
                id="menos"
                href="#!"
                class="btn-floating btn-small scale-transition waves-effect waves-light btn"
                onClick={addCant}
                disabled={!(cant<max && !disable)} 
              >
                <i class="material-icons">add</i>
              </a>
            </div>
          </div>
          <div className="row">
            <div className="col s12 " style={{ marginLeft: 10 }}>
              {/* <BtnCompra text="Agregar Compra!" fnComprado={comprado} />   */}
              {/* {children}   */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ItemCount;
