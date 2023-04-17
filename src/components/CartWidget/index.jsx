import { React, useContext } from "react";
import { BsCart3 } from "react-icons/bs";
import { useCartContext } from "../../context/CartContext";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const CartWidget = () => {
  const { cart, cartCount } = useCartContext();

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 1,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));

  return (
    <div className="d-flex">
      <IconButton aria-label="cart">
        <StyledBadge badgeContent={cartCount()} color="primary">
          <BsCart3 style={{ color: "white", fontSize: "25px" }} />
        </StyledBadge>
      </IconButton>

      {/*<BsCart3 style={{ color: "blue", fontSize: "30px" }} />
      <p className="text-danger fs-2">{cartCount()}</p>*/}
    </div>
  );
};

export default CartWidget;
