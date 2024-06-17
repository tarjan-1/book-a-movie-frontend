import { Button, FormLabel, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, newBooking } from "../../api-helpers/api-helpers";

import toast from "react-hot-toast";

const notify = (msg) => {
  toast.success(msg, {
    position: "top-center",
    autoClose: true,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "light",
    transition: "slide",
  });
};

const Booking = () => {
  const [movie, setMovie] = useState();
  const [inputs, setInputs] = useState({ seatNumber: "", date: "" });
  const id = useParams().id;

  useEffect(() => {
    getMovieDetails(id)
      .then((res) => setMovie(res.movie))
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    newBooking({ ...inputs, movie: movie._id })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {movie && (
        <Fragment>
          <Typography
            padding={3}
            fontFamily="fantasy"
            variant="h4"
            textAlign={"center"}
          >
            Book Tickets Of Movie: {movie.title}
          </Typography>
          <Box marginLeft={2} display={"flex"} justifyContent={"center"}>
            <Box
              display={"flex"}
              justifyContent={"column"}
              flexDirection="column"
              paddingTop={3}
              width="50%"
              marginRight={"auto"}
            >
              <img
                width="80%"
                height={"300px"}
                src={movie.posterUrl}
                alt={movie.title}
                style={{ borderRadius: "5px" }}
              />
              <Box width={"80%"} padding={2}>
                <Typography paddingTop={2}>{movie.description}</Typography>
                <Typography fontWeight={"bold"} marginTop={1}>
                  Starrer:
                  {movie.actors.map((actor) => " " + actor + " ")}
                </Typography>
                <Typography fontWeight={"bold"} marginTop={1}>
                  Release Date: {new Date(movie.releaseDate).toDateString()}
                </Typography>
              </Box>
            </Box>
            <Box width={"50%"} paddingTop={3}>
              <form onSubmit={handleSubmit}>
                <Box
                  padding={5}
                  margin={"auto"}
                  display="flex"
                  flexDirection={"column"}
                >
                  <FormLabel>Seat Number</FormLabel>
                  <input
                    style={{
                      padding: "10px",
                      margin: "2% 0 7% 0",
                    }}
                    name="seatNumber"
                    value={inputs.seatNumber}
                    onChange={handleChange}
                    type={"number"}
                    margin="normal"
                    min={1}
                    max={30}
                    variant="standard"
                  />
                  <FormLabel>Booking Date</FormLabel>
                  <input
                    style={{
                      padding: "10px",
                      margin: "2% 0 0 0",
                    }}
                    name="date"
                    type={"date"}
                    min={movie.releaseDate}
                    margin="normal"
                    marginTop={20}
                    variant="standard"
                    value={inputs.date}
                    onChange={handleChange}
                  />
                  <Button
                    onClick={() => notify("Ticket Booked!")}
                    variant="contained"
                    type="submit"
                    marginTop={20}
                    sx={{ mt: 3 }}
                  >
                    Book Now
                  </Button>
                </Box>
              </form>
            </Box>
          </Box>
        </Fragment>
      )}
    </div>
  );
};

export default Booking;
