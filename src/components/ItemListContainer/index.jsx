import Item from "../Item";
import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Styles from "./ItemListContainer.module.css";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const ItemListContainer = () => {
  const [productos, setProductos] = useState({});
  const [loading, setLoading] = useState(true);

  const { id } = useParams(); //Cuando no se pasa el id en la ruta, id es undefined
  const getProducts = async () => {
    try {
      const res = await fetch("../public/productos.json");
      const data = await res.json();
      productSelect(data, id);

      //console.log("Productos", data);
    } catch (error) {
      setProductos(null);
    }
  };

  const productSelect = (data, id) => {
    if (id != undefined) {
      const idm = id.replaceAll("_", " "); //Transforma el id de la ruta en el nombre de la categoría

      const productosFiltrados = data.filter(
        (producto) => producto.category === idm
      );
      setProductos(productosFiltrados);
      setLoading(false);
    } else {
      //Si no se pasa el id en la ruta, muestra todos los productos
      setProductos(data);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const Elemento = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const carga = () => (
    <Box sx={{ display: "flex" }}>
      <CircularProgress size={80} />
    </Box>
  );

  if (productos.length === 0) {
    return (
      <div className={Styles.container}>
        <img
          src="../public/assets/images/fuera_de_stock.jpg"
          alt="no hay productos"
          border="0"
        />
      </div>
    );
  }

  if (!productos) {
    return <Navigate to="/404" />;
  }

  if (loading) {
    //Si no se cargaron los productos (es null), muestra el spinner
    return <div className={Styles.carga_container}>{carga()}</div>;
  }

  return (
    <div className={Styles.container}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <>
            {productos.map((producto) => (
              <Grid item xs={12} sm={3} key={producto.id}>
                <Item key={producto.id} producto={producto} />
              </Grid>
            ))}
          </>
        </Grid>
      </Box>
    </div>
  );
};

export default ItemListContainer;
