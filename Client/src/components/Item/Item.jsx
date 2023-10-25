import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Item.css";

function Item({ producto, handleDeleteProduct, handleActiveProduct }) {
  const { idProduct, name, stock, price, active, Category } = producto;

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div className="products-row">
      <div className="product-cell ">
        <span>{name}</span>
      </div>
      <div className="product-cell">
        <span>{Category.name}</span>
      </div>
      {active ? (
        <div className="product-cell ">
          <span className="status active">Activo</span>
        </div>
      ) : (
        <div className="product-cell ">
          <span className="status disabled">No Activo</span>
        </div>
      )}

      <div className="product-cell ">{stock}</div>
      <div className="product-cell ">
        <span className="cell-label">${price}</span>
      </div>
      <div className="product-cell edit">
        <Link to={`/detalleAdmin/${idProduct}`}>
          <div>Editar</div>
        </Link>
      </div>
      <div className="product-cell ">
        {/* <button
          className="buttonEliminar"
          onClick={() => {
            handleDeleteProduct(idProduct);
          }}
        >
          Activar
        </button> */}
        {active ? (
          <input
            onChange={handleCheckboxChange}
            onClick={() => {
              handleActiveProduct(idProduct, active);
            }}
            type="checkbox"
            id="scales"
            name="scales"
            checked
          />
        ) : (
          <input
            onChange={handleCheckboxChange}
            onClick={() => {
              handleActiveProduct(idProduct, active);
            }}
            type="checkbox"
            id="scales"
            name="scales"
            checked={isChecked}
          />
        )}
      </div>
      <div className="product-cell ">
        <button
          className="buttonEliminar"
          onClick={() => {
            handleDeleteProduct(idProduct, active);
          }}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default Item;