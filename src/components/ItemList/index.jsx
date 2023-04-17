import Item from "../Item";
import { Box, Grid } from "@mui/material";

const ItemList = ({ productos }) => {
  return (
    <>
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
    </>
  );
};

export default ItemList;
