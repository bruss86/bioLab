import Styles from "./Page_404.module.css";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import StorefrontIcon from "@mui/icons-material/Storefront";

const Page_404 = () => {
  return (
    <div className={Styles.container}>
      <h1>404!</h1>
      <h1>La página no existe.</h1>

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
      </Box>
    </div>
  );
};

export default Page_404;
