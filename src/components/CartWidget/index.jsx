import { BsCart3 } from "react-icons/bs";

const CartWidget = ({ cantidad }) => {
  return (
    <div className="d-flex">
      <BsCart3 style={{ color: "blue", fontSize: "40px" }} />
      <p className="text-danger fs-2">{cantidad}</p>
    </div>
  );
};

export default CartWidget;
