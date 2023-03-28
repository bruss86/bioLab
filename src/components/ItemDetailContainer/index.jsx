import { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import Styles from "./ItemDetailContainer.module.css";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import TextField from "@mui/material/TextField";
import { Box, CircularProgress } from "@mui/material";

const ItemDetailContainer = () => {
  const [producto, setProducto] = useState({});
  const [loading, setLoading] = useState(true);
  const [cantidad, setCantidad] = useState(0);

  const { id } = useParams();

  const getProducts = async () => {
    try {
      const res = await fetch("../public/productos.json");
      const data = await res.json();
      productSelect(data, id);

      //console.log("Productos", data);
    } catch (error) {
      setProducto(null);
    }
  };

  const productSelect = (data, id) => {
    if (id != undefined) {
      const productoFiltrado = data.filter((producto) => producto.id == id);
      setProducto(productoFiltrado);
      setLoading(false);
    } else {
      setProducto(data);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const carga = () => (
    <Box sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>
  );

  if (!producto) {
    return <Navigate to="/404" />;
  }

  if (loading) {
    //Si no se cargaron los productos (es null), muestra el spinner
    return <div className={Styles.carga_container}>{carga()}</div>;
  }

  const resta = () => {
    const auxiliar = cantidad - 1;
    if (auxiliar >= 0) {
      setCantidad(auxiliar);
    } else {
      setCantidad(0);
    }
  };

  return (
    <div className={Styles.container}>
      {producto.map((producto) => (
        <div key={producto.id}>
          <h2>{producto.name}</h2>
          <img src={producto.image_url} alt={producto.name} />
          <h3>
            <b>Descripción:</b> {producto.description}
          </h3>
          <h3>
            <b>Fabricante:</b> {producto.manufacturer}
          </h3>
          <h3>
            <b>Precio (U$S):</b> {producto.price}
          </h3>
          <h3>
            <b>Categoría:</b> {producto.category}
          </h3>
        </div>
      ))}

      <div>
        <Button
          variant="outlined"
          size="large"
          onClick={() => {
            setCantidad(cantidad + 1);
          }}
        >
          +
        </Button>
        <TextField
          id="outlined-basic"
          variant="outlined"
          size="small"
          type="text"
          value={cantidad}
          disabled={true}
        />
        <Button variant="outlined" size="large" onClick={resta}>
          -
        </Button>
      </div>
      <div>
        <Button variant="contained" size="large" href="#">
          Agregar al carrito
        </Button>
      </div>
    </div>
  );
};

export default ItemDetailContainer;
