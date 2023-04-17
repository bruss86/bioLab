import ItemDetail from "../ItemDetail";
import styles from "./itemdetailcontainer.module.css";
import Button from "@mui/material/Button";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { useCartContext } from "../../context/CartContext";
import { collection, getDoc, doc } from "firebase/firestore";
import { db } from "../../../DB/firebase-config";
import { Link } from "react-router-dom";

const ItemDetailContainer = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  const getProduct = async () => {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setProduct({ id: id, ...docSnap.data() });
      setLoading(false);
    } else {
      // doc.data() will be undefined in this case
      setLoading(false);
      setProduct(null);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const carga = () => (
    <Box sx={{ display: "flex" }}>
      <CircularProgress size={80} />
    </Box>
  );

  if (loading) {
    //Si no se cargaron los productos (es null), muestra el spinner
    return <div className={styles.carga_container}>{carga()}</div>;
  }

  if (!product) {
    return (
      <div className={styles.container}>
        <h1>Producto no encontrado</h1>
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
      <ItemDetail product={product} />
    </div>
  );
};

export default ItemDetailContainer;
