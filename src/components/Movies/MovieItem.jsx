import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const MovieItem = ({ title, releaseDate, posterUrl, id }) => {
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
    <Card
      sx={{
        margin: 2,
        width: 300,
        height: 300,
        borderRadius: 5,
        ":hover": {
          boxShadow: "10px 10px 20px #ccc",
        },
      }}
    >
      <img height={"50%"} width="100%" src={posterUrl} alt={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {new Date(releaseDate).toDateString()}
        </Typography>
      </CardContent>
      <CardActions>
        {isUserLoggedIn ? (
          <Button
            variant="contained"
            fullWidth
            LinkComponent={Link}
            to={`/booking/${id}`}
            sx={{
              margin: "auto",
              bgcolor: "#2b2d42",
              ":hover": {
                bgcolor: "#121217",
              },
            }}
            size="medium"
          >
            Book
          </Button>
        ) : (
          <Button
            variant="contained"
            fullWidth
            LinkComponent={Link}
            to="/auth"
            sx={{
              margin: "auto",
              bgcolor: "#2b2d42",
              ":hover": {
                bgcolor: "#121217",
              },
            }}
            size="medium"
          >
            Login To Book
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default MovieItem;
