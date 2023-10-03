import {
  TRAER_PRODUCTOS,
  SET_PAGINA,
  BUSCAR_PRUDUCTOS,
  OBTENER_CATEGORIAS,
  FILTER_CATEGORIA,
  AGREGAR_CARRITO,
  QUITAR_CARRITO,
  SET_ORDER,
} from "./actions_types";

const initialState = {
  allProductos: [],
  productosMostrar: [],
  productosEnc: [],
  carrito: [],
  inicioSesion: true,
  currentPage: 1,
  itemsPerPage: 9,
  categorias: [],
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case TRAER_PRODUCTOS:
      return {
        ...state,
        allProductos: payload,
        productosMostrar: payload,
      };

    case SET_PAGINA:
      return {
        ...state,
        currentPage: payload,
      };

    case BUSCAR_PRUDUCTOS:
      console.log([...state.allProductos]);
      const num = Number(payload);
      if (!isNaN(num)) {
        const productoEncontrado = state.allProductos.find(
          (prod) => prod.idProduct === num
        );
        if (!productoEncontrado)
          alert(`No existe el producto con el ID: ${num}`);
        return {
          ...state,
          productosEnc: [productoEncontrado],
          productosMostrar: [productoEncontrado],
        };
      } else {
        const resultado = state.allProductos.filter((producto) =>
          producto.name.toLowerCase().includes(payload.toLowerCase())
        );
        return {
          ...state,
          productosEnc: resultado,
          productosMostrar: resultado,
        };
      }

    case OBTENER_CATEGORIAS:
      return {
        ...state,
        categorias: payload,
      };

    case FILTER_CATEGORIA:
      let filteredProductos = [...state.allProductos];
      let filter;
      filter = filteredProductos.filter((producto) =>
        producto.Category.name.includes(payload)
      );
      return {
        ...state,
        productosMostrar: filter,
        currentPage: 1,
      };

    case SET_ORDER:
      let orderedProductos = [...state.productosMostrar];
      let ordered;
      if (payload === "Ascendente") {
        ordered = orderedProductos.sort((a, b) => a.price - b.price);
      } else if (payload === "Descendente") {
        ordered = orderedProductos.sort((a, b) => b.price - a.price);
      } else {
        ordered = orderedProductos;
      }
      return {
        ...state,
        productosMostrar: ordered,
      };

    case AGREGAR_CARRITO:
      return {
        ...state,
        carrito: [...state.carrito, payload],
      };

    case QUITAR_CARRITO:
      const carritoFiltrado = state.carrito.filter(
        (productos) => productos.idProducto !== payload
      );
      return {
        ...state,
        carrito: carritoFiltrado,
      };

    default:
      return { ...state };
  }
};

export default rootReducer;
