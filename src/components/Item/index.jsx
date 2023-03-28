import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const Item = ({ producto }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea href={`/item/${producto.id}`}>
        <CardMedia
          component="img"
          alt={producto.name}
          height="240"
          image={producto.image_url}
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
