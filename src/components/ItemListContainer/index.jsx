import Styles from "./ItemListContainer.module.css";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import ItemList from "../ItemList";
import Button from "@mui/material/Button";
import StorefrontIcon from "@mui/icons-material/Storefront";
import styles from "./ItemListContainer.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDocs, collection, where, query } from "firebase/firestore";
import { db } from "../../../DB/firebase-config";
import { styled } from "@mui/material/styles";

const DIV = styled("div")(({ theme }) => ({
  ...theme.typography.h3,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2),
  margin: theme.spacing(3),
}));

const ItemListContainer = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true); //Por defecto ponemos el spinner

  const productsRef = collection(db, "products");

  const { idCategory } = useParams(); //Cuando no se pasa el id en la ruta, id es undefined

  const getTotalProducts = async () => {
    try {
      const productsSnapshot = await getDocs(productsRef);
      const productsList = productsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProductos(productsList);
      setLoading(false);
    } catch (error) {
      setProductos(null);
    }
  };

  const modifyID = () => {
    return idCategory != undefined ? idCategory.replaceAll("_", " ") : "";
  };

  const getProducts = async () => {
    const idCat = idCategory.replaceAll("_", " "); //Transforma el id de la ruta en el nombre de la categoría

    try {
      const q = query(productsRef, where("category", "==", idCat));
      const productsSnapshot = await getDocs(q);
      const productsList = productsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProductos(productsList);
      setLoading(false);
    } catch (error) {
      setProductos(null);
    }
  };

  useEffect(() => {
    idCategory == undefined ? getTotalProducts() : getProducts();
  }, [idCategory]);

  const carga = () => (
    <Box sx={{ display: "flex" }}>
      <CircularProgress size={80} />
    </Box>
  );

  if (loading) {
    //Si no se cargaron los productos (es null), muestra el spinner
    return <div className={Styles.carga_container}>{carga()}</div>;
  }

  if (productos.length === 0 && loading === false) {
    return (
      <div className={Styles.container}>
        <h1>No se encontraron productos</h1>
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          component={Link}
          to={"/"}
          color="success"
          endIcon={<StorefrontIcon />}
        >
          VOLVER
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <DIV>{modifyID().toUpperCase()}</DIV>
      <ItemList productos={productos} />;
    </div>
  );
};

export default ItemListContainer;
