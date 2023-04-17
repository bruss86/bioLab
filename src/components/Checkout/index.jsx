import styles from "./checkout.module.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import CartIcon from "@mui/icons-material/ShoppingCart";
import StorefrontIcon from "@mui/icons-material/Storefront";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useCartContext } from "../../context/CartContext";
import { db } from "../../../DB/firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

const Checkout = () => {
  const { cart, clearCart, sumarTotal, cartCount } = useCartContext();

  const productsRef = collection(db, "orders");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email1, setEmail1] = useState("");
  const [email2, setEmail2] = useState("");
  const [error, setError] = useState([false, false, false, false]);
  const [send, setSend] = useState(false);
  const [activateSend, setActivateSend] = useState(false);

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const checkEmail = () => {
    return email1 === email2 ? true : false;
  };

  const sendOrder = async () => {
    const newOrder = {
      buyer: {
        name: name,
        phone: phone,
        email: email2,
      },
      items: cart.map((item) => ({
        id: item.item.id,
        name: item.item.name,
        price: item.item.price,
        quantity: item.quantity,
      })),
      date: new Date(),
      total: sumarTotal(),
    };
    try {
      //const docRef = setDoc(doc(productsRef), newOrder);
      const docRef = await addDoc(productsRef, newOrder);
      Swal.fire("Pedido enviado!", " ID de compra: " + docRef.id, "success");
      clearCart();
      setSend(false);
    } catch (e) {
      Swal.fire("No se pudo enviar el pedido!", "Error: " + e, "error");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cartCount() === 0) {
      Swal.fire("No hay productos en el carrito!", "Error: " + e, "error");
    } else {
      setError([!name, !phone, !validateEmail(email1), !checkEmail()]);
      if (name && phone && validateEmail(email1) && checkEmail()) {
        setSend(true);
      }
    }
  };

  useEffect(() => {
    if (send) {
      sendOrder();
    }
  }, [send]);

  useEffect(() => {
    if (name && phone && email1 && email2) {
      setActivateSend(true);
    } else {
      setActivateSend(false);
    }
  }, [name, phone, email1, email2]);

  return cartCount() == 0 ? (
    <div className={styles.container}>
      <h1>El carrito está vacío</h1>
      <img
        src="https://firebasestorage.googleapis.com/v0/b/biolab-bd5dc.appspot.com/o/miscellaneous%2Femply_cart.jpg?alt=media&token=f616d7a2-ce74-4574-b987-8992b41b0540"
        alt="Carrito Vacío"
      ></img>
      <div className={styles.button_container}>
        <Button variant="contained" component={Link} to={"/"}>
          Seguir comprando
        </Button>
      </div>
    </div>
  ) : (
    <div className={styles.container}>
      <h1>Ingrese sus datos para finalizar la compra</h1>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "30%" },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div>
          <TextField
            required
            error={error[0]}
            helperText={error[0] ? "Ingrese su nombre" : ""}
            id="name"
            label="Nombre completo"
            fullWidth
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div>
          <TextField
            required
            error={error[1]}
            helperText={error[1] ? "Ingrese un teléfono de contacto" : ""}
            id="phone"
            label="Teléfono"
            fullWidth
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
        </div>
        <div>
          <TextField
            required
            error={error[2]}
            helperText={!error[2] ? "" : "Ingrese un correo válido"}
            id="email1"
            label="E-Mail"
            type="email"
            fullWidth
            value={email1}
            onChange={(e) => {
              setEmail1(e.target.value);
            }}
          />
        </div>
        <div>
          <TextField
            required
            error={error[3] || error[2]}
            helperText={error[3] || error[2] ? "Los correos no coinciden" : ""}
            id="email2"
            label="Repita el E-Mail"
            type="email"
            fullWidth
            value={email2}
            onChange={(e) => {
              setEmail2(e.target.value);
            }}
          />
        </div>
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          component={Link}
          to={"/"}
          color="success"
          endIcon={<StorefrontIcon />}
        >
          Seguir comprando
        </Button>
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          component={Link}
          endIcon={<CartIcon />}
          to={"/cart"}
          color="success"
        >
          Volver al carrito
        </Button>
        <Button
          type="submit"
          variant="contained"
          endIcon={<SendIcon />}
          sx={{ mt: 2 }}
          disabled={!activateSend}
        >
          Enviar Pedido
        </Button>
      </Box>
    </div>
  );
};

export default Checkout;
