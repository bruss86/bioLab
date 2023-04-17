import styles from "./itemdetail.module.css";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Swal from "sweetalert2";
import { useCartContext } from "../../context/CartContext";
import { useState } from "react";
import { Link } from "react-router-dom";

const ItemDetail = ({ product }) => {
  const { addItem } = useCartContext();

  const [cantidad, setCantidad] = useState(1);

  const resta = () => {
    const auxiliar = cantidad - 1;
    if (auxiliar >= 1) {
      setCantidad(auxiliar);
    } else {
      setCantidad(1);
    }
  };

  const agregarAlCarrito = () => {
    addItem(product, cantidad);
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1000,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "success",
      title: "Se agrego el producto al carrito correctamente",
    });
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        margin: "auto",
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1A2027" : "#e5e5e5",
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <img src={product.image_url} alt={product.name} height={400} />
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="h4" component="div">
                <b>{product.name}</b>
              </Typography>
              <Typography variant="h6" gutterBottom>
                <b>Descripción:</b> {product.description}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                <b>Fabricante:</b> {product.manufacturer}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                <b>Precio (U$S):</b> {product.price}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                <b>Categoría:</b> {product.category}
              </Typography>
            </Grid>
            <Grid item>
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
                  sx={{ width: 80 }}
                  value={cantidad}
                  disabled={true}
                />
                <Button variant="outlined" size="large" onClick={resta}>
                  -
                </Button>
              </div>
              <div>
                <Button
                  variant="contained"
                  size="large"
                  onClick={agregarAlCarrito}
                >
                  Agregar al carrito
                </Button>
              </div>
              <div className={styles.button_container}>
                <Button
                  variant="contained"
                  component={Link}
                  to={"/"}
                  color="success"
                >
                  Volver
                </Button>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ItemDetail;
