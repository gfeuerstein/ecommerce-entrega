import React from "react";
import ItemCount from '../itemcount/ItemCount'

function Item({min, max, producName, productDescription, productImg}) {
  return (
    <>
      <div className="row">
        <div className="col s12 m7" >
          <h2 className="header">{producName}</h2>
          <div className="card horizontal">
            <div className="card-image">
              <img src={productImg} alt="" style={{resize:'inline'}}/>
            </div>
            <div className="card-stacked">
              <div className="card-content">
                <p>
                 {productDescription}
                </p>
              </div>
              <div className="card-action">
              <ItemCount min={min} max={max} />
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Item;
