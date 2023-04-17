import styles from "./cart.module.css";
import { useCartContext } from "../../context/CartContext";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";
import { BsTrashFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { TextField } from "@mui/material";
import Stack from "@mui/material/Stack";
import Swal from "sweetalert2";

function createData(id, quantity, description, unitPrice, totalP, deleteItem) {
  return { id, quantity, description, unitPrice, totalP, deleteItem };
}

const Cart = () => {
  const { cart, removeItem, clearCart, sumarTotal, addItem, updateURLImage } =
    useCartContext();

  const buttons = [
    <Button key="one" component={Link} to={"/"}>
      Seguir comprando
    </Button>,
    <Button key="two" component={Link} to={"/checkout"}>
      Finalizar compra
    </Button>,
    <Button key="three" onClick={() => clearCart()}>
      Vacíar carrito
    </Button>,
  ];

  const btnIncrementQty = (item, quantity) => {
    addItem(item, quantity + 1);
  };

  const btnDecrementQty = (item, quantity) => {
    if (quantity > 1) {
      addItem(item, quantity - 1);
    } else {
      removeItem(item.id);
    }
  };

  const btnDeleteItem = (item) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        removeItem(item.id);
        Swal.fire("Eliminado", "El producto ha sido eliminado", "success");
      }
    });
  };

  if (cart.length === 0) {
    return (
      <div className={styles.container}>
        <h1>No hay productos en el carrito</h1>
        <Button variant="contained" component={Link} to={"/"}>
          Seguir comprando
        </Button>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <h1>Carrito de compras</h1>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="center">Cantidad</TableCell>
              <TableCell align="center">Producto</TableCell>
              <TableCell align="center">Precio Unitario</TableCell>
              <TableCell align="center">Subtotal</TableCell>
              <TableCell align="center">Eliminar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.map((row) => (
              <TableRow
                key={row.item.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="center">
                  <img
                    src={row.item.image_url}
                    alt={row.item.name}
                    height={50}
                  />
                </TableCell>
                <TableCell align="center" size="small">
                  {
                    <div className={styles.stacked}>
                      <Stack direction={{ xs: "column", sm: "row" }}>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() =>
                            btnIncrementQty(row.item, row.quantity)
                          }
                        >
                          +
                        </Button>
                        <TextField
                          id="outlined-basic"
                          variant="outlined"
                          size="small"
                          type="text"
                          value={row.quantity}
                          disabled={true}
                          sx={{ width: 50 }}
                        />
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() =>
                            btnDecrementQty(row.item, row.quantity)
                          }
                        >
                          -
                        </Button>
                      </Stack>
                    </div>
                  }
                </TableCell>
                <TableCell align="center">{row.item.name}</TableCell>
                <TableCell align="center">{`U$S ${row.item.price}`}</TableCell>
                <TableCell align="center">
                  {`U$S ${row.quantity * row.item.price}`}
                </TableCell>
                <TableCell align="center">
                  {
                    <Button
                      variant="text"
                      onClick={() => btnDeleteItem(row.item)}
                    >
                      <BsTrashFill />
                    </Button>
                  }
                </TableCell>
              </TableRow>
            ))}

            <TableRow>
              <TableCell colSpan={4} />
              <TableCell>Total</TableCell>
              <TableCell align="center">{`U$S ${sumarTotal()}`}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          "& > *": {
            m: 1,
          },
        }}
      >
        <ButtonGroup size="large" aria-label="large button group">
          {buttons}
        </ButtonGroup>
      </Box>
    </div>
  );
};

export default Cart;
