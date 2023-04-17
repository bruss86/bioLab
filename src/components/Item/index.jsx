import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";

const Item = ({ producto }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea component={Link} to={`/item/${producto.id}`}>
        <CardMedia
          component="img"
          alt={producto.name}
          height="240"
          src={producto.image_url}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {producto.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Item;
