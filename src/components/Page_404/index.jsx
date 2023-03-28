import Styles from "./Page_404.module.css";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";

const Page_404 = () => {
  return (
    <div className={Styles.container}>
      <h1>404</h1>
      <h1>¡Ups! Pareces estar perdido.</h1>

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
        <ButtonGroup variant="text" aria-label="text button group" size="large">
          <Button href="/">Inicio</Button>
          <Button href="/contact">Contacto</Button>
        </ButtonGroup>
      </Box>
    </div>
  );
};

export default Page_404;
